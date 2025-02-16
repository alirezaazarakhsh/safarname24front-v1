// Importing part
import { ReactNode } from "react";

// Creating and exporting Dashboard page ("/") as default
export default function Dashboard(): ReactNode {
  // Returning JSX
  return (
    <div className="p-5 h-dvh flex items-center justify-center">
      <h1 className="font-bold text-center text-2xl block">داشبورد</h1>
    </div>
  );
}
