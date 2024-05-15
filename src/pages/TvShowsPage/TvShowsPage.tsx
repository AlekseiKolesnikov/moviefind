import './TvShowsPage.css'
import { AppLayout } from "../../components/layout/AppLayout/AppLayout.tsx";
import { useLocation } from "react-router-dom";
import { usePathNameState } from "../../states/pathNameState.ts";
import { useEffect } from "react";

export const TvShowsPage = () => {
    const location = useLocation()
    const { setPathName } = usePathNameState()

    useEffect(() => {
        setPathName(location.pathname)
    }, [location.pathname, setPathName])

    return (
        <>
            <AppLayout isSiderLayout={false}/>
        </>
    )
}

