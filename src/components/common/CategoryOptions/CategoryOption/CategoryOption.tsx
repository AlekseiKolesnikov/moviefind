import './CategoryOption.css'
import { useCategoryOption } from "../../../../states/useCategoryOption.ts";

interface IOption {
    optionLabel: string
    optionIsSelected: boolean
}

export const CategoryOption = ({ optionLabel, optionIsSelected }: IOption) => {
    const updateCategoryOption = useCategoryOption((state) => state.setCategoryOption)

    return (
        <div
            onClick={() => {
                updateCategoryOption(optionLabel)
            }}
            className={`category-options__option center-flex ${optionIsSelected ? 'category-option-selected' : ''}`}
        >
            <p>{optionLabel}</p>
        </div>
    )
}

