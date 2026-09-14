import { createFileRoute } from "@tanstack/react-router";
import { Bell, Plus } from "lucide-react";
import { Card, PageHeader, Stat } from "@/components/PageHeader";

export const Route = createFileRoute("/patient/reminders")({
  head: () => ({
    meta: [
      { title: "Exercise Reminder — TeleFisioRehab Patient" },
      {
        name: "description",
        content: "Schedule and manage daily exercise reminders for your rehab routine.",
      },
      { property: "og:title", content: "Exercise Reminder — TeleFisioRehab Patient" },
      {
        property: "og:description",
        content: "Schedule and manage daily exercise reminders for your rehab routine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RemindersPage,
});

const reminders = [
  { t: "Morning routine", time: "08:00", days: "Mon–Sun", on: true },
  { t: "Midday stretching", time: "13:30", days: "Mon–Fri", on: true },
  { t: "Evening session", time: "19:00", days: "Mon, Wed, Fri", on: false },
  { t: "Walk 15 minutes", time: "17:00", days: "Daily", on: true },
];

function RemindersPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="Exercise Reminder"
        subtitle="Gentle nudges that keep your home programme on schedule"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Active reminders" value="3" sub="of 4" />
        <Stat label="Responded" value="86%" sub="Last 30 days" />
        <Stat label="Next reminder" value="13:30" sub="Midday stretching" />
        <Stat label="Snoozed" value="4" sub="This week" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" title="Your Reminders" sub="Tap a reminder to edit">
          <ul className="space-y-3">
            {reminders.map((r) => (
              <li
                key={r.t}
                className="flex items-center justify-between rounded-lg bg-muted px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-secondary text-secondary-foreground grid place-items-center">
                    <Bell className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{r.t}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.time} · {r.days}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    r.on
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {r.on ? "On" : "Off"}
                </span>
              </li>
            ))}
          </ul>
          <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90">
            <Plus className="size-4" /> Add reminder
          </button>
        </Card>

        <Card title="Delivery" sub="How you get notified">
          <ul className="space-y-3 text-sm">
            {[
              { l: "Push notification", v: "On" },
              { l: "Email summary", v: "Weekly" },
              { l: "Therapist alert if missed", v: "After 2 days" },
            ].map((x) => (
              <li key={x.l} className="flex items-center justify-between">
                <span className="text-muted-foreground">{x.l}</span>
                <span className="font-medium">{x.v}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
