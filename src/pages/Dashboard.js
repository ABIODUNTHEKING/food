import "./dashboard.css";
import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  let navigate = useNavigate();
  async function logOut() {
    try {
      await signOut(auth);
      navigate("/");
      toast.dismiss();
      toast.success("You have successfully signed out");
    } catch (err) {
      toast.error("Try again later");
    }
  }

  return (
    <div className="account">
      <div className="accountInfo"></div>
      <div className="accountButtons">
        <button className="editButton">Edit Account</button>
        <button className="logOutButton" onClick={logOut}>
          Log out
        </button>
      </div>
    </div>
  );
}
