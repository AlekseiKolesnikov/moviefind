import './SliderWithDescription.css'
import '../../../../assets/styles/flex-patterns.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/controller';
import { useSliderResponse } from "../../../../states/useSliderResponse.ts";
import { SlideRanking } from "../SlideRanking/SlideRanking.tsx";
import { useMoviePageResponse } from "../../../../states/useMoviePageResponse.ts";
import { useMovieTVShowsNavigation } from "../../../../states/useMovieTVShowsNavigation.ts";
import { useNavigate } from "react-router-dom";
import { MovieTvPageContent } from "../../../../interfaces /MoviePageResponseInterface.ts";

export const SliderWithDescription = ({ sliderId, label, type }: { sliderId: number, label: string, type: string }) => {
    const requestMoviePageContent = useMoviePageResponse((state) => state.getMoviePageContent)
    const setMoviePageContentCallback = useMoviePageResponse((state) => state.setMoviePageContent)
    const updateMovieTVShowsNavigation = useMovieTVShowsNavigation((state) => state.setMovieTVShowsRoutes)
    const navigate = useNavigate()

    return (
        <div
            className="small-swiper__container"
        >
            <p>{label}</p>
            <Swiper
                breakpoints={{
                    750: {
                        slidesPerView: 6,
                        spaceBetween: 20
                    },
                    650: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    },
                    600: {
                        slidesPerView: 4.5,
                        spaceBetween: 20
                    },
                    450: {
                        slidesPerView: 3.5,
                        spaceBetween: 20
                    },
                    0: {
                        slidesPerView: 2.5,
                        spaceBetween: 20
                    }
                }}
                freeMode={true}
                cssMode={true}
                mousewheel={true}
                keyboard={true}
                modules={[FreeMode, Mousewheel, Keyboard]}
                className="small-swiper__swiper-settings"
            >
                {useSliderResponse.getState().sliderResponse[sliderId].response.map((data) => (
                    <div
                        className="small-swiper__slide-container center-column-top-flex"
                        key={data.itemId}
                    >
                        <SwiperSlide
                            key={data.itemId}
                            className="small-swiper__slide start-column-top-flex"
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
                            <SlideRanking
                                posterUrl={data.posterUrl}
                                itemId={data.itemId}
                                ranking={data.ranking}
                            />
                            <div className="small-swiper__slide-inf-container start-column-top-flex">
                                <div className="small-swiper__movie-label">{data.movieLabel}</div>
                                <div className="small-swiper__year-genres-container start-row-top-flex">
                                    <div className="small-swiper__movie-release-year start-row-top-flex">
                                        <span>{data.releaseYear}, </span>
                                        <span className="small-swiper__genres-container">{data.genre}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </div>
                ))}
            </Swiper>
        </div>
    )
}

