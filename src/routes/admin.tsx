import { createFileRoute } from "@tanstack/react-router";
import AdminNavWrapper from "../components/AdminNavWrapper";

export const Route = createFileRoute("/admin")({
  component: AdminHome,
});

function AdminHome() {
  return <AdminNavWrapper>WTF</AdminNavWrapper>;
}
