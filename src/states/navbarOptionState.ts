import { create } from "zustand";

type NavbarOption = {
    pathName: string,
    isSelected: boolean,
}

type NavbarOptionState = {
    navbarOptions: NavbarOption[],
    setNavbarOption: (pathName: string) => void
}

export const useNavbarOption = create<NavbarOptionState>((set) => ({
    navbarOptions: [
        {
            pathName: "/",
            isSelected: false
        },
        {
            pathName: "/movies",
            isSelected: false
        },
        {
            pathName: "/tv_shows",
            isSelected: false
        },
        {
            pathName: "/people",
            isSelected: false
        }
    ],
    setNavbarOption: (pathName) => set((state) => ({
        navbarOptions: state.navbarOptions.map((option) => {
            if (option.pathName === pathName) {
                option.isSelected = true;
                return { ...option };
            } else {
                option.isSelected = false;
                return { ...option };
            }
        })
    }))
}))