import { create } from "zustand";
import { ApiContentPageResponse } from "../interfaces /MoviePageResponseInterface.ts";
import axios from "axios";

const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGRlZTQwNjJkZGM1NDI3NzI0ZTdjYmQ2YTg2ZTlhMSIsIm5iZiI6MTcyNTIyNjU4MS4xNTQ3NTUsInN1YiI6IjY0YjE5ZTQ2MGU0ZmM4MDBhZDVkMTA4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.trEXym5ftq5vCjNXU63PAobmGngKZ_xDB1nKyYqs-NE";
const axiosHeader = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`
    },
}
const BASE_MOVIE_API_URL = "https://api.themoviedb.org/3/"

interface MoviePageResponseInterface {
    moviePageContent: ApiContentPageResponse[]
    getMoviePageContent: (
        type: string,
        id: number
    ) => void
}

export const useMoviePageResponse = create<MoviePageResponseInterface>((set) => ({
    moviePageContent: [] as ApiContentPageResponse[],
    getMoviePageContent: (type, id) => {
        const contentType = type === 'movie' ? 'movie/' : 'tv/'

        axios.get<ApiContentPageResponse>(`${BASE_MOVIE_API_URL}${contentType}${id}?language=en-US`, axiosHeader)
            .then((response) => {
                try {
                    set((state) => ({
                        moviePageContent: [...state.moviePageContent, response.data]
                    }))
                    console.log(response.data);
                } catch (error) {
                    console.log("Data didn't pass through")
                }
            })
    }
}))