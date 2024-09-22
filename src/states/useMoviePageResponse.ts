import { create } from "zustand";
import { ApiContentPageResponse, MovieTvPageContent } from "../interfaces /movie-page-response-interface.ts";
import axios from "axios";
import { MOVIE_PAGE_CONTENT_KEY } from "../data/local-storage-keys.ts";

const API_TOKEN = import.meta.env.VITE_API_KEY
const axiosHeader = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`
    },
}
const BASE_MOVIE_API_URL = "https://api.themoviedb.org/3/"
const BASE_API_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

interface MoviePageResponseInterface {
    moviePageContent: MovieTvPageContent[],
    setMoviePageContent: (id: number | null, response: MovieTvPageContent | undefined) => void,
    getMoviePageContent: (
        type: string | undefined,
        id: number | null,
        pageContentResponseCallback: (response: MovieTvPageContent | undefined) => void
    ) => void
}

export const useMoviePageResponse = create<MoviePageResponseInterface>((set) => ({
    moviePageContent: [] as MovieTvPageContent[],
    setMoviePageContent: ((id, response) => set((state) => {
        if (state.moviePageContent.length !== 0) {
            if (state.moviePageContent[0].id !== id) {
                state.moviePageContent.shift()
                localStorage.removeItem(MOVIE_PAGE_CONTENT_KEY)
            }

        }

        const getLocalStorageMovieData = (): MovieTvPageContent[] => {
            const storedData = localStorage.getItem(MOVIE_PAGE_CONTENT_KEY)

            return storedData ? JSON.parse(storedData) : null
        }

        const moviePageResponse = response ? state.moviePageContent
            .filter((content) => content.id !== id)
            .concat(response) : getLocalStorageMovieData()

        if (response) {
            localStorage.setItem(MOVIE_PAGE_CONTENT_KEY, JSON.stringify(moviePageResponse))
        }

        return { moviePageContent: moviePageResponse }
    })),
    getMoviePageContent: async (type, id, pageContentResponseCallback) => {
        const contentType = type ? (type === 'movie' ? 'movie/' : 'tv/') : ''
        const itemId = id !== null ? id : 0

        axios.get<ApiContentPageResponse>(`${BASE_MOVIE_API_URL}${contentType}${itemId.toString()}?language=en-US`, axiosHeader)
            .then((result) => {
                const movieTvResponse = (): MovieTvPageContent | undefined => {
                    const response = result.data
                    const releaseYear = response.release_date ? response.release_date.substring(0, 4) : response.first_air_date.substring(0, 4)

                    try {
                        return {
                            id: response.id,
                            title: response.title || response.name,
                            release_date: response.release_date || response.first_air_date,
                            release_year: releaseYear,
                            adult: response.adult,
                            vote_average: response.vote_average,
                            vote_count: response.vote_count,
                            main_poster_path: `${BASE_API_IMAGE_URL}${response.poster_path}` || null,
                            backdrop_poster_path: `${BASE_API_IMAGE_URL}${response.backdrop_path}` || null,
                            imdb_id: response.imdb_id || '-',
                            production_companies: response.production_companies,
                            production_countries: response.production_countries,
                            genres: response.genres,
                            overview: response.overview,
                            runtime: response.runtime,
                            spoken_language: response.spoken_languages
                        }
                    } catch (error) {
                        console.log("Data didn't pass through")
                    }
                }

                pageContentResponseCallback(movieTvResponse())
            })
    }
}))