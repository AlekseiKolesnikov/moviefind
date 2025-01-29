import { create } from "zustand";

interface UseMovieTVShowsNavigation {
    movieTVShowsRoutes: MovieTVShowsRoutes,
    setMovieTVShowsRoutes: (type: string, id: string) => void
}

interface MovieTVShowsRoutes {
    type: string,
    pathName: string
}

export const useMovieTVShowsNavigation = create<UseMovieTVShowsNavigation>((set) => ({
    movieTVShowsRoutes: {
        type: '',
        pathName: ''
    },
    setMovieTVShowsRoutes: (type: string, id: string) => set((state) => {
        const newPathName = (type === 'movie') ? ('/movie/' + id) : ('/tv/' + id);
        return {
            movieTVShowsRoutes: {
                ...state.movieTVShowsRoutes,
                type: type,
                pathName: newPathName
            }
        }
    })
}))