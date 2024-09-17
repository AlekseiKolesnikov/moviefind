import './MovieTVShowPageContent.css'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MOVIE_PAGE_CONTENT_KEY } from "../../../../data/local-storage-keys.ts";
import { MovieTvPageContent } from "../../../../interfaces /MoviePageResponseInterface.ts";

export const MovieTVShowPageContent = () => {
    const location = useLocation()
    const { id, type } = location.state
    const [movieTvPageData, setMovieTvPageData] = useState((): MovieTvPageContent => {
        const storedData = localStorage.getItem(MOVIE_PAGE_CONTENT_KEY);
        return storedData ? JSON.parse(storedData)[0] : null;
    })

    useEffect(() => {
        const itemId = id ? parseInt(id) : null

        if (movieTvPageData && itemId === movieTvPageData.id) {
            const storedData = localStorage.getItem(MOVIE_PAGE_CONTENT_KEY);

            if (storedData && JSON.parse(storedData).length === 0) {
                setMovieTvPageData(JSON.parse(storedData)[0]);
            }
        }
    }, [id, movieTvPageData, type])

    return (
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
}

