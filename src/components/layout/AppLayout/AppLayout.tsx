import './AppLayout.css'
import '../../../assets/styles/flex-patterns.css'
import { AppHeader } from "../AppHeader/AppHeader.tsx";
import { AppSider } from "../AppSider/AppSider.tsx";
import { AppContent } from "../AppContent/AppContent.tsx";
import { AppFooter } from "../AppFooter/AppFooter.tsx";
import { useHandelResize } from "../../../hooks/useHandelResize.ts";
import { useEffect, useRef, useState } from "react";

export const AppLayout = () => {
    const handleResizeStates = useHandelResize()
    const elementRef = useRef<HTMLDivElement>(null)
    const [contentElementHeight, setContentElementHeight] = useState(0)

    useEffect(() => {
        if (elementRef.current) {
            setContentElementHeight(elementRef.current.offsetHeight)
        }
    }, [contentElementHeight])

    return (
        <div className="layout__wrapper center-column-top-flex">
            <header className="layout__header-container center-column-top-flex">
                <AppHeader/>
            </header>
            <main className="layout__content-sider-container center-row-flex">
                {handleResizeStates.isSideBarWhite && <AppSider/>}
                <AppContent/>
            </main>
            <AppFooter/>
        </div>
    )
}

