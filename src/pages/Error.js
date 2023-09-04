import { Link } from "react-router-dom";
import { auth } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import "../styles/error.css";

export default function Error() {
  const [pageName, setPageName] = useState("Login Page");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageName("Dashboard");
      }
    });
  });

  return (
    <div className="error-body">
      <div className="error-content">
        <h1>Page do not exist</h1>
        <Link to={auth.currentUser ? "/dashboard" : "/"}>
          Return to {pageName}
        </Link>
      </div>
    </div>
  );
}
