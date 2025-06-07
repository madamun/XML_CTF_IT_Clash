// src/components/Button.tsx
import React from 'react'; // เพิ่ม React import ถ้ายังไม่มี
import cn from "../../utils/cn"; // ถ้าใช้ helper รวม class

type ButtonProps = {
  text?: string; // เปลี่ยนเป็น optional ถ้าจะให้ children เป็นหลักได้
  onClick?: () => void;
  variant?: "primary" | "danger" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Prop นี้มีอยู่แล้ว ดีมาก!
  className?: string; // เพิ่ม className prop เพื่อให้สามารถ override หรือเพิ่ม style จากข้างนอกได้
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  children, // <--- รับ children prop
  type = "button", // <--- รับ type prop และให้ default value เป็น "button"
  className,  // <--- รับ className prop
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500", // เพิ่ม focus ring color
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400", // ปรับ text color สำหรับ secondary
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  return (
    <button
      type={type} // <--- ใช้งาน type prop ที่นี่
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)} // <--- เพิ่ม className ที่รับเข้ามา
    >
      {loading && ( // ใช้ && เพื่อ render conditional ที่กระชับขึ้น
        <svg
          className="animate-spin h-5 w-5 mr-2 text-currentColor" // เปลี่ยนเป็น currentColor เพื่อให้สี icon ปรับตาม text color
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg" // เพิ่ม xmlns
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" // ลองใช้ path อื่นสำหรับ spinner ที่ดูดีขึ้น
          />
        </svg>
      )}
      {children || text} {/* <--- แสดง children ถ้ามี, ถ้าไม่มีก็แสดง text */}
    </button>
  );
};

export default Button;