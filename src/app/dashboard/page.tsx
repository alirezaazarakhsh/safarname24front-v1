// Importing part
import Page from "@/components/dashboard/page";
import { ReactNode } from "react";

// Creating and exporting Dashboard page ("/") as default
export default function Dashboard(): ReactNode {
  // Returning JSX
  return (
    <Page className="p-5 h-dvh flex items-center justify-center">
      <h1></h1>
    </Page>
  );
}
