import React from 'react';

const PixelStarIcon = () => {
    return (
        <div>
            {/* 
              These SVG pattern definitions can be placed in a global sprite sheet 
              or included with the component like this. Using 'currentColor' allows
              the color to be set via CSS.
            */}
            <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1, opacity: 0 }}>
                <defs>
                    {/* 50% Bayer Dither Pattern (Checkerboard) */}
                    <pattern id="bayer-pattern-50" width="2" height="2" patternUnits="userSpaceOnUse">
                        <rect fill="currentColor" width="1" height="1" x="0" y="0" />
                        <rect fill="currentColor" width="1" height="1" x="1" y="1" />
                    </pattern>
                </defs>
            </svg>

            <h4>Icon from your example:</h4>
            <svg 
                width="128" 
                height="128" 
                viewBox="0 0 26 26" // Using a 26x26 grid
                style={{ color: '#333' }}
            >
                <g shapeRendering="crispEdges">
                    {/* Solid part of the star */}
                    <path fill="currentColor" d="M12 11h2v-1h-2z M11 12h-1v-1h-1v-1h-1v-1h-1v-1h-1v-2h-1v-2h1v-1h1v-1h1v1h1v1h1v1h1v1h1v1h-2v1h-1v1h-1z M14 12v-1h1v-1h1v-1h1v-1h1v-1h1v-2h1v-2h-1v-1h-1v-1h-1v1h-1v1h-1v1h-1v1h-1v1h2v1h1v1h1z M12 14v1h-1v1h-1v1h-1v1h-1v1h-1v2h-1v2h1v1h1v1h-2v1h6v-1h-1v-1h-1v-1h1v-1h1v-1h-1v-1h-1z M14 14v1h1v1h1v1h1v1h1v1h1v2h1v2h-1v1h-1v1h2v1h-6v-1h1v-1h1v-1h-1v-1h-1v-1h1v-1h1z" />
                    
                    {/* Dithered part of the star */}
                    <path fill="url(#bayer-pattern-50)" d="M13 1v1h-1v1h-1v1h-1v1h1v1h1v1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h1v-1h1v-1h1v-1h2z M13 12h1v-1h1v-1h1v-1h1v-1h1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v1h1v1h1v1h1v1h-1v1h-1v1h-1v1h-1v1h2z M11 14h2v-1h1v-1h-2z M13 14v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-1h1v-1h1v1h1v1h1v-1h2z" />
                </g>
            </svg>
        </div>
    );
};

export default PixelStarIcon;
