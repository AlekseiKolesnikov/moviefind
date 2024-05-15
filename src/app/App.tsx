import '../assets/styles/App.css'
import { Route, Routes } from "react-router-dom";
import { MoviesPage } from "../pages/MoviesPage/MoviesPage.tsx";
import { TvShowsPage } from "../pages/TvShowsPage/TvShowsPage.tsx";
import { PeoplePage } from "../pages/PeoplePage/PeoplePage.tsx";
import { MainPage } from "../pages/MainPage/MainPage.tsx";
import { ReactElement } from "react";

interface IRoutes {
    path: string,
    element: ReactElement
}

const ROUTES: IRoutes[] = [
    {
        path: "/",
        element: <MainPage/>
    },
    {
        path: "/movies",
        element: <MoviesPage/>
    },
    {
        path: "/tv_shows",
        element: <TvShowsPage/>
    },
    {
        path: "/people",
        element: <PeoplePage/>
    }
]

function App() {

    return (
        <>
            <Routes>
                {ROUTES.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}
            </Routes>
        </>
    )
}

export default App
