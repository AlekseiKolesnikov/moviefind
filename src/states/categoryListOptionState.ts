import { create } from "zustand";

type CategoryOption = {
    label: string,
    isSelected: boolean
}

type CategoryOptionState = {
    categoryOptions: CategoryOption[],
    setCategoryOption: (label: string) => void
}

export const useCategoryOption = create<CategoryOptionState>((set) => ({
    categoryOptions: [
        {
            label: 'Genres',
            isSelected: true
        },
        {
            label: 'Years',
            isSelected: false
        },
        {
            label: 'Countries',
            isSelected: false
        },
        {
            label: 'Ranking',
            isSelected: false
        },
        {
            label: 'Ranking',
            isSelected: false
        },
        {
            label: 'Ranking',
            isSelected: false
        },
        {
            label: 'Ranking',
            isSelected: false
        }
    ],
    setCategoryOption: (label) => set((state) => {
        const categoryUpdatedOptions = state.categoryOptions.map((option) => {
            if (option.label === label) {
                option.isSelected = true;
                return { ...option };
            } else {
                option.isSelected = false;
                return { ...option };
            }
        })
        return { categoryOptions: categoryUpdatedOptions };
    })
}))
