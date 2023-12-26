import React, { HTMLAttributes } from 'react'

const InfoIcon: React.FC<HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 256 256"
      width="16"
      height="16"
      {...props}
    >
      <path
        d="m128 22.158a105.84 105.84 0 0 0 -105.84 105.84 105.84 105.84 0 0 0 105.84 105.84 105.84 105.84 0 0 0 105.84 -105.84 105.84 105.84 0 0 0 -105.84 -105.84zm0 32.76c5.16 0.117 9.55 1.875 13.18 5.273 3.34 3.575 5.07 7.94 5.19 13.096-0.12 5.156-1.85 9.404-5.19 12.744-3.63 3.75-8.02 5.625-13.18 5.625s-9.4-1.875-12.74-5.625c-3.75-3.34-5.63-7.588-5.63-12.744s1.88-9.521 5.63-13.096c3.34-3.398 7.58-5.156 12.74-5.273zm-16.35 53.792h32.79v92.37h-32.79v-92.37z"
        fill-rule="evenodd"
        fill="#6578ff"
      />
    </svg>
  )
}

export default InfoIcon
