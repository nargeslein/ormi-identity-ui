import React from "react";

interface ButtonProps {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string
  width: string;
}

const Button: React.FC<ButtonProps> = ({ 
    border,
    color,
    children,
    height,
    onClick, 
    radius,
    width
  }) => { 
  return (
    <button 
      onClick={onClick}
      style={{
         backgroundColor: color,
         border,
         borderRadius: radius,
         height,
         width
      }}
    >
    {children}
    </button>
  );
}

export default Button;