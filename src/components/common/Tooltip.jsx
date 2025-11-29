import { useState, useRef, useEffect } from 'react';

export const Tooltip = ({ children, content, delay = 600 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const elementRef = useRef(null);
  const tooltipRef = useRef(null);
  const isMouseOverRef = useRef(false);

  const showTooltip = () => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    // Clear any pending show timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    isMouseOverRef.current = true;
    
    // Delay before showing
    timeoutRef.current = setTimeout(() => {
      if (isMouseOverRef.current && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top - 40,
          left: rect.left + rect.width / 2,
        });
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    isMouseOverRef.current = false;
    
    // Clear show timeout if pending
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Delay before hiding to prevent flickering
    hideTimeoutRef.current = setTimeout(() => {
      if (!isMouseOverRef.current) {
        setIsVisible(false);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={elementRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      
      {isVisible && content && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] px-3 py-2 text-xs font-semibold text-white bg-gray-900 rounded-lg shadow-xl whitespace-nowrap pointer-events-none animate-fade-in"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translateX(-50%)',
          }}
        >
          {content}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #1f2937',
              marginTop: '-1px',
            }}
          />
        </div>
      )}
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};
