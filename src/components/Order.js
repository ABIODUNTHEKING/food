import { toast } from "react-toastify";
import "../styles/order.css";
import SelectedOrder from "./SelectedOrder";
import { useState, useEffect, useContext } from "react";
import { FoodContext } from "../state_manager/FoodContextProvider";

function Order({ handleOrderDisplay }) {
  const { selectedFoods, setSelectedFoods } = useContext(FoodContext);
  function PurchaseOrder() {
    if (selectedFoods.length === 0) {
      toast.error("No order has been made yet");
    } else {
      toast.success("Purchase made");
      setSelectedFoods([]);
    }
  }

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalArray = selectedFoods.map((selectedFood) => selectedFood.total);
    let total = totalArray.reduce(
      (accumulator, currentVaue) => accumulator + currentVaue,
      0
    );
    setTotalPrice(total);
  }, [selectedFoods]);

  return (
    <section className="orders" id="orders">
      <div className="orderHead">
        <h2 className="cartTitle">MY ORDER</h2>
        <i
          className="fa-solid fa-xmark cancel"
          onClick={handleOrderDisplay}
        ></i>
      </div>

      <div id="listedOrder" className="listedOrder">
        {selectedFoods.length === 0 && (
          <p className="noOrder">You have not made any order yet</p>
        )}
        <SelectedOrder setTotalPrice={setTotalPrice} />
      </div>

      <div className="acceptOrder">
        <p className="totalPrice" id="totalPrice">
          Total: #{totalPrice.toLocaleString()}
        </p>
        <button className="buyButton" onClick={PurchaseOrder}>
          Buy
        </button>
      </div>
    </section>
  );
}

export default Order;
