import '../assets/styles/App.css'
import { Route, Routes } from "react-router-dom";
import { MovieCategoriesPage } from "../pages/MovieCategoriesPage/MovieCategoriesPage.tsx";
import { TvShowCategoriesPage } from "../pages/TvShowCategoriesPage/TvShowCategoriesPage.tsx";
import { PeopleCategoriesPage } from "../pages/PeopleCategoriesPage/PeopleCategoriesPage.tsx";
import { MainPage } from "../pages/MainPage/MainPage.tsx";
import { MovieTVShowPage } from "../pages/MovieTVShowPage/MovieTVShowPage.tsx";

export const MAIN_PAGE = "/"
export const MOVIE_CATEGORIES_PAGE = "/movies"
export const TV_SHOW_CATEGORIES_PAGE = "/tv_shows"
export const PEOPLE_CATEGORIES_PAGE = "/people"
export const MOVIE_PAGE = '/movie/:id'
export const TV_PAGE = '/tv/:id'


function App() {

    return (
        <>
            <Routes>
                <Route path={MAIN_PAGE} element={<MainPage/>}/>
                <Route path={MOVIE_CATEGORIES_PAGE} element={<MovieCategoriesPage/>}/>
                <Route path={TV_SHOW_CATEGORIES_PAGE} element={<TvShowCategoriesPage/>}/>
                <Route path={PEOPLE_CATEGORIES_PAGE} element={<PeopleCategoriesPage/>}/>
                <Route path={MOVIE_PAGE} element={<MovieTVShowPage/>}/>
                <Route path={TV_PAGE} element={<MovieTVShowPage/>}/>
            </Routes>
        </>
    )
}

export default App
