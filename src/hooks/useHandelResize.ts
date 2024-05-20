import { useEffect, useState } from "react";
import { useSideBarState } from "../states/sideBarState.ts";
import { usePathNameState } from "../states/pathNameState.ts";
import { useWindowSize } from "../states/windowSizeState.ts";
import { useLocation } from "react-router-dom";

interface IUseHandelResize {
    isMobileSideBar: boolean,
    isSideBarWhite: boolean,
    isResized: number,
    pathName: string
}

export const useHandelResize = (): IUseHandelResize => {
    const location = useLocation()
    const updatePathNameState = usePathNameState((state) => state.setPathName)
    const updateSideBarState = useSideBarState((state) => state.setSideBarState)
    const setWindowSize = useWindowSize((state) => state.setWindowSize);
    const [pathName, setPathName] = useState(usePathNameState.getState().pathName)
    const [isResized, setResized] = useState(window.innerWidth)
    const [isMobileSideBar, setMobileSideBar] = useState(useSideBarState.getState().sideBarSlideOutSide)
    const [isSideBarWhite, setSideBarWhite] = useState(useSideBarState.getState().sideBarVisible)

    useEffect(() => {
        const handleResize = () => {
            updatePathNameState(location.pathname)
            setWindowSize(window.innerWidth);
            updateSideBarState(usePathNameState.getState().pathName)
            setResized(window.innerWidth)
            setSideBarWhite(useSideBarState.getState().sideBarVisible)
            setMobileSideBar(useSideBarState.getState().sideBarSlideOutSide)
        }
        handleResize();
        setPathName(usePathNameState.getState().pathName)
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [location.pathname, setWindowSize, updatePathNameState, updateSideBarState])

    return {
        isMobileSideBar: isMobileSideBar,
        isSideBarWhite: isSideBarWhite,
        isResized: isResized,
        pathName: pathName
    }
}