import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { axiosInstance } from "@/utils/axios";

export function useCheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return Boolean(
      localStorage.getItem("access_token") ||
      localStorage.getItem("token") ||
      Cookies.get("auth") === "true" ||
      Cookies.get("AUTH") === "true"
    );
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasToken = Boolean(
      localStorage.getItem("access_token") ||
      localStorage.getItem("token") ||
      Cookies.get("auth") === "true" ||
      Cookies.get("AUTH") === "true"
    );

    if (!hasToken) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    setIsAuthenticated(true);

    axiosInstance
      .get("/natural-profiles/")
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(async (err) => {
        if (err.response?.status === 401) {
          try {
            const refreshResponse = await axiosInstance.post(
              "/token/refresh/",
              {},
              { withCredentials: true }
            );

            const newAccess = refreshResponse.data.access;
            if (newAccess) {
              localStorage.setItem("access_token", newAccess);
              localStorage.setItem("token", newAccess);
              Cookies.set("auth", "true", { expires: 30 });
              Cookies.set("AUTH", "true", { expires: 30 });
              setIsAuthenticated(true);
            } else {
              throw new Error("No access token in refresh response");
            }
          } catch {
            localStorage.removeItem("access_token");
            localStorage.removeItem("token");
            Cookies.remove("auth");
            Cookies.remove("AUTH");
            setIsAuthenticated(false);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { isAuthenticated, loading };
}
