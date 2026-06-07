import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, HeartPulse, Stethoscope, ArrowRight, ShieldCheck, LineChart, Video } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rehavia — Adaptive Home Physiotherapy" },
      { name: "description", content: "Digital rehabilitation platform with adaptive monitoring for home-based physiotherapy." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-[image:var(--gradient-hero)] grid place-items-center text-primary-foreground">
            <Activity className="size-5" />
          </div>
          <span className="font-display font-bold text-lg">Rehavia</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#roles" className="hover:text-foreground">For You</a>
          <a href="#about" className="hover:text-foreground">About</a>
        </nav>
        <Link to="/patient" className="text-sm font-medium rounded-lg px-4 py-2 bg-primary text-primary-foreground hover:opacity-90">
          Open dashboard
        </Link>
      </header>

      <section className="px-6 md:px-12 pt-12 pb-24 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-medium">
          <span className="size-1.5 rounded-full bg-accent" />
          Adaptive monitoring · v1.0
        </div>
        <h1 className="mt-6 text-5xl md:text-7xl font-display font-extrabold leading-[1.05] tracking-tight max-w-4xl">
          Home physiotherapy,<br />
          <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">guided by your body.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          Rehavia adapts every session to your recovery: tracking reps, duration and compliance —
          while keeping your physiotherapist one tap away through teleconsultation.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/patient" className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 font-medium shadow-[var(--shadow-soft)] hover:opacity-95">
            <HeartPulse className="size-4" /> Patient dashboard <ArrowRight className="size-4" />
          </Link>
          <Link to="/therapist" className="inline-flex items-center gap-2 rounded-xl bg-card border border-border px-6 py-3 font-medium hover:bg-secondary">
            <Stethoscope className="size-4" /> Physiotherapist dashboard
          </Link>
        </div>

        <div id="features" className="mt-24 grid md:grid-cols-3 gap-5">
          {[
            { icon: LineChart, title: "Adaptive analytics", desc: "Compliance, functional scores and trend graphs that adapt to each patient." },
            { icon: Video, title: "Guided video sessions", desc: "Exercise videos with rep counters and duration tracking built in." },
            { icon: ShieldCheck, title: "Clinician oversight", desc: "Therapists review sessions, adjust plans and run teleconsultations." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="size-10 rounded-lg bg-secondary text-secondary-foreground grid place-items-center">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-display font-bold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
