import { useState } from "react";

type Region = { id: string; label: string; d: string };

const FRONT: Region[] = [
  { id: "Head", label: "Head", d: "M100 8 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32" },
  { id: "Neck", label: "Neck", d: "M90 41 h20 v12 h-20 z" },
  { id: "Right Shoulder", label: "Right Shoulder", d: "M62 55 h22 v20 h-22 z" },
  { id: "Left Shoulder", label: "Left Shoulder", d: "M116 55 h22 v20 h-22 z" },
  { id: "Chest", label: "Chest", d: "M86 55 h28 v30 h-28 z" },
  { id: "Abdomen", label: "Abdomen", d: "M86 87 h28 v34 h-28 z" },
  { id: "Right Elbow", label: "Right Elbow", d: "M58 78 h22 v18 h-22 z" },
  { id: "Left Elbow", label: "Left Elbow", d: "M120 78 h22 v18 h-22 z" },
  { id: "Right Wrist", label: "Right Wrist / Hand", d: "M54 99 h20 v22 h-20 z" },
  { id: "Left Wrist", label: "Left Wrist / Hand", d: "M126 99 h20 v22 h-20 z" },
  { id: "Right Hip", label: "Right Hip", d: "M84 123 h15 v20 h-15 z" },
  { id: "Left Hip", label: "Left Hip", d: "M101 123 h15 v20 h-15 z" },
  { id: "Right Knee", label: "Right Knee", d: "M84 176 h15 v20 h-15 z" },
  { id: "Left Knee", label: "Left Knee", d: "M101 176 h15 v20 h-15 z" },
  { id: "Right Thigh", label: "Right Thigh", d: "M84 145 h15 v29 h-15 z" },
  { id: "Left Thigh", label: "Left Thigh", d: "M101 145 h15 v29 h-15 z" },
  { id: "Right Ankle", label: "Right Ankle / Foot", d: "M84 226 h15 v20 h-15 z" },
  { id: "Left Ankle", label: "Left Ankle / Foot", d: "M101 226 h15 v20 h-15 z" },
  { id: "Right Shin", label: "Right Shin", d: "M84 198 h15 v26 h-15 z" },
  { id: "Left Shin", label: "Left Shin", d: "M101 198 h15 v26 h-15 z" },
];

const BACK: Region[] = [
  { id: "Back of Head", label: "Back of Head", d: "M100 8 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32" },
  { id: "Cervical Spine", label: "Neck / Cervical Spine", d: "M90 41 h20 v12 h-20 z" },
  { id: "Upper Back", label: "Upper Back", d: "M80 55 h40 v34 h-40 z" },
  { id: "Lower Back", label: "Lower Back", d: "M82 91 h36 v30 h-36 z" },
  { id: "Right Scapula", label: "Right Scapula", d: "M58 58 h20 v30 h-20 z" },
  { id: "Left Scapula", label: "Left Scapula", d: "M122 58 h20 v30 h-20 z" },
  { id: "Right Forearm", label: "Right Forearm", d: "M54 92 h20 v30 h-20 z" },
  { id: "Left Forearm", label: "Left Forearm", d: "M126 92 h20 v30 h-20 z" },
  { id: "Glutes", label: "Glutes", d: "M82 123 h36 v24 h-36 z" },
  { id: "Right Hamstring", label: "Right Hamstring", d: "M84 149 h15 v32 h-15 z" },
  { id: "Left Hamstring", label: "Left Hamstring", d: "M101 149 h15 v32 h-15 z" },
  { id: "Right Calf", label: "Right Calf", d: "M84 185 h15 v40 h-15 z" },
  { id: "Left Calf", label: "Left Calf", d: "M101 185 h15 v40 h-15 z" },
  { id: "Right Heel", label: "Right Heel", d: "M84 228 h15 v18 h-15 z" },
  { id: "Left Heel", label: "Left Heel", d: "M101 228 h15 v18 h-15 z" },
];

export function BodyMap({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const [view, setView] = useState<"front" | "back">("front");
  const [hover, setHover] = useState<string | null>(null);
  const regions = view === "front" ? FRONT : BACK;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-border bg-card p-1">
          {(["front", "back"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-4 py-1.5 text-sm rounded-lg capitalize transition-colors ${
                view === v
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v} view
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{hover ?? "Tap an area to select"}</p>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-[image:var(--gradient-soft)] p-4">
        <svg
          viewBox="0 0 200 252"
          className="mx-auto h-[420px] w-full max-w-[280px] touch-pan-y"
          role="group"
          aria-label={`Body map, ${view} view`}
        >
          {regions.map((r) => {
            const active = selected.includes(r.id);
            return (
              <path
                key={r.id}
                d={r.d}
                role="button"
                tabIndex={0}
                aria-label={r.label}
                aria-pressed={active}
                onClick={() => onToggle(r.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggle(r.id);
                  }
                }}
                onMouseEnter={() => setHover(r.label)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(r.label)}
                onBlur={() => setHover(null)}
                className={`cursor-pointer outline-none transition-[fill,stroke] ${
                  active
                    ? "fill-[var(--color-primary)] stroke-[var(--color-primary)]"
                    : "fill-[var(--color-card)] stroke-[var(--color-border)] hover:fill-[var(--color-secondary)] focus-visible:fill-[var(--color-secondary)]"
                }`}
                strokeWidth={1.5}
                rx={6}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
