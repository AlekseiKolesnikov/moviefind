import { create } from "zustand";
import { useSliderSectionIntersectionObserver } from "./useSliderSectionIntersectionObserver.ts";
import axios from "axios";

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
type Dates = {
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

interface SliderApiResponse extends MovieResponse, SeriesResponse {
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

type ApiResponse = {
    dates: Dates;
    page: number;
    results: SliderApiResponse[];
    total_pages: number;
    total_results: number;
}
type SliderResponseBody = {
    itemId: number,
    posterUrl: string,
    ranking: number,
    movieLabel: string,
    genre: string,
    releaseYear: string
}
export type SliderResponse = {
    sliderId: number,
    label: string,
    response: SliderResponseBody[]
}
export type Genre = {
    id: number;
    name: string;
}
type GenresApiResponse = {
    genres: Genre[];
}
type UseSliderResponse = {
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

export const useSliderResponse = create<UseSliderResponse>((set) => ({
    sliderResponse: [
        {
            sliderId: 0,
            label: "Top Rated Movies",
            response: [
                {
                    itemId: 0,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 1,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 2,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 3,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 4,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 5,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                }
            ]
        }, {
            sliderId: 1,
            label: "Top Rated Series",
            response: [
                {
                    itemId: 0,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 1,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 2,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 3,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 4,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 5,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                }
            ]
        },
        {
            sliderId: 2,
            label: "Now Paying Movies",
            response: [
                {
                    itemId: 0,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 1,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 2,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 3,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 4,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 5,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                }
            ]
        },
        {
            sliderId: 3,
            label: "Airing Today Series",
            response: [
                {
                    itemId: 0,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 1,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 2,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 3,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 4,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 5,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                }
            ]
        },
        {
            sliderId: 4,
            label: "Trending Series",
            response: [
                {
                    itemId: 0,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 1,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 2,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 3,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 4,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 5,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                }
            ]
        },
        {
            sliderId: 5,
            label: "Trending Movies",
            response: [
                {
                    itemId: 0,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 1,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 2,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 3,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 4,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                },
                {
                    itemId: 5,
                    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png",
                    ranking: 0,
                    movieLabel: '',
                    genre: '',
                    releaseYear: ''

                }
            ]
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
                        movieLabel: value.original_title || value.original_name,
                        genre: getGenreName(value.genre_ids[0]),
                        releaseYear: releaseYear
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