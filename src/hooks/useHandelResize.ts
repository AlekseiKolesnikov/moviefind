import { useEffect, useState } from "react";
import { useSideBarState } from "../states/sideBarState.ts";
import { usePathNameState } from "../states/pathNameState.ts";
import { useWindowSize } from "../states/windowSizeState.ts";

interface IUseHandelResize {
    isMobileSideBar: boolean,
    isSideBarWhite: boolean,
    screenWidth: number
}

export const useHandelResize = (): IUseHandelResize => {
    const updatePathNameState = usePathNameState((state) => state.setPathName)
    const updateSideBarState = useSideBarState((state) => state.setSideBarState)
    const setWindowSize = useWindowSize((state) => state.setWindowSize);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isMobileSideBar, setMobileSideBar] = useState(useSideBarState.getState().sideBarSlideOutSide)
    const [isSideBarVisible, setSideBarSate] = useState(useSideBarState.getState().sideBarVisible)

    useEffect(() => {
        const handleResize = () => {
            updatePathNameState(location.pathname)
            setWindowSize(window.innerWidth);
            updateSideBarState(usePathNameState.getState().pathName)
            setScreenWidth(window.innerWidth)
            setSideBarSate(useSideBarState.getState().sideBarVisible)
            setMobileSideBar(useSideBarState.getState().sideBarSlideOutSide)
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setWindowSize, updatePathNameState, updateSideBarState])

    return {
        isMobileSideBar: isMobileSideBar,
        isSideBarWhite: isSideBarVisible,
        screenWidth: screenWidth
    }
}