import './ListOption.css'
import { useCategoryOption } from "../../../../states/categoryListOptionState.ts";

interface IOption {
    optionLabel: string
    optionIsSelected: boolean
}

export const ListOption = ({ optionLabel, optionIsSelected }: IOption) => {
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

