import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

export default function AuthorizedUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
        toast.error("You are not logged in");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return <>{user && <Outlet />}</>;
}
