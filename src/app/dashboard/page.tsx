// Importing part
import Filter from "@/components/dashboard/home/filter";
import Page from "@/components/dashboard/page";
import { ReactNode } from "react";

// Creating and exporting Dashboard page ("/") as default
export default function Dashboard(): ReactNode {
  // Returning JSX
  return (
    <Page className="p-5">
      <Filter className="mb-5" />
    </Page>
  );
}
