import { currentRole } from "@/lib/auth";
import { notFound } from "next/navigation";

const AdminTickets = async () => {
  const role = await currentRole();

  if (role !== "ADMIN") notFound();

  return <>Admin tickets</>;
};

export default AdminTickets;
