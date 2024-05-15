import { create } from "zustand";

type WindowSize = {
    isDesktopScreen: boolean,
    isTabletScreen: boolean,
    isMobileScreen: boolean,
    setWindowSize: (currentWindowWidth: number) => void
}

export const useWindowSize = create<WindowSize>((set) => ({
    isDesktopScreen: window.innerWidth > 1300,
    isTabletScreen: window.innerWidth > 1000 && window.innerWidth < 1300,
    isMobileScreen: window.innerWidth < 450,
    setWindowSize: (currentWindowWidth) => set(() => ({
        isDesktopScreen: currentWindowWidth > 1300,
        isTabletScreen: currentWindowWidth > 1000 && window.innerWidth < 1300,
        isMobileScreen: currentWindowWidth < 450
    }))
}))

