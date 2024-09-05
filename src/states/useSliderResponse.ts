import { create } from "zustand";
import { useSliderSectionIntersectionObserver } from "./useSliderSectionIntersectionObserver.ts";
import axios from "axios";
import dayjs from "dayjs";

const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGRlZTQwNjJkZGM1NDI3NzI0ZTdjYmQ2YTg2ZTlhMSIsInN1YiI6IjY0YjE5ZTQ2MGU0ZmM4MDBhZDVkMTA4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HF8cHLdF2sd2k5dojJVT3B442V4P0kkeIP-ZvilyvHU";
const axiosHeader = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`
    },
}

const movieGenresUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en"
const seriesGenresUrl = "https://api.themoviedb.org/3/genre/tv/list?language=en"

interface Dates  {
    maximum: string;
    minimum: string;
}
interface MovieResponse {
    original_title: string;
    release_date: string;
    title: string;
    video: boolean;
}
interface SeriesResponse {
    origin_country: string[],
    original_name: string;
    first_air_date: string;
}
interface SliderApiResponse extends MovieResponse, SeriesResponse, PeopleResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}
interface ApiResponseMovie {
    dates: Dates;
}
interface ApiResponse extends ApiResponseMovie{
    page: number;
    results: SliderApiResponse[];
    total_pages: number;
    total_results: number;
}
interface SliderResponseBody  {
    itemId: number,
    posterUrl: string,
    ranking: number,
    movieLabel: string,
    genre: string,
    releaseYear: string,
    releaseDate: {
        month: string,
        date: string
    }
}
export interface SliderResponse  {
    sliderId: number,
    label: string,
    response: SliderResponseBody[]
}
export interface Genre  {
    id: number;
    name: string;
}
interface GenresApiResponse  {
    genres: Genre[];
}
interface UseSliderResponse  {
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
interface KnownFor {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    overview: string;
    poster_path: string;
    title?: string;
    name?: string;
    original_name?: string;
    original_title?: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    release_date?: string;
    first_air_date?: string;
    origin_country?: string[];
}
interface PeopleResult  {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    known_for: KnownFor[];
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
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        },
        {
            sliderId: 1,
            label: "Top Rated Series",
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        },
        {
            sliderId: 2,
            label: "Now Paying Movies",
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        },
        {
            sliderId: 3,
            label: "Airing Today Series",
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        },
        {
            sliderId: 4,
            label: "Trending Series",
            response: Array.from({ length: 6 }, (_, index) => createDefaultResponse(index))
        },
        {
            sliderId: 5,
            label: "Upcoming Movies",
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
                    response: response.response
                } :
                {
                    sliderId: value.sliderId,
                    label: value.label,
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
            label: useSliderSectionIntersectionObserver.getState().sliderSection[elementIndex].label
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

                sliderDataCallBack({ sliderId: apiData.id, label: apiData.label, response: sliderResponse })
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