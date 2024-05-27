export interface ISwiperSlideData {
    label: string,
    apiUrl: string,
    id: number
}

export const swiperSlideData: ISwiperSlideData[] = [
    {
        label: "Now Paying",
        apiUrl: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}",
        id: 0
    },
    {
        label: "Airing Today",
        apiUrl: "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte={max_date}&air_date.gte={min_date}",
        id: 1
    },
    {
        label: "Top Rated Movies",
        apiUrl: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200",
        id: 2
    },
    {
        label: "Top Rated Series",
        apiUrl: "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200",
        id: 3
    },
    {
        label: "Popular Movies",
        apiUrl: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        id: 4
    },
    {
        label: "Popular Series",
        apiUrl: "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc",
        id: 5
    },
    {
        label: "Upcoming Movies",
        apiUrl: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}",
        id: 6
    },
    {
        label: "On the Air Series",
        apiUrl: "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte={max_date}&air_date.gte={min_date}",
        id: 7
    },
    {
        label: "Popular People",
        apiUrl: "https://api.themoviedb.org/3/person/popular?language=en-US&page=1",
        id: 8
    },
]
