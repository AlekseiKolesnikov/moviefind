import './MovieTVShowPage.css'
import { AppLayout } from "../../components/layout/AppLayout/AppLayout.tsx";
import {
    MovieTVShowPageContent
} from "../../components/common/Content/MovieTVShowPageContent/MovieTVShowPageContent.tsx";

export const MovieTVShowPage = () => {

    return (
        <AppLayout>
            <MovieTVShowPageContent/>
        </AppLayout>
    )
}

