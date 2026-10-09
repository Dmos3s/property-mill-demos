// Animated windmill mark, drawn from the Property Mill logo: orange tower, blue-rimmed blades, Dutch blue ring.
import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

type Props = {
  className?: string;
  tower?: string;
  blade?: string;
  bladeStroke?: string;
  ring?: string;
  ringInner?: string;
  speed?: number; // seconds per revolution
  title?: string;
};

export function Windmill({
  className,
  tower = "#F26A1B",
  blade = "#FFFFFF",
  bladeStroke = "#1428D2",
  ring = "#1428D2",
  ringInner = "#B5121B",
  speed = 14,
  title = "Property Mill windmill",
}: Props) {
  const reduce = useReducedMotion();
  const gradId = `pm-tower-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 200 220" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={tower} stopOpacity="0.75" />
          <stop offset="1" stopColor={tower} />
        </linearGradient>
      </defs>
      {/* ground ring */}
      <ellipse cx="100" cy="196" rx="92" ry="18" fill="none" stroke={ring} strokeWidth="7" />
      <ellipse cx="112" cy="196" rx="56" ry="10" fill={ringInner} opacity="0.9" />
      {/* tower */}
      <path d="M68 196 L80 96 Q100 84 120 96 L132 196 Z" fill={`url(#${gradId})`} stroke={ring} strokeWidth="3" strokeLinejoin="round" />
      <path d="M78 98 Q100 78 122 98" fill="none" stroke={ring} strokeWidth="3" />
      <rect x="94" y="124" width="12" height="16" rx="1" fill="none" stroke={ring} strokeWidth="2.5" />
      <rect x="92" y="156" width="16" height="22" rx="1" fill="none" stroke={ring} strokeWidth="2.5" />
      {/* blades */}
      <motion.g
        style={{ originX: "100px", originY: "92px", transformBox: "view-box" }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        {[0, 90, 180, 270].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 100 92)`}>
            <path d="M100 92 L100 18 L118 14 L118 88 Z" fill={blade} stroke={bladeStroke} strokeWidth="3.5" strokeLinejoin="round" />
            <line x1="100" y1="92" x2="100" y2="18" stroke={bladeStroke} strokeWidth="5" strokeLinecap="round" />
          </g>
        ))}
        <circle cx="100" cy="92" r="5" fill={blade} stroke={bladeStroke} strokeWidth="3" />
      </motion.g>
    </svg>
  );
}
