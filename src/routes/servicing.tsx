import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/servicing")({
  component: () => <div>Hello /servicing!</div>,
});
