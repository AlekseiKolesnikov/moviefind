import './AppLayout.css'
import '../../../assets/styles/flex-patterns.css'
import { AppHeader } from "../AppHeader/AppHeader.tsx";
import { AppSider } from "../AppSider/AppSider.tsx";
import { AppContent } from "../AppContent/AppContent.tsx";
import { AppFooter } from "../AppFooter/AppFooter.tsx";
import { useSideBarState } from "../../../states/sideBarState.ts";
import { useLocation } from "react-router-dom";
import { usePathNameState } from "../../../states/pathNameState.ts";
import { useEffect } from "react";

export const AppLayout = () => {
    const location = useLocation()
    const { setPathName } = usePathNameState()

    useEffect(() => {
        setPathName(location.pathname)
    }, [location.pathname, setPathName])

    return (
        <div className="layout-wrapper center-column-top-flex">
            <AppHeader/>
            <div className="layout-content-sider-container center-row-flex">
                {useSideBarState.getState().sideBarVisible && <AppSider/>}
                <AppContent/>
            </div>
            <AppFooter/>
        </div>
    )
}

