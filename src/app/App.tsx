import '../assets/styles/App.css'
import { Route, Routes } from "react-router-dom";
import { MoviesPage } from "../pages/MoviesPage/MoviesPage.tsx";
import { TvShowsPage } from "../pages/TvShowsPage/TvShowsPage.tsx";
import { PeoplePage } from "../pages/PeoplePage/PeoplePage.tsx";
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
                <Route path={MOVIES_PAGE} element={<MoviesPage/>}/>
                <Route path={TV_SHOWS_PAGE} element={<TvShowsPage/>}/>
                <Route path={PEOPLE_PAGE} element={<PeoplePage/>}/>
            </Routes>
        </>
    )
}

export default App
