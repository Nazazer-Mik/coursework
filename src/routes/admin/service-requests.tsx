import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";

export const Route = createFileRoute("/admin/service-requests")({
  component: AdminServiceRequests,
});

function AdminServiceRequests() {
  return (
    <NavWrapper elementToHighlight={"admin-nav-service-requests"}>
      AdminServiceRequests
    </NavWrapper>
  );
}
