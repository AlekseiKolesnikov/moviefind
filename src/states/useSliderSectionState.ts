import { create } from "zustand";

type SliderSection = {
    ref: HTMLDivElement | null,
    isVisible: boolean
}

type SliderSectionIntersectionObserver = {
    sliderSection: SliderSection[],
    setInitialSliderSection: (initialElementsRefArray: (HTMLDivElement | null)[]) => void,
    setSliderSectionIsVisible: (intersectionObserverEntry: IntersectionObserverEntry, sliderElementRefIndex: number) => void
}

export const useSliderSectionState = create<SliderSectionIntersectionObserver>((set) => ({
    sliderSection: [],
    setInitialSliderSection: ((initialElementsRefArray) => set((state) => ({
        sliderSection: state.sliderSection = initialElementsRefArray.map(ref => ({
            ref,
            isVisible: false
        }))
    }))),
    setSliderSectionIsVisible: ((intersectionObserverEntry, sliderElementRefIndex) => set((state) => ({
        sliderSection: state.sliderSection.map((element, index) => (index <= sliderElementRefIndex && index >= sliderElementRefIndex) ?
            {...element, isVisible: intersectionObserverEntry.isIntersecting} : element)
    })))
}))
