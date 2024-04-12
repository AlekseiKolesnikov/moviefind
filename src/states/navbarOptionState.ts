import { create } from "zustand";

type NavbarOption = {
    index: number,
    isSelected: boolean,
}

type NavbarOptionState = {
    navbarOptions: NavbarOption[],
    setNavbarOption: (index: number) => void
}

export const useNavbarOption = create<NavbarOptionState>((set) => ({
    navbarOptions: [
        {
            index: 0,
            isSelected: true
        },
        {
            index: 1,
            isSelected: false
        },
        {
            index: 2,
            isSelected: false
        },
        {
            index: 3,
            isSelected: false
        }
    ],
    setNavbarOption: (index) => set((state) => ({
        navbarOptions: state.navbarOptions.map((option) => {
            if (option.index === index) {
                option.isSelected = true;
                return { ...option };
            } else {
                option.isSelected = false;
                return { ...option };
            }
        })
    }))
}))