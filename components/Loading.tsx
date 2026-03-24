import React, { useEffect, useRef } from 'react';
import animationData from '@/assets/loading.json'
function Loading() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            const lottie = require('lottie-web');
            const animation = lottie.loadAnimation({
                container: containerRef.current,
                animationData,
                renderer: 'svg',
                loop: true,
                autoplay: true,
            });

            return () => {
                animation.destroy();
            };
        }
    }, []);

    return <div ref={containerRef} />;
};

export default Loading