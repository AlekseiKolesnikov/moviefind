import './MovieTVCategoriesContent.css'
import { CategoryOptionsContainer } from "../../CategoryOptions/CategoryOptionsContainer/CategoryOptionsContainer.tsx";
import { CategoryOptionData } from "../../CategoryOptions/CategoryOptionData/CategoryOptionData.tsx";

export const MovieTVCategoriesContent = () => {

    return (
        <div className="movie-series-page__container">
                <div className="list-option-pages">
                    <CategoryOptionsContainer/>
                    <CategoryOptionData/>
                </div>
        </div>
    )
}

