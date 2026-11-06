import app from "../artifacts/api-server/src/app";

export default function handler(
  req: Parameters<typeof app>[0],
  res: Parameters<typeof app>[1],
): void {
  req.url = normalizeApiPath(req.url ?? "/");
  app(req, res);
}

function normalizeApiPath(url: string): string {
  const queryIndex = url.indexOf("?");
  const pathname = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const query = queryIndex === -1 ? "" : url.slice(queryIndex);
  const apiPath = pathname.replace(/^(?:\/api)+(?=\/|$)/, "") || "/";

  return `/api${apiPath === "/" ? "" : apiPath}${query}`;
}
