import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8795);
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let f = path.join(ROOT, p === "/" ? "index.html" : p);
  if (!f.startsWith(ROOT)) return res.writeHead(403).end();
  fs.stat(f, (e, st) => {
    if (e || !st.isFile()) f = path.join(ROOT, "index.html");
    res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" });
    fs.createReadStream(f).pipe(res);
  });
}).listen(PORT, "127.0.0.1", () => console.log("calc on http://127.0.0.1:" + PORT));
