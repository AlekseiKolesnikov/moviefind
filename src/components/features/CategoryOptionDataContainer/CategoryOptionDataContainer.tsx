import './CategoryOptionDataContainer.css'
import { useCategoryOption } from "../../../states/categoryListOptionState.ts";

export const CategoryOptionDataContainer = () => {
    const categoryOptions = useCategoryOption((state) => state.categoryOptions)
    const selectedOptionIndex = categoryOptions.findIndex((option) => option.isSelected)

    return (
        <div>
            {categoryOptions[selectedOptionIndex].label}
        </div>
    )
}

