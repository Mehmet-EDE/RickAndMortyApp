import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '@/assets/loading.json'
function Loading() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            const animation = lottie.loadAnimation({
                container: containerRef.current,
                animationData,
                renderer: 'svg', // veya 'canvas' kullanabilirsiniz
                loop: true,
                autoplay: true,
            });

            return () => {
                animation.destroy(); // Bileşen temizlendiğinde animasyonu yok edin
            };
        }
    }, []);

    return <div ref={containerRef} />;
};

export default Loading