import { useEffect } from "react";
import carampagueApi from "../api/carampagueApi";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

export const useAuth = ({ middleware, url }) => {
    const fetcher = () =>
    carampagueApi("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        throw Error(error?.response?.data?.errors);
      })
  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();
  const { data: user, error, mutate} = useSWR("/api/user", fetcher, {revalidateOnFocus: false, errorRetryCount: 2})
  const login = async (datos, setErrores) => {
    try {
      const { data } = await carampagueApi.post("/api/login", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      await mutate();
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };
  const logout = async () => {
    try {
      await carampagueApi.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("AUTH_TOKEN");
      await mutate(null);
    } catch (error) {}
  };
  useEffect(() => {
    if (middleware === "guest" && url && user) {
      navigate(url);
    }
    if (middleware === "auth" && error) {
      navigate("/auth");
    }
  }, [user, error]);

  return {
    login,
    logout,
    user,
    error,
  };
};
