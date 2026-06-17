import {useEffect, useState} from "react";

export function useScreenHeight() {
    const [height, setHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 0);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => setHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return height;
}
