import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Order from "./Order";
import foods from "../foods";
import { toast } from "react-toastify";


export default function FixedContent() {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [sideBarDisplay, setSideBarDisplay] = useState(true);
  const [orderDisplay, setOrderDisplay] = useState(false);
  
  let FixedContentStyle = {
    layout: {
      display: "flex",
      height: "100vh",
      overflow: "hidden"
    },
    main: {
      padding: "30px",
      width: "100%",
    },
    content: {
      height: "92vh",
    },
  };

  function handleOrderDisplay() {
    setOrderDisplay((prevOrderDisplay) => !prevOrderDisplay);
  }

  function handleBarOnClick() {
    setSideBarDisplay((prevSideBarDisplay) => !prevSideBarDisplay);
  }

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
    <div className="layout" style={FixedContentStyle.layout}>
      {sideBarDisplay && <SideBar />}

      <div className="main" style={FixedContentStyle.main}>
        <NavBar
          handleBarOnClick={handleBarOnClick}
          handleOrderDisplay={handleOrderDisplay}
          selectedFoods={selectedFoods}
        />

        <section className="content" style={FixedContentStyle.content}>
          <Outlet context={[createOrder, selectedFoods, sideBarDisplay]} />
        </section>
      </div>
      {orderDisplay && (
        <Order
          handleOrderDisplay={handleOrderDisplay}
          selectedFoods={selectedFoods}
          setSelectedFoods={setSelectedFoods}
        />
      )}
    </div>
  );
}
