import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin-auth")({
  component: () => <div>Hello /admin-auth!</div>,
});
