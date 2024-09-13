import '../assets/styles/App.css'
import { Route, Routes } from "react-router-dom";
import { MovieCategoriesPage } from "../pages/MovieCategoriesPage/MovieCategoriesPage.tsx";
import { TvShowCategoriesPage } from "../pages/TvShowCategoriesPage/TvShowCategoriesPage.tsx";
import { PeopleCategoriesPage } from "../pages/PeopleCategoriesPage/PeopleCategoriesPage.tsx";
import { MainPage } from "../pages/MainPage/MainPage.tsx";

export const MAIN_PAGE = "/"
export const MOVIES_PAGE = "/movies"
export const TV_SHOWS_PAGE = "/tv_shows"
export const PEOPLE_PAGE = "/people"

function App() {

    return (
        <>
            <Routes>
                <Route path={MAIN_PAGE} element={<MainPage/>}/>
                <Route path={MOVIES_PAGE} element={<MovieCategoriesPage/>}/>
                <Route path={TV_SHOWS_PAGE} element={<TvShowCategoriesPage/>}/>
                <Route path={PEOPLE_PAGE} element={<PeopleCategoriesPage/>}/>
            </Routes>
        </>
    )
}

export default App
