// components/TicketCornerStub.tsx
import React from 'react'

export interface TicketCornerStubProps {
  ticketNumber: string | number
}

const TicketStub: React.FC<TicketCornerStubProps> = ({ ticketNumber }) => {
  return (
    <div className="w-40 h-20 mx-auto my-1 relative">
      {/* SVG mask that cuts four circles out of the rectangle */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 192 112"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="hole-mask">
            {/* white = keep, black = cut out */}
            <rect x="0" y="0" width="192" height="112" fill="white" rx="8" ry="8" />
            {/* Four corner holes */}
            <circle cx="0"   cy="0"   r="20" fill="black" />
            <circle cx="192" cy="0"   r="20" fill="black" />
            <circle cx="0"   cy="112" r="20" fill="black" />
            <circle cx="192" cy="112" r="20" fill="black" />
          </mask>
        </defs>

        {/* The ticket background + border, with the mask applied */}
        <rect
          x="0"
          y="0"
          width="192"
          height="112"
          rx="8"
          ry="8"
          fill="#D397F8"
          mask="url(#hole-mask)"
        />
      </svg>

      {/* Inner box for the number */}
      <div className="relative flex items-center justify-center h-full">
        <div className="px-4 py-2 rounded-md">
          <span className="text-lg font-mono tracking-widest text-gray-800">
            {ticketNumber}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TicketStub