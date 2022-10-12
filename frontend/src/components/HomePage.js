import React, { useEffect, useState } from "react";
import Axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";

export default function HomePage() {
  const [name, setName] = useState();
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const user = await Axios.get("/api/user");
        console.log("navigate", navigate, user);
        if (user.response?.request.status === 401) throw AxiosError;
        setName(user.data?.firstName || null);
      } catch (err) {
        console.log("navigate ti signin", err);
        setNavigate(true);
      }
    })();
  }, []);

  if (navigate) {
    return <Navigate to="/signin" />;
  }
  return <div>Hello, {name ? name : ""}</div>;
}
