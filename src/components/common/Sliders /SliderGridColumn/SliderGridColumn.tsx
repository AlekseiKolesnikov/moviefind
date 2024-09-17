import './SliderGridColumn.css'
import { useSliderResponse } from "../../../../states/useSliderResponse.ts";
import { CSSProperties } from "react";
import { useMoviePageResponse } from "../../../../states/useMoviePageResponse.ts";
import { useMovieTVShowsNavigation } from "../../../../states/useMovieTVShowsNavigation.ts";
import { useNavigate } from "react-router-dom";
import { MovieTvPageContent } from "../../../../interfaces /MoviePageResponseInterface.ts";

export const SliderGridColumn = ({ sliderId, columnSize, type }: {
    sliderId: number,
    columnSize: number[],
    type: string
}) => {
    const requestMoviePageContent = useMoviePageResponse((state) => state.getMoviePageContent)
    const setMoviePageContentCallback = useMoviePageResponse((state) => state.setMoviePageContent)
    const updateMovieTVShowsNavigation = useMovieTVShowsNavigation((state) => state.setMovieTVShowsRoutes)
    const navigate = useNavigate()

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
                                        className="grid-slider__movie-release-date-number">{data.releaseDate.date}</span>
                                    <span
                                        className="grid-slider__movie-release-date-month">{data.releaseDate.month}</span>
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

