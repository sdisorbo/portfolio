"use client";
import { useState } from "react";
import { wineCountries } from "@/data/wine-map";
import annotationsData from "@/data/wine-annotations.json";

type RegionAnnotation = { visited?: boolean; note?: string; photos?: string[] };
type Annotations = { regions: Record<string, Record<string, RegionAnnotation>> };

const initial = annotationsData as Annotations;

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");

  const [country, setCountry] = useState(wineCountries[0]?.name ?? "");
  const [region, setRegion] = useState("");
  const [visited, setVisited] = useState(false);
  const [note, setNote] = useState("");
  const [pendingPhotos, setPendingPhotos] = useState<
    { filename: string; dataBase64: string; preview: string }[]
  >([]);

  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function loadExisting(c: string, r: string) {
    const a = initial.regions?.[c]?.[r];
    setVisited(!!a?.visited);
    setNote(a?.note ?? "");
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const arr = await Promise.all(
      Array.from(files).map(
        (f) =>
          new Promise<{ filename: string; dataBase64: string; preview: string }>(
            (resolve) => {
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;
                const base64 = result.split(",")[1] ?? "";
                const stamp = Date.now().toString(36);
                resolve({
                  filename: `${region || "region"}-${stamp}-${f.name}`.toLowerCase(),
                  dataBase64: base64,
                  preview: result,
                });
              };
              reader.readAsDataURL(f);
            }
          )
      )
    );
    setPendingPhotos((p) => [...p, ...arr]);
  }

  async function save() {
    if (!region.trim()) {
      setStatus("Enter a region name first.");
      return;
    }
    setSaving(true);
    setStatus(null);

    // Merge this edit into the annotations tree
    const next: Annotations = JSON.parse(JSON.stringify(initial));
    next.regions[country] = next.regions[country] || {};
    const existing = next.regions[country][region] || {};
    const photoPaths = [
      ...(existing.photos ?? []),
      ...pendingPhotos.map((p) => `/wine-photos/${p.filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`),
    ];
    next.regions[country][region] = {
      visited,
      note: note.trim() || undefined,
      photos: photoPaths.length ? photoPaths : undefined,
    };

    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          annotations: next,
          photos: pendingPhotos.map((p) => ({
            filename: p.filename,
            dataBase64: p.dataBase64,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(`❌ ${data.error || "Save failed"}`);
      } else {
        setStatus(
          "✅ Committed to GitHub. Vercel will redeploy and the map will update shortly."
        );
        setPendingPhotos([]);
      }
    } catch (e: any) {
      setStatus(`❌ ${e?.message || "Network error"}`);
    } finally {
      setSaving(false);
    }
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-6 py-24">
        <h1 className="mb-4 text-2xl font-bold">Admin</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && password) setAuthed(true);
          }}
          placeholder="Password"
          className="w-full rounded-lg border border-border bg-card px-4 py-2 text-mahogany outline-none focus:border-accent"
        />
        <button
          onClick={() => password && setAuthed(true)}
          className="mt-3 w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Enter
        </button>
        <p className="mt-3 text-xs text-mahogany/40">
          The password gates the UI; the server re-checks it before committing.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="mb-1 text-2xl font-bold">Wine Map Admin</h1>
      <p className="mb-8 text-sm text-mahogany/50">
        Add notes and photos to a wine region. Saves commit straight to GitHub.
      </p>

      <div className="space-y-5">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-mahogany/40">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              loadExisting(e.target.value, region);
            }}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-mahogany"
          >
            {wineCountries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-mahogany/40">
            Region (match the map name, e.g. Toscana)
          </label>
          <input
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              loadExisting(country, e.target.value);
            }}
            placeholder="Toscana"
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-mahogany outline-none focus:border-accent"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-mahogany">
          <input
            type="checkbox"
            checked={visited}
            onChange={(e) => setVisited(e.target.checked)}
          />
          I&apos;ve been here (outline this region on the map)
        </label>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-mahogany/40">
            Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-mahogany outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-mahogany/40">
            Photos
          </label>
          <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} />
          {pendingPhotos.length > 0 && (
            <div className="mt-2 flex gap-2 overflow-x-auto">
              {pendingPhotos.map((p, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={p.preview}
                  alt=""
                  className="h-16 w-auto rounded-md border border-border object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save to GitHub"}
        </button>

        {status && <p className="text-sm text-mahogany/70">{status}</p>}
      </div>
    </div>
  );
}
