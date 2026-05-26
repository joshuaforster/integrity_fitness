"use client";

import Lottie from "lottie-react";
import animationData from "@/public/animations/success-check.json";

export default function LottieSuccess() {
  return (
    <div className="w-24 h-24" aria-hidden="true">
      <Lottie animationData={animationData} loop={false} autoplay />
    </div>
  );
}
