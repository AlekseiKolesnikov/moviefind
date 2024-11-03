import { create } from "zustand";
import { useWindowSize } from "./useWindowSize.ts";
import { usePathName } from "./usePathName.ts";

type UseSideBar = {
    sideBarVisible: boolean,
    sideBarPopOutTop: boolean,
    sideBarSlideOutSide: boolean,
    setSideBarState: (pathName: string) => void
}

export const useSideBar = create<UseSideBar>((set) => ({
    sideBarVisible: useWindowSize.getState().isDesktopScreen && usePathName.getState().pathName === "/",
    sideBarPopOutTop: (useWindowSize.getState().isDesktopScreen && usePathName.getState().pathName !== "/") || useWindowSize.getState().isTabletScreen,
    sideBarSlideOutSide: useWindowSize.getState().isMobileScreen,
    setSideBarState: (pathName) => set(() => ({
        sideBarVisible: (useWindowSize.getState().isDesktopScreen && pathName === "/"),
        sideBarPopOutTop: (useWindowSize.getState().isDesktopScreen && pathName !== "/") || useWindowSize.getState().isTabletScreen,
        sideBarSlideOutSide: useWindowSize.getState().isMobileScreen
    }))
}))

