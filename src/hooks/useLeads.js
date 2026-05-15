import { useEffect } from "react";
import { getLeads } from "../lib/api";
import { useLeadsStore } from "../store/useLeadsStore";

export const useLeads = () => {
  const { setLeads } = useLeadsStore();

  useEffect(() => {
    getLeads().then((data) => {
      // أول row headers → نشيله
      const rows = data.slice(1);

      const parsed = rows.map((row) => {
        return {
          date: row[0],
          name: row[1],
          phone: row[2],
          email: row[3],
          university: row[4],
          year: row[5],
          major: row[6],
          fileUrl: row[7],
          status: row[8] || "Pending",
        };
      });

      setLeads(parsed);
    });
  }, []);
};