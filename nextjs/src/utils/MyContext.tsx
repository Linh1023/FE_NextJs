// MyContext.tsx
"use client"
import { fetchGetCart } from '@/services/apiServiceClient';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from "next-auth/react"


type MyContextType = {
  cart: CartResponse;
  setCart: (value: CartResponse) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()

  const initItem: ItemResponse = {

    tour_id: 0,
    time: "null"


  }
  const initCart: CartResponse = {
    id: "null",
    item: [initItem],
  }

  const [cart, setCart] = useState<CartResponse>(initCart);

  useEffect(() => {
    const fetchCart = async () => {
      if (session?.user?.email) {
        const data: CartResponse = await fetchGetCart(session.user.email);
        setCart(data);  // Cập nhật dữ liệu cart sau khi gọi API
        console.log(data)
      }

    };
    fetchCart();  // Gọi hàm tải dữ liệu khi component được render
  }, [session]);  // Chạy lại khi session thay đổi




  return (
    <MyContext.Provider value={{ cart, setCart }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContext must be used within a MyProvider');
  return context;
};
