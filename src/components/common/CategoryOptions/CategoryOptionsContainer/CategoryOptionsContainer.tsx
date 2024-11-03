import './CategoryOptionsContainer.css'
import '../../../../assets/styles/flex-patterns.css'
import { CategoryOption } from "../CategoryOption/CategoryOption.tsx";
import { useCategoryOption } from "../../../../states/useCategoryOption.ts";

export const CategoryOptionsContainer = () => {
    const categoryOptionsData = useCategoryOption((state) => state.categoryOptions)

    return (
        <div className="category-options__container">
            <div className="category-options__label">
                <h1>Lists</h1>
            </div>
            <hr className="solid"/>
            <div className="start-row-center-flex category-options__list-container">
                {categoryOptionsData.map((option) => (
                        <CategoryOption
                            key={option.label}
                            optionLabel={option.label}
                            optionIsSelected={option.isSelected}
                        />
                    )
                )}
            </div>
        </div>
    )
}

