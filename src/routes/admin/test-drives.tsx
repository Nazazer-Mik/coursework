import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";

export const Route = createFileRoute("/admin/test-drives")({
  component: AdminTestDrives,
});

function AdminTestDrives() {
  return (
    <NavWrapper elementToHighlight={"admin-nav-test-drives"}>
      AdminTestDrives
    </NavWrapper>
  );
}
