import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.resolve(packageDir, "dist/public");
const siteUrl = resolveSiteUrl(
  process.env.VITE_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "https://arrumafone.vercel.app",
);

const homeTitle = "Conserto de celular em São Paulo (SP) | ArrumaFone";
const homeDescription =
  "Conserto de celular em São Paulo: troca de tela, bateria e conector USB em domicílio, com orçamento claro e agendamento fácil pelo WhatsApp. Peça orçamento.";
const assessmentTitle =
  "Avaliação de conserto de celular em São Paulo | ArrumaFone";
const assessmentDescription =
  "Solicite avaliação para conserto de celular, troca de tela, bateria ou conector em São Paulo. Informe o modelo e receba retorno por e-mail sem compromisso.";

const indexPath = path.join(outputDir, "index.html");
let homeHtml = await readFile(indexPath, "utf8");
homeHtml = homeHtml.replaceAll("__SITE_URL__", siteUrl);
homeHtml = addGoogleVerification(homeHtml);
await writeFile(indexPath, homeHtml);

let assessmentHtml = homeHtml;
assessmentHtml = assessmentHtml.replace(`<title>${homeTitle}</title>`, `<title>${assessmentTitle}</title>`);
assessmentHtml = replaceMeta(assessmentHtml, "name", "description", assessmentDescription);
assessmentHtml = replaceMeta(assessmentHtml, "property", "og:title", assessmentTitle);
assessmentHtml = replaceMeta(assessmentHtml, "property", "og:description", assessmentDescription);
assessmentHtml = replaceMeta(assessmentHtml, "property", "og:url", `${siteUrl}/avaliacao`);
assessmentHtml = replaceMeta(assessmentHtml, "name", "twitter:title", assessmentTitle);
assessmentHtml = replaceMeta(assessmentHtml, "name", "twitter:description", assessmentDescription);
assessmentHtml = assessmentHtml.replace(
  `href="${siteUrl}/"`,
  `href="${siteUrl}/avaliacao"`,
);

const assessmentDir = path.join(outputDir, "avaliacao");
await mkdir(assessmentDir, { recursive: true });
await writeFile(path.join(assessmentDir, "index.html"), assessmentHtml);

await writeFile(
  path.join(outputDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/avaliacao</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`,
);

await writeFile(
  path.join(outputDir, "robots.txt"),
  `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`,
);

function resolveSiteUrl(value) {
  const trimmed = value.trim().replace(/\/+$/, "");
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  return new URL(withProtocol).origin;
}

function replaceMeta(html, attribute, name, content) {
  const escapedContent = content.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  const pattern = new RegExp(
    `(<meta\\s+${attribute}="${name}"\\s+content=")[^"]*(")`,
  );
  return html.replace(pattern, `$1${escapedContent}$2`);
}

function addGoogleVerification(html) {
  const token = process.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
  if (!token) return html;

  const safeToken = token.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  return html.replace(
    "</head>",
    `    <meta name="google-site-verification" content="${safeToken}" />\n  </head>`,
  );
}
