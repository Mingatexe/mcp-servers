import express from "express";
import morgan from "morgan";
import fs from "fs/promises";
import path from "path";

const app = express();
app.use(morgan("tiny"));
app.use(express.json());

// Base root for allowed operations (safety: restrict to this subtree)
const ALLOWED_ROOT = "/Users/macos/Documents/GitHub";

// helper: normalize and ensure paths stay inside ALLOWED_ROOT
functifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefr.functifunctfefunctifunctfefunctifunctfefunctifunctfefunc/ functifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefr.functifunctfefunctifunctfefunctifunctfefunctifunctfefunc/ functifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfefunctifunctfe   functifunctfefunctifunctfefunctifunctf cafunctifunct   res.status(e.status || 500).json({ error: e.message });
  }
});

// read file contents (text only, size cap)
app.get("/read", async (req, res) => {
  try {
    if (!req.query.path) throw Object.assign(new Error("path query required"), { status: 400 });
    const p = safePath(req.query.path);
    const stat = await fs.stat(p);
    if (!stat.isFile()) throw Object.assign(new Error("not a file"), { status: 400 });
    if (stat.size > 2_000_000) throw Object.assign(new Error("file too large to read (>2MB)"), { status: 413 });
    const content = await fs.readFile(p, "utf8");
    res.json({ path: p, content });
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

// metadata
app.get("/stat", async (req, res) => {
  try {
    if (!req.query.path) throw Object.assign(new Error("path query required"), { status: 400 });
    const p = safePath(req.query.path);
    const stat = await fs.stat(p);
    res.json({
      path: p,
      isFile: stat.isFile(),
      isDirectory: stat.isDirectory(),
      size: stat.size,
      mtime: stat.mtime
    });
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

// health
app.get("/health", (_req, res) => res.json({ status: "ok", root: ALLOWED_ROOT }));

const PORT = process.env.PORT || 3189;
app.listen(PORT, () => {
  console.log();
});
