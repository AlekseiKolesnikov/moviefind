import './SliderBlackBackground.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";
import { useSliderResponse } from "../../../../states/useSliderResponse.ts";
import { useMoviePageResponse } from "../../../../states/useMoviePageResponse.ts";
import { useMovieTVShowsNavigation } from "../../../../states/useMovieTVShowsNavigation.ts";
import { useNavigate } from "react-router-dom";
import { MovieTvPageContent } from "../../../../interfaces /MoviePageResponseInterface.ts";

export const SliderBlackBackground = ({ sliderId, label, type }: { sliderId: number, label: string, type: string }) => {
    const requestMoviePageContent = useMoviePageResponse((state) => state.getMoviePageContent)
    const setMoviePageContentCallback = useMoviePageResponse((state) => state.setMoviePageContent)
    const updateMovieTVShowsNavigation = useMovieTVShowsNavigation((state) => state.setMovieTVShowsRoutes)
    const navigate = useNavigate()


    return (
        <div
            className="black-background-swiper__container"
        >
            <p>{label}</p>
            <Swiper
                breakpoints={{
                    750: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        spaceBetween: 20
                    },
                    600: {
                        slidesPerView: 2.5,
                        spaceBetween: 20
                    },
                    450: {
                        slidesPerView: 2.5,
                        spaceBetween: 20
                    },
                    0: {
                        slidesPerView: 1.5,
                        spaceBetween: 20
                    }
                }}
                freeMode={true}
                cssMode={true}
                mousewheel={true}
                navigation={true}
                modules={[FreeMode, Navigation, Mousewheel]}
                className="black-background-swiper__swiper-settings"
            >
                {useSliderResponse.getState().sliderResponse[sliderId].response.map((data) => (
                    <SwiperSlide
                        key={data.itemId}
                        className="black-background-swiper__slide"
                        onClick={() => {
                            requestMoviePageContent(
                                type,
                                data.itemId,
                                (response: MovieTvPageContent | undefined) => {
                                    if (response) {
                                        setMoviePageContentCallback(data.itemId, response)
                                        navigate(useMovieTVShowsNavigation.getState().movieTVShowsRoutes.pathName)
                                    }
                                }
                            )
                            updateMovieTVShowsNavigation(type, data.itemId.toString())
                        }}
                    >
                        <img src={data.posterUrl} alt={data.itemId.toString()}/>
                        {data.ranking > 8
                            ? (
                                <div className="swiper__slide-ranking-gold space-between-row-center-flex">
                                    <span className="swiper__slide-ranking-gold-left-branch"></span>
                                    <span className="swiper__slide-ranking-gold-number">{data.ranking.toFixed(1)}</span>
                                    <span className="swiper__slide-ranking-gold-right-branch"></span>
                                </div>
                            )
                            : (
                                <div className="swiper__slide-ranking-green">{data.ranking.toFixed(1)}</div>
                            )
                        }
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

