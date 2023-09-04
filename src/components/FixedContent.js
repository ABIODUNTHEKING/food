import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { memo, useState } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Order from "./Order";

function FixedContent() {
  const [sideBarDisplay, setSideBarDisplay] = useState(true);
  const [orderDisplay, setOrderDisplay] = useState(false);

  let FixedContentStyle = {
    layout: {
      display: "flex",
      height: "100vh",
      overflow: "hidden",
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

  return (
    <div className="layout" style={FixedContentStyle.layout}>
      {sideBarDisplay && <SideBar />}

      <div className="main" style={FixedContentStyle.main}>
        <NavBar
          handleBarOnClick={handleBarOnClick}
          handleOrderDisplay={handleOrderDisplay}
        />

        <section className="content" style={FixedContentStyle.content}>
          <Outlet context={sideBarDisplay} />
        </section>
      </div>
      {orderDisplay && <Order handleOrderDisplay={handleOrderDisplay} />}
    </div>
  );
}
export default memo(FixedContent);
