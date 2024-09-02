import { useEffect, useState } from "react";
import { useSideBar } from "../states/useSideBar.ts";
import { usePathName } from "../states/usePathName.ts";
import { useWindowSize } from "../states/useWindowSize.ts";

interface IUseHandelResize {
    isMobileSideBar: boolean,
    isSideBarWhite: boolean,
    screenWidth: number
}

export const useHandelResize = (): IUseHandelResize => {
    const updatePathNameState = usePathName((state) => state.setPathName)
    const updateSideBarState = useSideBar((state) => state.setSideBarState)
    const setWindowSize = useWindowSize((state) => state.setWindowSize);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isMobileSideBar, setMobileSideBar] = useState(useSideBar.getState().sideBarSlideOutSide)
    const [isSideBarVisible, setSideBarSate] = useState(useSideBar.getState().sideBarVisible)

    useEffect(() => {
        const handleResize = () => {
            updatePathNameState(location.pathname)
            setWindowSize(window.innerWidth);
            updateSideBarState(usePathName.getState().pathName)
            setScreenWidth(window.innerWidth)
            setSideBarSate(useSideBar.getState().sideBarVisible)
            setMobileSideBar(useSideBar.getState().sideBarSlideOutSide)
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