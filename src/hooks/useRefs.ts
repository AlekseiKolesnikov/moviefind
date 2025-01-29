import { useRef } from "react";

export const useRefs = () => {
    const refsByKey = useRef<Record<string,HTMLDivElement | null>>({})

    const setRef = (element: HTMLDivElement | null, key: string) => {
        refsByKey.current[key] = element;
    }
    return {refsByKey: refsByKey.current, setRef};
}