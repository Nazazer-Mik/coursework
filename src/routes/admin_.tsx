import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../components/AdminComponents/NavWrapper";

export const Route = createFileRoute("/admin")({
  component: AdminHome,
});

function AdminHome() {
  return (
    <NavWrapper elementToHighlight={"admin-nav-dashboard"}>
      dashboard
    </NavWrapper>
  );
}
