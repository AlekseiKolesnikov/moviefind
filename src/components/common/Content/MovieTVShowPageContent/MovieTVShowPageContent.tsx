import './MovieTVShowPageContent.css'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMoviePageResponse } from "../../../../states/useMoviePageResponse.ts";

export const MovieTVShowPageContent = () => {
    const location = useLocation()
    const { id, type } = location.state
    const setMoviePageContentCallback = useMoviePageResponse((state) => state.setMoviePageContent)
    const [movieTvPageData, setMovieTvPageData] = useState(useMoviePageResponse.getState().moviePageContent[0])

    useEffect(() => {
        const itemId = id ? parseInt(id) : null

        if (movieTvPageData === undefined) {
            setMoviePageContentCallback(itemId, movieTvPageData)
            setMovieTvPageData(useMoviePageResponse.getState().moviePageContent[0])
        }
    }, [id, movieTvPageData, setMoviePageContentCallback, type])

    return (
        movieTvPageData && (
            <div className="movie-tv-page space-between-row-center-flex">
                <div className="movie-tv-page__posters-container">
                    <div className="movie-tv-page__main-poster">
                        <img src={movieTvPageData.main_poster_path?.toString()} alt={movieTvPageData.title}/>
                    </div>
                    <div className="movie-tv-page__backdrop-poster">
                        <img src={movieTvPageData.backdrop_poster_path?.toString()} alt={movieTvPageData.title}/>
                    </div>
                </div>
                <div className="movie-tv-page__information-container">
                    <div className="movie-tv-page__primary-inf">
                        <div className="movie-tv-page__title-inf">
                            <div className="movie-tv-page__title">
                                <p><span></span></p>
                            </div>
                            <button className="movie-tv-page__watchlist-button"></button>
                        </div>
                        <div className="movie-tv-page__ranking-inf">
                            <div className="movie-tv-page__ranking">
                                <div className="movie-tv-page__vote-average"></div>
                                <div className="movie-tv-page__vote-count"></div>
                            </div>
                            <button className="movie-tv-page__add-rating"></button>
                        </div>
                    </div>
                    <div className="movie-tv-page__about-inf">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    )
}

