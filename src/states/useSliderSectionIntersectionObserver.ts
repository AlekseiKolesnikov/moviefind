import { create } from "zustand";
import { useSliderResponse } from "./useSliderResponse.ts";
import { SliderResponse, SliderSection } from "../interfaces /slide-response-interface.ts";

type SliderSectionIntersectionObserver = {
    sliderSection: SliderSection[],
    setInitialSliderSection: (initialElementsRefArray: (HTMLDivElement | null)[]) => void,
    setSliderSectionIsVisible: (intersectionObserverEntry: IntersectionObserverEntry, sliderElementRefIndex: number) => void,
    setIntersectionObserver: (elementRef: (HTMLDivElement | null)[]) => void
}

export const useSliderSectionIntersectionObserver = create<SliderSectionIntersectionObserver>((set, get) => ({
    sliderSection: [
        {
            ref: null,
            label: "Top Rated Movies",
            id: 0,
            sliderSectionType: "SLIDER_WITH_DESCRIPTION",
            type: "movie",
            isVisible: false,
            apiUrl: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200"
        },
        {
            ref: null,
            label: "Top Rated Series",
            id: 1,
            sliderSectionType: "SLIDER_WITH_DESCRIPTION",
            type: "tv",
            isVisible: false,
            apiUrl: "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200"
        },
        {
            ref: null,
            label: "Now Paying Movies",
            id: 2,
            sliderSectionType: "SLIDER_BLACK_BACKGROUND",
            type: "movie",
            isVisible: true,
            apiUrl: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}"
        },
        {
            ref: null,
            label: "Airing Today Series",
            id: 3,
            sliderSectionType: "SLIDER_BLACK_BACKGROUND",
            type: "tv",
            isVisible: true,
            apiUrl: "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte={max_date}&air_date.gte={min_date}"
        },
        {
            ref: null,
            label: "Trending Series",
            id: 4,
            sliderSectionType: "SLIDER_GRID",
            type: "tv",
            isVisible: false,
            apiUrl: "https://api.themoviedb.org/3/trending/tv/week?language=en-US"
        },
        {
            ref: null,
            label: "Upcoming Movies",
            id: 5,
            sliderSectionType: "SLIDER_GRID",
            type: "movie",
            isVisible: false,
            apiUrl: "https://api.themoviedb.org/3/movie/upcoming?language=en-US"
        }
    ],
    setInitialSliderSection: ((initialElementsRefArray) => set((state) => ({
        sliderSection: state.sliderSection.map((value) => ({
            ...value,
            ref: initialElementsRefArray[value.id]
        }))
    }))),
    setSliderSectionIsVisible: ((intersectionObserverEntry, sliderElementRefIndex) => set((state) => ({
        sliderSection: state.sliderSection.map((element) => (element.id <= sliderElementRefIndex && element.id >= sliderElementRefIndex) ?
            { ...element, isVisible: intersectionObserverEntry.isIntersecting } : element)
    }))),
    setIntersectionObserver: (elementRef) => {
        const setSliderSectionInitialState = get().setInitialSliderSection
        const updateSliderSectionIsVisibleState = get().setSliderSectionIsVisible
        const updateSliderResponse = useSliderResponse.getState().setSliderResponse
        const getMoviesSlidersData = useSliderResponse.getState().getMoviesSlidersData
        setSliderSectionInitialState(elementRef)

        const sliderResponseCallBack = (response: SliderResponse) => {
            if (response.response) {
                updateSliderResponse(response)
            }
        }
        const exceptionCallBack = (error: Error) => {
            if (error.name.includes('404')) {
                console.log('no data')
            }
        }

        const getSliderLists = (entry: IntersectionObserverEntry) => {
            const elementRefIndex = useSliderSectionIntersectionObserver.getState().sliderSection.findIndex((element) => element.ref === entry.target)
            updateSliderSectionIsVisibleState(entry, elementRefIndex)
            if (useSliderSectionIntersectionObserver.getState().sliderSection[elementRefIndex].isVisible) {
                getMoviesSlidersData(
                    useSliderSectionIntersectionObserver.getState().sliderSection[elementRefIndex].id,
                    sliderResponseCallBack,
                    exceptionCallBack
                )
            }
        }

        const observer = new IntersectionObserver((entries) => {
            const sliderSectionArray = get().sliderSection
            if (!sliderSectionArray[sliderSectionArray.length - 1].isVisible) {
                if (entries.length === elementRef.length) {
                    entries.map((entry) => {
                        getSliderLists(entry)
                    })
                } else {
                    const entry = entries[0]
                    getSliderLists(entry)
                }
            }
        }, {
            rootMargin: "50px"
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
    }
}))


