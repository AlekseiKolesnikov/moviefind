import { create } from "zustand";

type WindowSize = {
    isDesktopScreen: boolean,
    isTabletScreen: boolean,
    isMobileScreen: boolean
}

export const useWindowSize = create<WindowSize>(() => ({
    isDesktopScreen: window.innerWidth > 1300,
    isTabletScreen: window.innerWidth > 1000 && window.innerWidth < 1300,
    isMobileScreen: window.innerWidth < 450
}))