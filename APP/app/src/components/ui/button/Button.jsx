import React from "react";
import "./Button.css";

export default function Button({
  children,
  variant = "primary", // 'primary', 'secondary', 'outline', 'ghost'
  size = "md",         // 'sm', 'md', 'lg'
  as = "button",       // 'button' o 'a'
  href,
  onClick,
  ...props
}) {
  const Component = as === "a" ? "a" : "button";

  return (
    <Component
      href={as === "a" ? href : undefined}
      onClick={onClick}
      className={`btn-base btn-${variant} btn-${size}`}
      {...props}
    >
      {children}
    </Component>
  );
}
