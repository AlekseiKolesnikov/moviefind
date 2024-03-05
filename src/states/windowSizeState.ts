import { create } from "zustand";

type WindowSize = {
    isDesktopScreen: boolean,
    isMobileScreen: boolean
}

export const useWindowSize = create<WindowSize>(() => ({
    isDesktopScreen: window.innerWidth > 1300,
    isMobileScreen: window.innerWidth < 450
}))