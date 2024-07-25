import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartCountContext = createContext(0);

export default function CartCountContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  async function getLoggedUseCart() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: token,
          },
        }
      );

      if (data && data.numOfCartItems !== undefined) {
        setCartCount(data.numOfCartItems);
      } else {
        console.error("Unexpected response structure:", data);
      }
    } catch (err) {
      console.error("Error fetching cart data:", err.response || err.message);
    }
  }

  useEffect(() => {
    getLoggedUseCart();
  }, []);

  return (
    <cartCountContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </cartCountContext.Provider>
  );
}
