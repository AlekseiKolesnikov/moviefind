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
import { SliderResponse, useSliderResponse } from "../../../../states/useSliderResponse.ts";
import { SliderBlackBackground } from "../../Sliders /SliderBlackBackground/SliderBlackBackground.tsx";
import { useSliderSectionIntersectionObserver } from "../../../../states/useSliderSectionIntersectionObserver.ts";
import { SliderGrid } from "../../Sliders /SliderGrid/SliderGrid.tsx";
import { ProvidersBlackBackgroundGrid } from "../../ProvidersBlackBackgroundGrid/ProvidersBlackBackgroundGrid.tsx";
import clsx from "clsx";

export const MainPageContent = () => {
    const windowPathName = window.location.pathname
    const handleResizeStates = useHandelResize()
    const { refsByKey, setRef } = useRefs()
    const [elementRefs, setElementRefs] = useState<(HTMLDivElement | null)[]>([])
    const [sliderResponse, setSliderResponse] = useState<SliderResponse[]>(useSliderResponse.getState().sliderResponse)
    const updateSliderSectionIntersectionObserver = useSliderSectionIntersectionObserver((state) => state.setIntersectionObserver)
    const getSlideGenres = useSliderResponse((state) => state.getSlideGenres)

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
        const key = `${data.sliderId}-${index}`;


        const renderContent = () => {
            if (index === 0 || index === 1) {
                return (
                    <SliderWithDescription sliderId={data.sliderId} label={data.label} type={data.type}
                                           key={`${key}-description`}/>
                );
            }
            if (index === 2 || index === 3) {
                return (
                    <div
                        className="main-page-content-container__black-background-content start-column-top-flex"
                        key={key}
                    >
                        <SliderBlackBackground
                            sliderId={data.sliderId}
                            label={data.label}
                            key={`${key}-black-background`}
                        />
                        {index === 3 && <ProvidersBlackBackgroundGrid/>}
                    </div>
                );
            }
            if (index === 4 || index === 5) {
                return (
                    <SliderGrid sliderId={data.sliderId} label={data.label} index={index} key={`${key}-description`}/>
                );
            }
        }

        return (
            <section
                className={clsx({
                    'slider-black-background': index === 2 || index === 3,
                    'slider-transparent-background': !(index === 2 || index === 3)
                })}
                style={index === 2 ? { paddingTop: 40 } : {}}
                key={`${key}-slide-big-container`}
            >
                <div
                    className={clsx('main-page-content-container__movie-series-content', {
                        'start-row-center-flex': index === 4 || index === 5
                    })}
                    ref={(element) => setRef(element, data.sliderId.toString())}
                    key={`${key}-slide-container`}
                >
                    {renderContent()}
                </div>
            </section>
        )
    }, [setRef]);

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

