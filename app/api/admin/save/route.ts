import { NextRequest, NextResponse } from "next/server";

// Commits admin edits (region annotations + photos) straight to the
// GitHub repo — no database. Requires these env vars on the server
// (add them in Vercel → Settings → Environment Variables, and in a
// local .env.local for local testing):
//
//   ADMIN_PASSWORD   the admin gate (defaults to "admin123")
//   GITHUB_TOKEN     a GitHub PAT with "repo" (contents:write) scope
//   GITHUB_REPO      "owner/repo"   (defaults to "sdisorbo/portfolio")
//   GITHUB_BRANCH    branch to commit to (defaults to "master")

export const runtime = "nodejs";

const REPO = process.env.GITHUB_REPO || "sdisorbo/portfolio";
const BRANCH = process.env.GITHUB_BRANCH || "master";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const API = `https://api.github.com/repos/${REPO}/contents`;

function ghHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}

async function getSha(path: string, token: string): Promise<string | undefined> {
  const res = await fetch(`${API}/${path}?ref=${BRANCH}`, {
    headers: ghHeaders(token),
    cache: "no-store",
  });
  if (res.status === 200) return (await res.json()).sha as string;
  return undefined;
}

async function putFile(
  path: string,
  contentBase64: string,
  message: string,
  token: string
) {
  const sha = await getSha(path, token);
  const res = await fetch(`${API}/${path}`, {
    method: "PUT",
    headers: ghHeaders(token),
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub PUT ${path} failed (${res.status}): ${detail}`);
  }
}

interface Photo {
  filename: string; // e.g. "toscana-1.jpg"
  dataBase64: string; // raw base64 (no data: prefix)
}

export async function POST(req: NextRequest) {
  let body: {
    password?: string;
    annotations?: unknown;
    photos?: Photo[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        error:
          "Server is missing GITHUB_TOKEN. Add a GitHub PAT (repo scope) in the environment to enable saving.",
      },
      { status: 501 }
    );
  }

  try {
    // 1) Commit any uploaded photos into public/wine-photos/
    const savedPhotos: string[] = [];
    for (const photo of body.photos ?? []) {
      const safe = photo.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `public/wine-photos/${safe}`;
      await putFile(path, photo.dataBase64, `admin: add photo ${safe}`, token);
      savedPhotos.push(`/wine-photos/${safe}`);
    }

    // 2) Commit the annotations JSON
    if (body.annotations !== undefined) {
      const json = JSON.stringify(body.annotations, null, 2) + "\n";
      const contentB64 = Buffer.from(json, "utf-8").toString("base64");
      await putFile(
        "data/wine-annotations.json",
        contentB64,
        "admin: update wine map annotations",
        token
      );
    }

    return NextResponse.json({ ok: true, savedPhotos });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Commit failed" },
      { status: 500 }
    );
  }
}
