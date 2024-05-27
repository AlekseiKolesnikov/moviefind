import { useEffect } from "react";
import { useSliderSectionState } from "../states/useSliderSectionState.ts";

export const useIntersectionObserver = (elementRef: (HTMLDivElement | null)[]) => {
    const setSliderSectionInitialState = useSliderSectionState((state) => state.setInitialSliderSection)
    const updateSliderSectionIsVisibleState = useSliderSectionState((state) => state.setSliderSectionIsVisible)
    setSliderSectionInitialState(elementRef)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries.length === elementRef.length) {
                entries.map((entry, index) => {
                    updateSliderSectionIsVisibleState(entry, index)
                })
            } else {
                const entry = entries[0]
                const elementRefIndex = useSliderSectionState.getState().sliderSection.findIndex((element) => element.ref === entry.target)
                updateSliderSectionIsVisibleState(entry, elementRefIndex)
            }
        })
        elementRef.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });
        return () => {
            elementRef.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, [elementRef, updateSliderSectionIsVisibleState])
}