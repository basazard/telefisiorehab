import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Users, Gauge, ClipboardList, History, Video } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/DashboardShell";

export const Route = createFileRoute("/therapist")({
  component: TherapistLayout,
});

export const therapistNav: NavItem[] = [
  { label: "Patient Data", to: "/therapist", icon: Users },
  { label: "Compliance Level", to: "/therapist/compliance", icon: Gauge },
  { label: "Functional Score", to: "/therapist/score", icon: ClipboardList },
  { label: "Session History", to: "/therapist/history", icon: History },
  { label: "Teleconsultation", to: "/therapist/teleconsultation", icon: Video },
];

function TherapistLayout() {
  return (
    <DashboardShell role="Physiotherapist" userName="Dr. Lina Park" nav={therapistNav}>
      <Outlet />
    </DashboardShell>
  );
}
