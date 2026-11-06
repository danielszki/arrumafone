import type { IncomingMessage, ServerResponse } from "node:http";
import app from "../artifacts/api-server/src/app";

export default function handler(
  req: IncomingMessage,
  res: ServerResponse,
): void {
  req.url = normalizeApiPath(req.url ?? "/");
  const expressHandler = app as unknown as (
    request: IncomingMessage,
    response: ServerResponse,
  ) => void;

  expressHandler(req, res);
}

function normalizeApiPath(url: string): string {
  const queryIndex = url.indexOf("?");
  const pathname = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const query = queryIndex === -1 ? "" : url.slice(queryIndex);
  const apiPath = pathname.replace(/^(?:\/api)+(?=\/|$)/, "") || "/";

  return `/api${apiPath === "/" ? "" : apiPath}${query}`;
}
