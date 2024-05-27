import './AppDataSlider.css'
import '../../../assets/styles/flex-patterns.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Keyboard, Mousewheel, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/controller';
import { swiperSlideData } from "../../../data/movie-series-content-data.ts";

export const AppDataSlider = () => {

    return (
        <div
        >
            <h2></h2>
            <Swiper
                spaceBetween={5}
                breakpoints={{
                    450: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    }
                }}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                cssMode={true}
                navigation={true}
                mousewheel={true}
                keyboard={true}
                modules={[FreeMode, Navigation, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                {swiperSlideData.map((data) => (
                    <SwiperSlide
                        key={data.id}
                        className="mySlide"
                    >
                        {/*<img src={data.image} alt={data.image}/>*/}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

