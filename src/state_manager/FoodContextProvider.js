import { createContext, useState } from "react";
import foods from "../foods";
import { toast } from "react-toastify";

export const FoodContext = createContext(null);

export const FoodContextProvider = ({ children }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);

  const contextValue = {
    setSelectedFoods,
    selectedFoods,
    createOrder,
  };

  function createOrder(event) {
    let orderId = event.target.id;
    let selectedOrder = foods.filter((food) => food.id === parseInt(orderId));
    let selectedOrderDetail = {
      img: selectedOrder[0].img,
      price: selectedOrder[0].price,
      status: selectedOrder[0].status,
      id: selectedOrder[0].id,
      name: selectedOrder[0].name,
      total: selectedOrder[0].total,
      quantity: selectedOrder[0].quantity,
    };

    const isOrderExist = selectedFoods.find(
      (food) => food.id === selectedOrderDetail.id
    );

    if (isOrderExist) {
      toast.error("Order already exists");
      return;
    }

    setSelectedFoods((prevSelectedFood) => [
      ...prevSelectedFood,
      selectedOrderDetail,
    ]);
  }

  return (
    <FoodContext.Provider value={contextValue}>{children}</FoodContext.Provider>
  );
};
