import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routing } from "./routing";
import { ShopingCartProvider } from "./context/shopContext";
import { ProductProvider } from "./context/productContext";

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <ShopingCartProvider>
        <Routing />
      </ShopingCartProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
