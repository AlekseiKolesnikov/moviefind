import './AppContent.css';
import '../../../assets/styles/flex-patterns.css';
import {
    CategoryOptionsContainer
} from "../../common/CategoryOptions/CategoryOptionsContainer/CategoryOptionsContainer.tsx";
import { CategoryOptionData } from "../../common/CategoryOptions/CategoryOptionData/CategoryOptionData.tsx";
import { VideoTrailerFeature } from "../../features/VideoTrailerFeature/VideoTrailerFeature.tsx";
import { useHandelResize } from "../../../hooks/useHandelResize.ts";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { SliderWithDescription } from "../../common/SliderWithDescription/SliderWithDescription.tsx";
import { useCallback, useEffect, useState } from "react";
import { useRefs } from "../../../hooks/useRefs.ts";
import { SliderResponse, useSliderResponse } from "../../../states/useSliderResponse.ts";
import { SliderBlackBackground } from "../../common/SliderBlackBackground/SliderBlackBackground.tsx";
import { useSliderSectionIntersectionObserver } from "../../../states/useSliderSectionIntersectionObserver.ts";
import { SliderGrid } from "../../common/SliderGrid/SliderGrid.tsx";
import {
    ProvidersBlackBackgroundGrid
} from "../../common/ProvidersBlackBackgroundGrid/ProvidersBlackBackgroundGrid.tsx";

export const AppContent = () => {
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
                    <SliderWithDescription sliderId={data.sliderId} label={data.label} key={`${key}-description`}/>
                );
            }
            if (index === 2 || index === 3) {
                return (
                    <div
                        className="content-container__black-background-content start-column-top-flex"
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
                    <SliderGrid sliderId={data.sliderId} label={data.label} key={`${key}-description`}/>
                );
            }
        }

        return (
            <div
                className={index === 2 || index === 3 ? "slider-black-background" : "slider-transparent-background"}
                style={index === 2 ? { paddingTop: 40 } : {}}
                key={`${key}-slide-big-container`}
            >
                <div
                    className="content-container__movie-series-content"
                    ref={(element) => setRef(element, data.sliderId.toString())}
                    key={`${key}-slide-container`}
                >
                    {renderContent()}
                </div>
            </div>
        )
    }, [setRef]);

    return (
        <div
            className={`content-container ${handleResizeStates.isSideBarWhite ? "notFullScreenWidth" : "fullScreenWidth"} space-between-column-start-flex`}
        >
            <div className="content-container__trailer-content center-flex">
                {windowPathName !== '/' && (
                    <div className="list-option-pages">
                        <CategoryOptionsContainer/>
                        <CategoryOptionData/>
                    </div>
                )}
                {windowPathName === '/' && window.innerWidth > 900 && (
                    <VideoTrailerFeature/>
                )}
            </div>
            {windowPathName === '/' && sliderResponse.map(renderSliderContent)}
        </div>
    );
}

