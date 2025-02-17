// Importing part
import { ReactNode } from "react";

// Creating and exporting type of components of dashboard pages
export interface RootLayoutPropsType {
  children: ReactNode;
}

export interface PageComponentPropsType {
  children: ReactNode;
  className?: string;
}

export interface FilterComponentPropsType {
  className?: string;
}

export interface UserStatusComponentPropsType {
  className?: string;
}
