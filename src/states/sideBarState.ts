import { create } from "zustand";
import { useWindowSize } from "./windowSizeState.ts";
import { usePathNameState } from "./pathNameState.ts";

type SideBarState = {
    sideBarVisible: boolean,
    sideBarPopOutTop: boolean,
    sideBarSlideOutSide: boolean,
    setSideBarState: (pathName: string) => void
}

export const useSideBarState = create<SideBarState>((set) => ({
    sideBarVisible: useWindowSize.getState().isDesktopScreen && usePathNameState.getState().pathName === "/",
    sideBarPopOutTop: (useWindowSize.getState().isDesktopScreen && usePathNameState.getState().pathName !== "/") || useWindowSize.getState().isTabletScreen,
    sideBarSlideOutSide: useWindowSize.getState().isMobileScreen,
    setSideBarState: (pathName) => set(() => ({
        sideBarVisible: (useWindowSize.getState().isDesktopScreen && pathName === "/"),
        sideBarPopOutTop: (useWindowSize.getState().isDesktopScreen && pathName !== "/") || useWindowSize.getState().isTabletScreen,
        sideBarSlideOutSide: useWindowSize.getState().isMobileScreen
    }))
}))

