import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/custom-vehicle/$modelCode")({
  component: () => <div>Hello /custom-vehicle/$modelCode!</div>,
});
