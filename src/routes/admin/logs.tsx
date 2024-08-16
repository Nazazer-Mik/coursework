import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import "../../styles/admin/table-view.scss";
import "../../styles/admin/logs.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";

interface Log {
  id: string;
  user_id: string;
  timestamp: string;
  level: string;
  message: string;
}

export const Route = createFileRoute("/admin/logs")({
  component: LogsList,
});

function LogsList() {
  const [logs, setLogs] = useState<Log[]>();

  const composeLogs = () =>
    logs?.map((l) => (
      <tr>
        <td>{l.id}</td>
        <td>{l.timestamp.replace("T", ", ").slice(0, 20)}</td>
        <td>{l.user_id}</td>
        <td
          className={`${l.level.toLowerCase()}-log`}
          style={{ fontWeight: 600 }}
        >
          {l.level}
        </td>
        <td>{l.message}</td>
      </tr>
    ));

  useEffect(() => {
    async function fetchLogs() {
      const data = (await axios.get(serverAddress + "/admin/logs")).data;
      setLogs(data);
    }

    fetchLogs();
  }, []);

  return (
    <NavWrapper elementToHighlight={"admin-nav-logs"}>
      <div className="table-wrapper">
        <div className="table">
          <div className="title">Logs List</div>
          <div className="content">
            <table>
              <tr key={"header"}>
                <th>ID</th>
                <th>Time</th>
                <th>User ID</th>
                <th>Level</th>
                <th>Message</th>
              </tr>
              {composeLogs()}
            </table>
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}
