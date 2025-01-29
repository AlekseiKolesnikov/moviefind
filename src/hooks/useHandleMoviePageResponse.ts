import { useMoviePageResponse } from "../states/useMoviePageResponse.ts";
import { useMovieTVShowsNavigation } from "../states/useMovieTVShowsNavigation.ts";
import { MovieTvPageContent } from "../interfaces /movie-page-response-interface.ts";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHandleMoviePageResponse = () => {
    const getMoviePageContent = useMoviePageResponse((state) => state.getMoviePageContent)
    const setMoviePageContentCallback = useMoviePageResponse((state) => state.setMoviePageContent)
    const updateMovieTVShowsNavigation = useMovieTVShowsNavigation((state) => state.setMovieTVShowsRoutes)
    const navigate = useNavigate()

    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 3;

    const handelMoviePageResponse: (type: string, id: number) => void = useCallback((type: string, id: number) => {
        if (retryCount >= MAX_RETRIES) {
            console.error('Max retries reached. Could not fetch data.');
            return;
        }

        getMoviePageContent(
            type,
            id,
            (response: MovieTvPageContent | undefined) => {
                if (response) {
                    setMoviePageContentCallback(id, response)
                    navigate(useMovieTVShowsNavigation.getState().movieTVShowsRoutes.pathName, {
                        state: {
                            id: id,
                            type: type
                        }
                    })
                } else {
                    setRetryCount((prevCount) => prevCount + 1);
                    setTimeout(() => handelMoviePageResponse(type, id), 2000);
                }
            }
        )

        updateMovieTVShowsNavigation(type, id.toString())
    }, [getMoviePageContent, navigate, retryCount, setMoviePageContentCallback, updateMovieTVShowsNavigation])

    return { handelMoviePageResponse }
}