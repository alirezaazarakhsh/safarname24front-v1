import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";

export function useCheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const access = localStorage.getItem("access_token");

    if (!access) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

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
            localStorage.setItem("access_token", newAccess);

            setIsAuthenticated(true);
          } catch {
            localStorage.removeItem("access_token");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { isAuthenticated, loading };
}
