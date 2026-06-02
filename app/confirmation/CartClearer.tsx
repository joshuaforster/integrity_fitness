"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

export default function CartClearer() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
