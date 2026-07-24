import React from 'react';

const PixelIconWithDither = () => {
    return (
        <div>
            {/* 
              SVG Definitions for Bayer Patterns.
              We define these once and reuse them.
              They are placed in a hidden SVG to not affect layout.
              'currentColor' is used to make the pattern color inheritable via CSS.
            */}
            <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1, opacity: 0 }}>
                <defs>
                    {/* Pattern for "light" (25% fill) */}
                    <pattern id="bayer-pattern-25" width="8" height="8" patternUnits="userSpaceOnUse">
                        <rect fill="currentColor" x="0" y="0" width="1" height="1"/><rect fill="currentColor" x="4" y="0" width="1" height="1"/><rect fill="currentColor" x="1" y="0" width="1" height="1"/><rect fill="currentColor" x="5" y="0" width="1" height="1"/>
                        <rect fill="currentColor" x="2" y="2" width="1" height="1"/><rect fill="currentColor" x="6" y="2" width="1" height="1"/><rect fill="currentColor" x="3" y="2" width="1" height="1"/><rect fill="currentColor" x="7" y="2" width="1" height="1"/>
                        <rect fill="currentColor" x="0" y="4" width="1" height="1"/><rect fill="currentColor" x="4" y="4" width="1" height="1"/><rect fill="currentColor" x="1" y="4" width="1" height="1"/><rect fill="currentColor" x="5" y="4" width="1" height="1"/>
                        <rect fill="currentColor" x="2" y="6" width="1" height="1"/><rect fill="currentColor" x="6" y="6" width="1" height="1"/><rect fill="currentColor" x="3" y="6" width="1" height="1"/><rect fill="currentColor" x="7" y="6" width="1" height="1"/>
                    </pattern>
                    {/* Pattern for "midtone" (50% fill) */}
                    <pattern id="bayer-pattern-50" width="8" height="8" patternUnits="userSpaceOnUse">
                        <path fill="currentColor" d="M0 0h1v1h-1z M4 0h1v1h-1z M1 0h1v1h-1z M5 0h1v1h-1z M2 1h1v1h-1z M6 1h1v1h-1z M3 1h1v1h-1z M7 1h1v1h-1z M2 2h1v1h-1z M6 2h1v1h-1z M3 2h1v1h-1z M7 2h1v1h-1z M0 2h1v1h-1z M4 2h1v1h-1z M1 2h1v1h-1z M5 2h1v1h-1z M0 4h1v1h-1z M4 4h1v1h-1z M1 4h1v1h-1z M5 4h1v1h-1z M2 5h1v1h-1z M6 5h1v1h-1z M3 5h1v1h-1z M7 5h1v1h-1z M2 6h1v1h-1z M6 6h1v1h-1z M3 6h1v1h-1z M7 6h1v1h-1z M0 6h1v1h-1z M4 6h1v1h-1z M1 6h1v1h-1z M5 6h1v1h-1z"/>
                    </pattern>
                    {/* Pattern for "shadow" (75% fill) - achieved by inverting a 25% pattern */}
                    <pattern id="bayer-pattern-75" width="8" height="8" patternUnits="userSpaceOnUse">
                        <rect fill="currentColor" width="8" height="8"/>
                        <rect fill="transparent" x="2" y="0" width="1" height="1"/><rect fill="transparent" x="6" y="0" width="1" height="1"/><rect fill="transparent" x="3" y="0" width="1" height="1"/><rect fill="transparent" x="7" y="0" width="1" height="1"/>
                        <rect fill="transparent" x="0" y="2" width="1" height="1"/><rect fill="transparent" x="4" y="2" width="1" height="1"/><rect fill="transparent" x="1" y="2" width="1" height="1"/><rect fill="transparent" x="5" y="2" width="1" height="1"/>
                        <rect fill="transparent" x="2" y="4" width="1" height="1"/><rect fill="transparent" x="6" y="4" width="1" height="1"/><rect fill="transparent" x="3" y="4" width="1" height="1"/><rect fill="transparent" x="7" y="4" width="1" height="1"/>
                        <rect fill="transparent" x="0" y="6" width="1" height="1"/><rect fill="transparent" x="4" y="6" width="1" height="1"/><rect fill="transparent" x="1" y="6" width="1" height="1"/><rect fill="transparent" x="5" y="6" width="1" height="1"/>
                    </pattern>
                </defs>
            </svg>

            <h4>Pixelated Icon with Dither Gradient</h4>
            <svg 
                width="128" 
                height="128" 
                viewBox="0 0 16 16" 
                style={{ color: '#34d399' /* Green color from your icon */ }}
            >
                {/* shapeRendering="crispEdges" is key for the pixelated look */}
                <g shapeRendering="crispEdges">
                    {/* SHADOW (densest pattern) */}
                    <g fill="url(#bayer-pattern-75)">
                        <rect x="7" y="14" width="2" height="1"/>
                        <rect x="6" y="13" width="1" height="1"/>
                        <rect x="9" y="13" width="1" height="1"/>
                        <rect x="5" y="12" width="1" height="1"/>
                        <rect x="10" y="12" width="1" height="1"/>
                    </g>
                    
                    {/* MIDTONE (main shape) */}
                    <g fill="url(#bayer-pattern-50)">
                        <path d="M8,13 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v-1 h1 v-1 h1 v-1 h1 v-1 h1 v1 h1 v1 h1 v1 h1 v1 h1 v-1 h1 v-1 h1 v-1 h1 v-1 h1 v1 h1 v1 h1 v1 h1 v1 h-1 v1 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v1 h-1 v1 h-1 v1z"/>
                    </g>

                    {/* HIGHLIGHT (lightest pattern) */}
                    <g fill="url(#bayer-pattern-25)">
                       <path d="M8,1 h-1 v1 h-1 v1 h-1 v1 h1 v1 h1 v-1 h1 v-1 h1 v-1z"/>
                       <path d="M8,1 h1 v1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 v-1z"/>
                    </g>
                </g>
            </svg>

            <h4>Same Icon, Larger</h4>
            <svg 
                width="256" 
                height="256" 
                viewBox="0 0 16 16" 
                style={{ color: '#34d399' }}
            >
                 <g shapeRendering="crispEdges">
                    <g fill="url(#bayer-pattern-75)"><rect x="7" y="14" width="2" height="1"/><rect x="6" y="13" width="1" height="1"/><rect x="9" y="13" width="1" height="1"/><rect x="5" y="12" width="1" height="1"/><rect x="10" y="12" width="1" height="1"/></g>
                    <g fill="url(#bayer-pattern-50)"><path d="M8,13 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v-1 h1 v-1 h1 v-1 h1 v-1 h1 v1 h1 v1 h1 v1 h1 v1 h1 v-1 h1 v-1 h1 v-1 h1 v-1 h1 v1 h1 v1 h1 v1 h1 v1 h-1 v1 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 v-1 h-1 v1 h-1 v1 h-1 v1z"/></g>
                    <g fill="url(#bayer-pattern-25)"><path d="M8,1 h-1 v1 h-1 v1 h-1 v1 h1 v1 h1 v-1 h1 v-1 h1 v-1z"/><path d="M8,1 h1 v1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 v-1z"/></g>
                </g>
            </svg>
        </div>
    );
};

export default PixelIconWithDither;
