// Forcing next.js to render this component as client side component
"use client";

// Imporitng part
import useLocalStorage from "@/hooks/useLocalStorage";
import { PageComponentPropsType } from "@/types/dashboard/component";
import { cn } from "@/utils/utils";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";
import Header from "./header";

// Creating and exporting a context for deeper components within this component to get the value of user id (uid)
export const uidContext = createContext<string>("");

// Crating and exporting Page component (container like for dashboard pages) component as defualt
export default function Page({
  children,
  className,
}: PageComponentPropsType): ReactNode {
  // Defining hooks to use later
  const uid = useLocalStorage({ value: "uid" });
  const router = useRouter();

  // Condititional rendering for conditions of :
  // loading the user id in local storage, uid exists in local storage which means user is logged in , and if user is not logged in
  if (uid.loading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <Loader className="w-5 h-5 animate-spin text-cs-red" />
      </div>
    );
  } else  {
    // else if (uid.data)
    return (
      <uidContext.Provider value={(uid.data) ? uid.data : "undefined_user_id"}>
        <Header />
        <div
          className={cn(
            "max-w-screen-template mx-auto bg-[#F9F9F9]",
            className
          )}
        >
          {children}
        </div>
      </uidContext.Provider>
    );
  } 
  // else if (!uid.data) {
  //  // redirecting user to auth page
  //  router.push("/auth/login");
  //
  //  // Returning JSX
  //  return (
  //    <div className="max-w-screen-template min-h-dvh mx-auto flex items-center justify-center">
  //      <span className="font-medium text-center text-lg block">
  //        شما درحال انتقال به صفحه ورود هستید.
  //      </span>
  //    </div>
  //  );
  //}
}
