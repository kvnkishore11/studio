// src/components/icons/search-icon.tsx
import type { SVGProps } from "react"

export const SearchIcon = ({ size = 24, className = "", ...props }: SVGProps<SVGSVGElement> & { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" />
    <path d="M21 21L15 15" />
    <path d="M12 7H7.5" opacity="0.5" />
    <path d="M11 10H8" opacity="0.5" />
  </svg>
);
