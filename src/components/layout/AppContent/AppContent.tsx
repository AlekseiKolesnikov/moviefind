import './AppContent.css';
import '../../../assets/styles/flex-patterns.css';
import { ListOptionsContainer } from "../../features/ListOptionFeature/ListOptionsContainer/ListOptionsContainer.tsx";
import { AppCategoryOption } from "../../common/AppCategoryOption/AppCategoryOption.tsx";
import { VideoTrailerFeature } from "../../features/VideoTrailerFeature/VideoTrailerFeature.tsx";
import { useHandelResize } from "../../../hooks/useHandelResize.ts";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { AppDataSlider } from "../../common/AppDataSlider/AppDataSlider.tsx";
import { useEffect, useState } from "react";
import { useRefs } from "../../../hooks/useRefs.ts";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver.ts";
import { useSliderSectionState } from "../../../states/useSliderSectionState.ts";

interface IMovieDataArray {
    label: string,
    inViewId: number,
    divId: number,
    sliderId: number
}

const movieDataArray: IMovieDataArray[] = [
    {
        label: "0",
        inViewId: 1,
        divId: 11,
        sliderId: 111
    },
    {
        label: "1",
        inViewId: 2,
        divId: 22,
        sliderId: 222
    },
    {
        label: "2",
        inViewId: 3,
        divId: 33,
        sliderId: 333
    },
    {
        label: "3",
        inViewId: 4,
        divId: 44,
        sliderId: 444
    },
    {
        label: "4",
        inViewId: 5,
        divId: 55,
        sliderId: 555
    },
    {
        label: "5",
        inViewId: 6,
        divId: 66,
        sliderId: 666
    },
    {
        label: "6",
        inViewId: 7,
        divId: 77,
        sliderId: 777
    },
    {
        label: "7",
        inViewId: 8,
        divId: 88,
        sliderId: 888
    },
    {
        label: "8",
        inViewId: 9,
        divId: 99,
        sliderId: 999
    },
]

export const AppContent = () => {
    const windowPathName = window.location.pathname
    const handleResizeStates = useHandelResize()
    const { refsByKey, setRef } = useRefs()
    const [elementRefs, setElementRefs] = useState<(HTMLDivElement | null)[]>([])
    useIntersectionObserver(elementRefs)

    useEffect(() => {
        setElementRefs(Object.values(refsByKey).filter(Boolean))
    }, [refsByKey])

    useEffect(() => {
        const scrollHandler = () => {
            console.log(useSliderSectionState.getState().sliderSection)
        }

        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    return (
        <div
            className={`content-container ${handleResizeStates.isSideBarWhite ? "notFullScreenWidth" : "fullScreenWidth"} space-between-column-start-flex`}
        >
            <div className="content-container__top-page-content center-flex">
                {windowPathName !== '/' &&
                    <div className="list-option-pages">
                        <ListOptionsContainer/>
                        <AppCategoryOption/>
                    </div>
                }
                {(windowPathName === '/' && window.innerWidth > 900) &&
                    <VideoTrailerFeature/>
                }
            </div>
            {windowPathName === '/' && (movieDataArray.map((data) => (
                <div
                    className="content-container__movie-series-content"
                    key={data.label}
                    ref={element => setRef(element, data.label)}
                >
                    <AppDataSlider key={data.label}/>
                </div>
            )))}
        </div>
    )
}

