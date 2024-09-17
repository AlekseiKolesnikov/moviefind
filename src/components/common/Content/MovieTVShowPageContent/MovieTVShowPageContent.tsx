import './MovieTVShowPageContent.css'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMoviePageResponse } from "../../../../states/useMoviePageResponse.ts";

export const MovieTVShowPageContent = () => {
    const { id } = useParams()
    const [movieTvPageData, setMovieTvPageData] = useState(useMoviePageResponse.getState().moviePageContent[0])

    useEffect(() => {
        console.log(id)
        if (id === useMoviePageResponse.getState().moviePageContent[0].id.toString()) {
            setMovieTvPageData(useMoviePageResponse.getState().moviePageContent[0])
        }
        console.log(movieTvPageData);
    }, [id, movieTvPageData])

    return (
        <div className="movie-tv-page">
            <div className="movie-tv-page__posters-container">
                <div className="movie-tv-page__main-poster">
                    <img src={movieTvPageData.main_poster_path?.toString()} alt={movieTvPageData.title}/>
                </div>
                <div className="movie-tv-page__backdrop-poster">
                    <img src="" alt=""/>
                </div>
            </div>
            <div className="movie-tv-page__information-container">
                <div className="movie-tv-page__primary-inf">
                    <div></div>
                    <div></div>
                </div>
                <div className="movie-tv-page__about-inf">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

