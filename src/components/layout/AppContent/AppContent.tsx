import './AppContent.css'
import { Route, Routes } from "react-router-dom";
import { MAIN_PAGE, MOVIES_PAGE, PEOPLE_PAGE, TV_SHOWS_PAGE } from "../../../data/app-routes.ts";
import { MainPage } from "../../../pages/MainPage/MainPage.tsx";
import { MoviesPage } from "../../../pages/MoviesPage/MoviesPage.tsx";
import { TvShowsPage } from "../../../pages/TvShowsPage/TvShowsPage.tsx";
import { PeoplePage } from "../../../pages/PeoplePage/PeoplePage.tsx";

export const AppContent = () => {

    return (
        <div className="content-container">
            <Routes>
                <Route path={MAIN_PAGE} element={<MainPage/>}/>
                <Route path={MOVIES_PAGE} element={<MoviesPage/>}/>
                <Route path={TV_SHOWS_PAGE} element={<TvShowsPage/>}/>
                <Route path={PEOPLE_PAGE} element={<PeoplePage/>}/>
            </Routes>
        </div>
    )
}

