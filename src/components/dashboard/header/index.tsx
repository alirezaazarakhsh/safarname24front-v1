// Importing part
import { ReactNode } from "react";
import TopSide from "./topSide";

// Creating and exporting Header component for dashboard pages as default
export default function Header(): ReactNode {
  // Returning JSX
  return (
    <header>
      <TopSide />
    </header>
  );
}
