import './ListOptionsContainer.css'
import '../../../../assets/styles/flex-patterns.css'
import { ListOption } from "../ListOption/ListOption.tsx";
import { useCategoryOption } from "../../../../states/categoryListOptionState.ts";

export const ListOptionsContainer = () => {
    const categoryOptionsData = useCategoryOption((state) => state.categoryOptions)

    return (
        <div className="category-options__container">
            <div className="category-options__label">
                <h1>Lists</h1>
            </div>
            <hr className="solid"/>
            <div className="start-row-center-flex category-options__list-container">
                {categoryOptionsData.map((option) => (
                        <ListOption
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

