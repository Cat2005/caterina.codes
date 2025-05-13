import React, { useEffect, useRef, useState } from 'react';

const DividerSVG = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When the SVG enters the viewport
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Once we've seen it, no need to keep observing
          if (svgRef.current) {
            observer.unobserve(svgRef.current);
          }
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust if needed
      }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      if (svgRef.current) {
        observer.unobserve(svgRef.current);
      }
    };
  }, []);

  return (
    <svg 
      ref={svgRef}
      width="476" 
      height="17" 
      viewBox="0 0 476 17" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-[500px]"
    >
      <path 
        d="M3 9.65632C9.40887 9.65632 14.1863 15.101 21.7358 12.5925C25.7312 11.265 28.0069 8.36374 31.9066 7.16056C34.1589 6.46564 39.0182 6.3531 41.5421 6.3531C52.5949 6.3531 62.232 10.4298 73.1253 11.0143C88.047 11.815 99.6448 10.933 114.344 8.66536C126.265 6.82631 140.403 3.51315 152.886 5.17862C162.579 6.47188 171.906 8.76715 181.793 9.80313C197.114 11.4086 211.946 10.6539 225.45 5.83927C233.644 2.91805 243.266 2.89666 252.453 3.04988C261.779 3.20541 271.502 6.29881 280.349 8.00471C290.672 9.99543 300.998 11.4807 311.932 10.9409C320.162 10.5346 328.508 6.3531 336.497 6.3531C345.832 6.3531 354.893 6.10551 363.857 8.04141C371.642 9.72276 379.977 11.4512 387.351 13.4734C395.035 15.5808 408.947 10.7922 415.425 9.14249C425.264 6.6367 433.694 5.59969 444.093 7.16056C450.667 8.14724 457.08 9.70436 463.781 10.317C466.345 10.5514 468.553 11.189 470.799 11.9686C471.767 12.3046 473 13.5845 473 12.9595" 
        stroke="#CA0079" 
        strokeWidth="5" 
        strokeLinecap="round"
        className={`animated-path ${isVisible ? 'animate' : ''}`}
      />
    </svg>
  );
};

export default DividerSVG; 