import './SliderGridColumn.css'
import { useSliderResponse } from "../../../states/useSliderResponse.ts";
import dayjs from "dayjs";
import { CSSProperties } from "react";

export const SliderGridColumn = ({ sliderId, columnSize }: { sliderId: number, columnSize: number[] }) => {
    const moviePosterBottomBorderStyle: CSSProperties = {
        borderBottom: "solid var(--hoovered-light-gray-color) 1px",
    }

    return (
        <div className="grid-slider__movie-posters-column-container start-column-center-flex">
            {useSliderResponse.getState().sliderResponse[sliderId].response.map((data, index) => (
                (index >= columnSize[0] && index <= columnSize[1]) && (
                    <div
                        key={data.itemId}
                        className="grid-slider__movie-posters-container start-row-center-flex"
                    >
                        <div className="grid-slider__movie-ranking-number">{index + 1}.</div>
                        <div
                            className="grid-slider__movie-poster-inf-container start-row-center-flex"
                            style={index != columnSize[1] ? moviePosterBottomBorderStyle : undefined}
                        >
                            < img className="grid-slider__movie-poster" src={data.posterUrl}
                                  alt={data.itemId.toString()}/>
                            <div
                                className="grid-slider__movie-inf-container space-between-row-center-flex"
                            >
                                <p className="grid-slider__movie-label">{data.movieLabel}</p>
                                <div
                                    className="grid-slider__movie-release-date center-column-flex"
                                >
                                    <span
                                        className="grid-slider__movie-release-date-number">{dayjs(data.releaseDate).format('DD')}</span>
                                    <span
                                        className="grid-slider__movie-release-date-month">{dayjs(data.releaseDate).format('MMM')}</span>
                                </div>
                                <button className="grid-slider__movie-watch-list-button"></button>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}

