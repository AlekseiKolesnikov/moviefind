import './SliderGrid.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Grid, Mousewheel } from "swiper/modules";
import { useSliderResponse } from "../../../states/useSliderResponse.ts";

export const SliderGrid = ({ sliderId, label }: { sliderId: number, label: string }) => {

    return (
        <div
            className="black-background-swiper__container"
        >
            <p>{label}</p>
            <Swiper
                slidesPerView={2}
                grid={{
                    rows: 5,
                }}
                freeMode={true}
                cssMode={true}
                mousewheel={true}
                modules={[Grid, FreeMode, Mousewheel]}
                className="mySwiper"
            >
                {useSliderResponse.getState().sliderResponse[sliderId].response.map((data) => (
                    <SwiperSlide
                        key={data.itemId}
                        className="mySlide"
                    >
                        <img src={data.posterUrl} alt={data.itemId.toString()}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

