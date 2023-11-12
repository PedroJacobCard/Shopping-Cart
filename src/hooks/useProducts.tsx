import { useContext } from "react";
import { UseProductsContextType } from "../context/ProductProvider";
import { ProductsContext } from "../context/ProductProvider";

const useProducts = (): UseProductsContextType => {
  return useContext(ProductsContext)
}

export default useProducts;