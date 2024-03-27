import { useState } from "react";

export default function useScroll() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    // 20px이상 위치했을 때 버튼 보임
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
    setShowScrollButton(window.scrollY > 20 && !isBottom);
  };
  return {
    showScrollButton,
    setShowScrollButton,
    scrollToBottom,
    scrollToTop,
    handleScroll,
  };
}
