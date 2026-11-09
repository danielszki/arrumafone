module.exports = async function handler(req, res) {
  req.url = normalizeApiPath(req.url || "/");

  try {
    const { default: app } = await import(
      "../artifacts/api-server/dist/app.mjs"
    );
    app(req, res);
  } catch (error) {
    console.error("Failed to load bundled ArrumaFone API", error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
};

function normalizeApiPath(url) {
  const queryIndex = url.indexOf("?");
  const pathname = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const query = queryIndex === -1 ? "" : url.slice(queryIndex);
  const apiPath = pathname.replace(/^(?:\/api)+(?=\/|$)/, "") || "/";

  return `/api${apiPath === "/" ? "" : apiPath}${query}`;
}
