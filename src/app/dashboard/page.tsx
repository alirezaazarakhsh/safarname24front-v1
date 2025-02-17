// Importing part
import Filter from "@/components/dashboard/home/filter";
import Page from "@/components/dashboard/page";
import { ICChevronBottom } from "@/components/icons/ICChevronBottom";
import { ReactNode } from "react";

// Creating and exporting Dashboard page ("/") as default
export default function Dashboard(): ReactNode {
  // Returning JSX
  return (
    <Page className="p-5">
      <Filter />
    </Page>
  );
}
