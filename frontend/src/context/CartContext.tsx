import Cookies from 'js-cookie';
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { CartItem, Item } from 'types';

type CartContextType = {
  cartItems: CartItem[];
  total: number;
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  refreshCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  refreshCart: () => {},
});

export const CartContextProvider = ({ children }: React.PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = async (item: Item) => {
    const exist = cartItems.find((cartItem) => cartItem.id === item.id);
    let updateItems;

    if (exist) {
      updateItems = cartItems.map((cartItem) => {
        return cartItem.id !== item.id
          ? cartItem
          : { ...cartItem, quantity: cartItem.quantity + 1 };
        // もしくは下記のように書く
        // Object.assign({}, cartItem, { quantity: quantity + 1 })
      });
    } else {
      updateItems = [...cartItems, { ...item, quantity: 1 }];
    }
    setCartItems(updateItems);
    Cookies.set('cart', JSON.stringify(updateItems), { expires: 7 });
  };

  const removeFromCart = (id: number) => {
    const exist = cartItems.find((cartItem) => cartItem.id === id);
    if (!exist) return;
    let updateItems;

    if (exist.quantity > 1) {
      updateItems = cartItems.map((cartItem) => {
        return cartItem.id !== id
          ? cartItem
          : { ...cartItem, quantity: cartItem.quantity - 1 };
      });
    } else {
      updateItems = cartItems.filter((item) => item.id !== id);
    }
    setCartItems(updateItems);
    Cookies.set('cart', JSON.stringify(updateItems), { expires: 7 });
  };

  const refreshCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    let result = 0;
    cartItems.forEach((item) => {
      result += item.price * item.quantity;
    });
    return result;
  };

  useEffect(() => {
    const cartData = Cookies.get('cart');
    if (cartData) setCartItems(() => JSON.parse(cartData));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total: calculateTotal(),
        addToCart,
        removeFromCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
