import './AppCategoryOption.css'
import { useCategoryOption } from "../../../states/categoryListOptionState.ts";

export const AppCategoryOption = () => {
    const categoryOptions = useCategoryOption((state) => state.categoryOptions)
    const selectedOptionIndex = categoryOptions.findIndex((option) => option.isSelected)

    return (
        <div className="app-category-option__container">
            {categoryOptions[selectedOptionIndex].label}
        </div>
    )
}

