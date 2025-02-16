"use client";
// Importing part
import Page, { uidContext } from "@/components/dashboard/page";
import { ReactNode } from "react";

// Creating and exporting Dashboard page ("/") as default
export default function Dashboard(): ReactNode {
  // Returning JSX
  return (
    <Page className="p-5 h-dvh flex items-center justify-center">
      <uidContext.Consumer>
        {(val) => (
          <h1 className="font-bold text-center text-2xl block">{val}</h1>
        )}
      </uidContext.Consumer>
    </Page>
  );
}
