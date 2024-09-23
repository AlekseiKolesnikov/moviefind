import './TvShowCategoriesPage.css'
import { AppLayout } from "../../components/layout/AppLayout/AppLayout.tsx";
import {
    MovieTVCategoriesContent
} from "../../components/common/Content/MovieTVCategoriesContent/MovieTVCategoriesContent.tsx";

export const TvShowCategoriesPage = () => {

    return (
        <AppLayout>
            <MovieTVCategoriesContent/>
        </AppLayout>
    )
}

