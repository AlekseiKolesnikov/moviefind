import './SliderWithDescription.css'
import '../../../assets/styles/flex-patterns.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/controller';
import { useSliderResponse } from "../../../states/useSliderResponse.ts";
import { SlideRanking } from "../SlideRanking/SlideRanking.tsx";

export const SliderWithDescription = ({ sliderId, label }: { sliderId: number, label: string }) => {

    return (
        <div
            className="small-swiper__container"
        >
            <p>{label}</p>
            <Swiper
                breakpoints={{
                    750: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                        spaceBetween: 20
                    },
                    600: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                        spaceBetween: 20
                    },
                    450: {
                        slidesPerView: 4.5,
                        spaceBetween: 20
                    },
                    0: {
                        slidesPerView: 3.5,
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
                        >
                            <SlideRanking
                                posterUrl={data.posterUrl}
                                itemId={data.itemId}
                                ranking={data.ranking}
                            />
                            <div className="small-swiper__slide-inf-container start-column-top-flex">
                                <div className="small-swiper__movie-label">{data.movieLabel}</div>
                                <div className="small-swiper__year-genres-container start-row-top-flex">
                                    <div className="small-swiper__movie-release-year">{data.releaseYear},</div>
                                    <div className="small-swiper__movie-genres">
                                        {data.genres.map((genre) => {
                                                const genreIndex = useSliderResponse.getState().slideGenres.findIndex(value => value.id === genre)
                                                return (
                                                    <p
                                                        key={genre}
                                                    >
                                                        {useSliderResponse.getState().slideGenres[genreIndex].name}
                                                    </p>
                                                )
                                            }
                                        )}
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

