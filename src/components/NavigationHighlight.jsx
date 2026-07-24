
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavigationHighlight = ({ navLinksRef }) => {
  const location = useLocation();
  const [highlightStyle, setHighlightStyle] = useState({ opacity: 0 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const navLinks = navLinksRef.current;
    if (!navLinks) {
      return;
    }

    const updateHighlight = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
        const currentPath = location.pathname.split('/')[1] || 'home';
        const activeItem = navLinks.querySelector(`a.nav-item[data-page="${currentPath}"]`);
        
        if (activeItem) {
          const topOffset = activeItem.offsetTop;
          const leftOffset = activeItem.offsetLeft;
          const itemWidth = activeItem.offsetWidth;
          const itemHeight = activeItem.offsetHeight;

          setHighlightStyle({
            position: 'absolute',
            transform: `translate(${leftOffset}px, ${topOffset}px)`,
            width: `${itemWidth}px`,
            height: `${itemHeight}px`,
            opacity: 1,
            transition: 'transform 0.3s ease, width 0.3s ease, opacity 0.3s ease',
          });
        } else {
            setHighlightStyle(prevStyle => ({ ...prevStyle, opacity: 0 }));
        }
      });
    };

    updateHighlight();

    const resizeObserver = new ResizeObserver(updateHighlight);
    resizeObserver.observe(navLinks);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [location, navLinksRef]);

  return <div className="nav-highlight bg-p radius-6" style={highlightStyle} />;
};

NavigationHighlight.propTypes = {
    navLinksRef: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]).isRequired
};

export default NavigationHighlight;
