import './CategoryOptionData.css'
import { useCategoryOption } from "../../../../states/useCategoryOption.ts";

export const CategoryOptionData = () => {
    const categoryOptions = useCategoryOption((state) => state.categoryOptions)
    const selectedOptionIndex = categoryOptions.findIndex((option) => option.isSelected)

    return (
        <div className="app-category-option__container">
            {categoryOptions[selectedOptionIndex].label}
        </div>
    )
}

