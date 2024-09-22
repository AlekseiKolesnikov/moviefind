import { create } from "zustand";
import { useSliderSectionIntersectionObserver } from "./useSliderSectionIntersectionObserver.ts";
import axios from "axios";
import dayjs from "dayjs";
import {
    ApiResponse,
    Genre,
    GenresApiResponse,
    SliderResponse,
    SliderResponseBody
} from "../interfaces /slide-response-interface.ts";

const API_TOKEN = import.meta.env.VITE_API_KEY
const axiosHeader = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`
    },
}

const movieGenresUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en"
const seriesGenresUrl = "https://api.themoviedb.org/3/genre/tv/list?language=en"

interface UseSliderResponse {
    sliderResponse: SliderResponse[],
    slideGenres: Genre[],
    setSliderResponse: (response: SliderResponse) => void,
    getMoviesSlidersData: (
        elementId: number,
        sliderDataCallBack: (response: SliderResponse) => void,
        sliderExceptionCallBack: (error: Error) => void
    ) => void,
    getSlideGenres: () => void
}

const createDefaultResponse = (itemId: number) => ({
    itemId,
    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
    ranking: 0,
    movieLabel: '',
    genre: '',
    releaseYear: '',
    releaseDate: {
        month: 'Sep',
        date: '01'
    }
});

export const useSliderResponse = create<UseSliderResponse>((set) => ({
    sliderResponse: [
        {
            sliderId: 0,
            label: "Top Rated Movies",
            type: "movie",
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        },
        {
            sliderId: 1,
            label: "Top Rated Series",
            type: "tv",
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        },
        {
            sliderId: 2,
            label: "Now Paying Movies",
            type: "movie",
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        },
        {
            sliderId: 3,
            label: "Airing Today Series",
            type: "tv",
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        },
        {
            sliderId: 4,
            label: "Trending Series",
            type: "tv",
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        },
        {
            sliderId: 5,
            label: "Upcoming Movies",
            type: "movie",
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        }
    ],
    slideGenres: [],
    setSliderResponse: ((response) => set((state) => ({
        sliderResponse: state.sliderResponse
            .map((value) => value.sliderId === response.sliderId ?
                {
                    sliderId: response.sliderId,
                    label: response.label,
                    type: value.type,
                    response: response.response
                } :
                {
                    sliderId: value.sliderId,
                    label: value.label,
                    type: value.type,
                    response: value.response
                }
            )
    }))),
    getMoviesSlidersData: async (
        elementId,
        sliderDataCallBack,
        sliderExceptionCallBack
    ) => {
        const elementIndex = useSliderSectionIntersectionObserver.getState().sliderSection.findIndex((value) => value.id === elementId)
        const apiData = {
            url: useSliderSectionIntersectionObserver.getState().sliderSection[elementIndex].apiUrl,
            id: useSliderSectionIntersectionObserver.getState().sliderSection[elementIndex].id,
            label: useSliderSectionIntersectionObserver.getState().sliderSection[elementIndex].label,
            type: useSliderSectionIntersectionObserver.getState().sliderSection[elementIndex].type
        }

        axios.get<ApiResponse>(apiData.url, axiosHeader)
            .then((response) => {
                const sliderResponse: SliderResponseBody[] = response.data.results.map((value) => {
                    const releaseYear = value.release_date ? value.release_date.substring(0, 4) : value.first_air_date.substring(0, 4)

                    return {
                        itemId: value.id,
                        posterUrl: `https://image.tmdb.org/t/p/w500${value.poster_path}`,
                        ranking: value.vote_average,
                        movieLabel: value.title || value.name,
                        genre: getGenreName(value.genre_ids[0]),
                        releaseYear: releaseYear,
                        releaseDate: {
                            month: dayjs(value.release_date || value.first_air_date).format('MMM'),
                            date: dayjs(value.release_date || value.first_air_date).format('DD')
                        }
                    }
                })

                sliderDataCallBack({
                    sliderId: apiData.id,
                    label: apiData.label,
                    type: apiData.type,
                    response: sliderResponse
                })
            })
            .catch((error) => {
                console.log(error)
                sliderExceptionCallBack(error)
            });
    },
    getSlideGenres: async () => {
        const movieRequest = axios.get<GenresApiResponse>(movieGenresUrl, axiosHeader)
        const seriesRequest = axios.get<GenresApiResponse>(seriesGenresUrl, axiosHeader)

        axios.all([movieRequest, seriesRequest])
            .then(axios.spread((...responses) => {
                const newGenres = responses.flatMap(value => value.data.genres);
                set(state => ({ ...state, slideGenres: newGenres }))
            }))
            .catch(error => {
                console.log(error)
            })
    }
}))

const getGenreName = (genreId: number): string => {
    const id = genreId !== undefined ? genreId : 18
    const genreIndex = useSliderResponse.getState().slideGenres.findIndex(value => value.id === id)
    return useSliderResponse.getState().slideGenres[genreIndex].name
        ? useSliderResponse.getState().slideGenres[genreIndex].name
        : ''
}