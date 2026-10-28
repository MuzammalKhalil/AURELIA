import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs tracking-[0.18em]",
    md: "px-6 py-3 text-xs tracking-[0.2em]",
    lg: "px-8 py-4 text-sm tracking-[0.22em]",
  };

  const variantClasses = {
    primary:
      "bg-champagne text-obsidian font-medium hover:bg-champagne-300 shadow-champagne hover:scale-[1.02]",
    secondary:
      "bg-charcoal text-ivory border border-champagne/30 hover:border-champagne hover:bg-charcoal-50",
    outline:
      "bg-transparent text-ivory border border-white/20 hover:border-champagne hover:text-champagne",
    ghost:
      "bg-transparent text-champagne hover:text-ivory px-2 py-1",
  };

  const commonClass = `inline-flex items-center justify-center space-x-2.5 uppercase font-sans font-medium rounded-full transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={commonClass}>
        <span>{children}</span>
        {icon && <ArrowUpRight className="w-3.5 h-3.5" />}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={commonClass}
    >
      <span>{children}</span>
      {icon && <ArrowUpRight className="w-3.5 h-3.5" />}
    </button>
  );
}

