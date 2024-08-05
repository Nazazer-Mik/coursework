import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";

export const Route = createFileRoute("/admin/charger-orders")({
  component: AdminChargerOrders,
});

function AdminChargerOrders() {
  return (
    <NavWrapper elementToHighlight={"admin-nav-charger-orders"}>
      What
    </NavWrapper>
  );
}
