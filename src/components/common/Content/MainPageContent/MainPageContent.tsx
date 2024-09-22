import './MainPageContent.css';
import '../../../../assets/styles/flex-patterns.css';
import { VideoTrailerFeature } from "../../../features/VideoTrailerFeature/VideoTrailerFeature.tsx";
import { useHandelResize } from "../../../../hooks/useHandelResize.ts";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { SliderWithDescription } from "../../Sliders /SliderWithDescription/SliderWithDescription.tsx";
import { useCallback, useEffect, useState } from "react";
import { useRefs } from "../../../../hooks/useRefs.ts";
import { useSliderResponse } from "../../../../states/useSliderResponse.ts";
import { SliderBlackBackground } from "../../Sliders /SliderBlackBackground/SliderBlackBackground.tsx";
import { useSliderSectionIntersectionObserver } from "../../../../states/useSliderSectionIntersectionObserver.ts";
import { SliderGrid } from "../../Sliders /SliderGrid/SliderGrid.tsx";
import { ProvidersBlackBackgroundGrid } from "../../MainPageSections /ProvidersBlackBackgroundGrid/ProvidersBlackBackgroundGrid.tsx";
import clsx from "clsx";
import { SliderResponse } from "../../../../interfaces /slide-response-interface.ts";

const SliderSection = {
    SliderGrid: "SLIDER_GRID",
    SliderWithDescription: "SLIDER_WITH_DESCRIPTION",
    SliderBlackBackground: "SLIDER_BLACK_BACKGROUND"
} as const;

type SliderSectionType = typeof SliderSection[keyof typeof SliderSection]

export const MainPageContent = () => {
    const windowPathName = window.location.pathname
    const handleResizeStates = useHandelResize()
    const { refsByKey, setRef } = useRefs()
    const [elementRefs, setElementRefs] = useState<(HTMLDivElement | null)[]>([])
    const [sliderResponse, setSliderResponse] = useState<SliderResponse[]>(useSliderResponse.getState().sliderResponse)
    const updateSliderSectionIntersectionObserver = useSliderSectionIntersectionObserver((state) => state.setIntersectionObserver)
    const getSlideGenres = useSliderResponse((state) => state.getSlideGenres)
    const sliderWithDescription: SliderSectionType = SliderSection.SliderWithDescription
    const sliderGrid: SliderSectionType = SliderSection.SliderGrid
    const sliderBlackBackground: SliderSectionType = SliderSection.SliderBlackBackground

    useEffect(() => {
        setElementRefs(Object.values(refsByKey).filter(Boolean))
    }, [refsByKey])

    useEffect(() => {
        getSlideGenres()
        updateSliderSectionIntersectionObserver(elementRefs)
    }, [elementRefs, getSlideGenres, updateSliderSectionIntersectionObserver])

    useEffect(() => {
        const unsubscribe = useSliderResponse.subscribe((state) => {
            setSliderResponse(state.sliderResponse);
        });
        return () => unsubscribe();
    }, [])

    const renderSliderContent = useCallback((data: SliderResponse, index: number) => {
        const key = `${data.sliderId}-${data.sliderId}`;


        const renderContent = () => {
            if (data.sliderSectionType === sliderWithDescription) {
                return (
                    <SliderWithDescription
                        sliderId={data.sliderId}
                        label={data.label}
                        type={data.type}
                        key={`${key}-description`}
                    />
                );
            }
            if (data.sliderSectionType === sliderBlackBackground) {
                return (
                    <div
                        className="main-page-content-container__black-background-content start-column-top-flex"
                        key={key}
                    >
                        <SliderBlackBackground
                            sliderId={data.sliderId}
                            label={data.label}
                            type={data.type}
                            key={`${key}-black-background`}
                        />
                        {data.sliderId === 3 && <ProvidersBlackBackgroundGrid/>}
                    </div>
                );
            }
            if (data.sliderSectionType === sliderGrid) {
                return (
                    <SliderGrid
                        sliderId={data.sliderId}
                        label={data.label}
                        index={index}
                        type={data.type}
                        key={`${key}-description`}
                    />
                );
            }
        }

        return (
            <section
                className={clsx({
                    'slider-black-background': data.sliderSectionType === sliderBlackBackground,
                    'slider-transparent-background': !(data.sliderSectionType === sliderBlackBackground)
                })}
                style={data.sliderId === 2 ? { paddingTop: 40 } : {}}
                key={`${key}-slide-big-container`}
            >
                <div
                    className={clsx('main-page-content-container__movie-series-content', {
                        'start-row-center-flex': data.sliderSectionType === sliderGrid
                    })}
                    ref={(element) => setRef(element, data.sliderId.toString())}
                    key={`${key}-slide-container`}
                >
                    {renderContent()}
                </div>
            </section>
        )
    }, [setRef, sliderBlackBackground, sliderGrid, sliderWithDescription]);

    return (
        <div
            className={clsx('main-page-content-container', 'space-between-column-start-flex', {
                'notFullScreenWidth': handleResizeStates.isSideBarWhite,
                'fullScreenWidth': !handleResizeStates.isSideBarWhite
            })}
        >
            <section className="main-page-content-container__trailer-content center-flex">
                {windowPathName === '/' && window.innerWidth > 900 && (
                    <VideoTrailerFeature/>
                )}
            </section>
            {windowPathName === '/' && sliderResponse.map(renderSliderContent)}
        </div>
    );
}

