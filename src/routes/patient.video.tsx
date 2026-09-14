import { createFileRoute } from "@tanstack/react-router";
import { Play, Pause, SkipForward } from "lucide-react";
import { Card, PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/patient/video")({
  head: () => ({
    meta: [
      { title: "Exercise Video — TeleFisioRehab Patient" },
      {
        name: "description",
        content: "Guided exercise videos with therapist instructions for home rehabilitation.",
      },
      { property: "og:title", content: "Exercise Video — TeleFisioRehab Patient" },
      {
        property: "og:description",
        content: "Guided exercise videos with therapist instructions for home rehabilitation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideoPage,
});

const playlist = [
  { t: "Warm-up mobility", d: "04:00", done: true },
  { t: "Quadriceps strengthening", d: "10:30", done: false },
  { t: "Hamstring stretch", d: "03:30", done: false },
];

function VideoPage() {
  return (
    <div className="grid gap-6">
      <PageHeader title="Exercise Video" subtitle="Guided session · Knee Recovery, Day 12" />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
          <div className="aspect-video bg-[image:var(--gradient-soft)] relative grid place-items-center">
            <div className="size-16 rounded-full bg-card grid place-items-center shadow-[var(--shadow-soft)] cursor-pointer">
              <Play className="size-7 text-primary" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <button className="size-9 rounded-full bg-card grid place-items-center">
                <Pause className="size-4" />
              </button>
              <button className="size-9 rounded-full bg-card grid place-items-center">
                <SkipForward className="size-4" />
              </button>
              <div className="flex-1 h-1.5 bg-card/60 rounded-full overflow-hidden">
                <div className="h-full w-2/5 bg-primary" />
              </div>
              <span className="text-xs font-medium text-foreground bg-card px-2 py-1 rounded">
                04:12 / 10:30
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-display font-bold text-lg">
              Quadriceps Strengthening — Set 2 of 3
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Keep your back straight and lift slowly. The repetition indicator counts each
              successful range of motion.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card title="Today's Playlist" sub="3 exercises · ~18 min">
            <ul className="space-y-3">
              {playlist.map((p) => (
                <li
                  key={p.t}
                  className="flex items-center justify-between rounded-lg bg-muted px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium">{p.t}</p>
                    <p className="text-xs text-muted-foreground">{p.d}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      p.done
                        ? "bg-success text-success-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {p.done ? "Done" : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Form Tips" sub="Adaptive coaching">
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li>Exhale while lifting, inhale while lowering.</li>
              <li>Stop if pain goes above 4/10.</li>
              <li>Rest 45 seconds between sets.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
