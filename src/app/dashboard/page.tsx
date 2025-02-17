// Importing part
import Filter from "@/components/dashboard/home/filter";
import LatestTicketsTable from "@/components/dashboard/home/latestTicketsTable";
import UserStatus from "@/components/dashboard/home/userStatus";
import Page from "@/components/dashboard/page";
import { ReactNode } from "react";

// Creating and exporting Dashboard page ("/") as default
export default function Dashboard(): ReactNode {
  // Returning JSX
  return (
    <Page className="p-5">
      <Filter className="mb-5" />
      <UserStatus className="mb-5" />
      <LatestTicketsTable />
    </Page>
  );
}
