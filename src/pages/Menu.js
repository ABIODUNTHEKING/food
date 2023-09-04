import foods from "../foods";
import { useOutletContext } from "react-router-dom";
import "../styles/menu.css";
import { useContext } from "react";
import { FoodContext } from "../state_manager/FoodContextProvider";

export default function Menu() {
  let { createOrder, selectedFoods } = useContext(FoodContext);
  let sideBarDisplay = useOutletContext();

  let orders = foods.map((food) => {
    const orderExists = selectedFoods.find(
      (selectedFood) => selectedFood.id === food.id
    );

    return (
      <div className={sideBarDisplay ? "food" : "big-food"} key={food.id}>
        <img src={`/images/${food.img}`} alt="food" className="foodImage" />
        <div className="foodDetail">
          <p className="foodName">{food.name}</p>
          <p className="foodPrice">#{food.price.toLocaleString()}</p>
          {!orderExists ? (
            <button className="createButton" id={food.id} onClick={createOrder}>
              Add to cart
            </button>
          ) : (
            <p style={{ color: "black", fontWeight: "700", fontSize: "20px" }}>
              ADDED TO CART
            </p>
          )}
        </div>
      </div>
    );
  });

  return <div className="menu">{orders}</div>;
}
