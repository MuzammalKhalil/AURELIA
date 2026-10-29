import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  className = "",
  light = false,
}: SectionHeadingProps) {
  const alignClass =
    align === "center"
      ? "text-center items-center mx-auto"
      : align === "right"
      ? "text-right items-end ml-auto"
      : "text-left items-start";

  return (
    <div className={`flex flex-col space-y-4 max-w-2xl ${alignClass} ${className}`}>
      {badge && (
        <div className="inline-flex items-center space-x-2">
          <span className="w-6 h-[1px] bg-champagne" />
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-champagne font-medium">
            {badge}
          </span>
          {align === "center" && <span className="w-6 h-[1px] bg-champagne" />}
        </div>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide leading-[1.15] ${
          light ? "text-[#141210]" : "text-ivory"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm md:text-base leading-relaxed font-light ${
            light ? "text-[#5C554D]" : "text-ivory-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

