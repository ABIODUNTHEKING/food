import { useState } from "react";

export default function SelectedOrder({
  selectedFoods,
  setSelectedFoods,
  setTotalPrice,
}) {
  let structureOfSelectedFoods = selectedFoods.map((selectedFoodDetail) => {
    return (
      <OrderDetail
        key={selectedFoodDetail.id}
        selectedFoodDetail={selectedFoodDetail}
        setSelectedFoods={setSelectedFoods}
        setTotalPrice={setTotalPrice}
      />
    );
  });

  function validateTotal() {
    let totalArray = selectedFoods.map((selectedFood) => selectedFood.total);
    let total = totalArray.reduce(
      (accumulator, currentVaue) => accumulator + currentVaue,
      0
    );
    setTotalPrice(total);
  }

  function OrderDetail({ selectedFoodDetail }) {
    let [orderNumber, setOrderNumber] = useState(selectedFoodDetail.quantity);

    function increment(e) {
      let foodId = selectedFoodDetail.id;
      let buttonId = e.target.id;
      foodId === parseInt(buttonId) &&
        setOrderNumber((prevOrderNumber) => prevOrderNumber + 1);
      selectedFoodDetail.quantity = orderNumber + 1;
      selectedFoodDetail.total =
        selectedFoodDetail.quantity * selectedFoodDetail.price;
      validateTotal();
    }

    function decrement(e) {
      let foodId = selectedFoodDetail.id;
      let buttonId = e.target.id;
      foodId === parseInt(buttonId) &&
        setOrderNumber((prevOrderNumber) => prevOrderNumber - 1);
      selectedFoodDetail.quantity = orderNumber - 1;
      selectedFoodDetail.total =
        selectedFoodDetail.quantity * selectedFoodDetail.price;
      validateTotal();
    }

    function deleteOrder(e) {
      let updatedSelectedFoods = selectedFoods.filter(
        (selectedFoods) => parseInt(e.target.id) !== selectedFoods.id
      );
      setSelectedFoods(updatedSelectedFoods);
    }

    return (
      <div className="orderDetail" key={selectedFoodDetail.id}>
        <div className="product">
          <img
            className="productImg"
            src={`/images/${selectedFoodDetail.img}`}
            alt={selectedFoodDetail.name}
          />
          <div>
            <p className="productName">{selectedFoodDetail.name}</p>
            <p className="productPrice">#{selectedFoodDetail.price.toLocaleString()}</p>
          </div>
        </div>
        <div className="productStatus">
          <i
            className="fa-solid fa-trash trash"
            id={selectedFoodDetail.id}
            onClick={deleteOrder}
          ></i>
          <div>
            {orderNumber > 1 && (
              <button
                id={selectedFoodDetail.id}
                onClick={decrement}
                className="minusButton"
              >
                <i className="fa-solid fa-minus" id={selectedFoodDetail.id}></i>
              </button>
            )}
            {orderNumber === 1 && (
              <button
                id={selectedFoodDetail.id}
                className="cancelButton"
                onClick={deleteOrder}
              >
                <i
                  className="fa-solid fa-cancel"
                  id={selectedFoodDetail.id}
                ></i>
              </button>
            )}
            <span>{orderNumber}</span>
            <button
              id={selectedFoodDetail.id}
              onClick={increment}
              className="plusButton"
            >
              <i className="fa-solid fa-plus" id={selectedFoodDetail.id}></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{structureOfSelectedFoods}</>;
}
