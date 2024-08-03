import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";

export const Route = createFileRoute("/admin/chargers")({
  component: AdminChargers,
});

function AdminChargers() {
  return (
    <NavWrapper elementToHighlight={"admin-nav-chargers"}>
      AdminChargers
    </NavWrapper>
  );
}
