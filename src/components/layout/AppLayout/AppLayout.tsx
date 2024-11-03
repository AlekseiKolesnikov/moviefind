import './AppLayout.css'
import '../../../assets/styles/flex-patterns.css'
import { AppHeader } from "../AppHeader/AppHeader.tsx";
import { AppFooter } from "../AppFooter/AppFooter.tsx";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface LayoutProps {
    children: ReactNode;
}

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
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
            <main className="layout__content-main-container">
                {children}
            </main>
            <AppFooter/>
        </div>
    )
}

