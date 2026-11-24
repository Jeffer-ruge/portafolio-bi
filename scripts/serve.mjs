import { createServer } from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { gzip } from "node:zlib";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const kinds = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".webp": "image/webp", ".pdf": "application/pdf", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".woff2": "font/woff2" };
const port = Number(process.env.PORT || 4389);
const compress = promisify(gzip);
createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const file = path.resolve(root, "." + pathname, ...(pathname.endsWith("/") ? ["index.html"] : []));
  const relative = path.relative(root, file);
  if (relative.startsWith("..") || path.isAbsolute(relative)) { response.writeHead(403).end(); return; }
  try {
    const body = await fs.readFile(file);
    const type = kinds[path.extname(file)] || "application/octet-stream";
    const headers = { "Content-Type": type, Vary: "Accept-Encoding" };
    if (body.length > 1000 && /^(text\/|application\/(javascript|xml))/.test(type) &&
        /\bgzip\b/.test(request.headers["accept-encoding"] || "")) {
      response.writeHead(200, { ...headers, "Content-Encoding": "gzip" }).end(await compress(body));
    } else {
      response.writeHead(200, headers).end(body);
    }
  } catch {
    response.writeHead(404).end("Página no encontrada");
  }
}).listen(port, "127.0.0.1", () => console.log(`Vista local: http://127.0.0.1:${port}`));
