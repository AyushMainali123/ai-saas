import { useEffect, useRef, useState } from "react";

interface IUseDebounce {
    value: string;
    delay: number;
}

export function useDebounce({ value, delay }: IUseDebounce) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutId = useRef<number | null>(null);

    useEffect(() => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = window.setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        }
    }, [value, delay]);

    return debouncedValue;
}