import './MainPage.css'
import { AppLayout } from "../../components/layout/AppLayout/AppLayout.tsx";
import { useEffect } from "react";
import { usePathNameState } from "../../states/pathNameState.ts";
import { useLocation } from "react-router-dom";

export const MainPage = () => {
    const location = useLocation()
    const { setPathName } = usePathNameState()

    useEffect(() => {
        setPathName(location.pathname)
    }, [location.pathname, setPathName])

    return (
        <>
            <AppLayout isSiderLayout={true}/>
        </>
    )
}

