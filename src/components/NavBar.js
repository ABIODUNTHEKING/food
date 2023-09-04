import { useLocation } from "react-router-dom";
import profile from "../images/no image.jpg";
import { memo, useContext } from "react";
import { FoodContext } from "../state_manager/FoodContextProvider";
import "./navBar.css";

const NavBar = ({ handleBarOnClick, handleOrderDisplay }) => {
  const { selectedFoods } = useContext(FoodContext);
  const pageTitle = useLocation().state;
  return (
    <section className="navBar">
      <div className="profileInfo">
        <div className="display" onClick={handleBarOnClick}>
          <i className="fa-solid fa-bars bar" id="bar"></i>
          <h2 id="page-title" className="pageTitle">
            {pageTitle}
          </h2>
        </div>
        <div className="userInfo">
          <ul>
            <li
              className="orderCart"
              id="orderCart"
              onClick={handleOrderDisplay}
            >
              <i className="fa-solid fa-cart-shopping cart"></i>
              <span className="orderCount" id="orderCount">
                {selectedFoods.length}
              </span>
            </li>
            <li className="userImage">
              <img src={profile} alt="profile" className="profileImg" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default memo(NavBar);
