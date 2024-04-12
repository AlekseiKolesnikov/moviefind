import './AppNavbar.css'
import { ReactElement, useEffect } from "react";
import '../../../assets/styles/flex-patterns.css'
import { useWindowSize } from "../../../states/windowSizeState.ts";
import { HomeIcon } from "../../../assets/icons/HomeIcon.tsx";
import { CameraIcon } from "../../../assets/icons/CameraIcon.tsx";
import { ChairIcon } from "../../../assets/icons/ChairIcon.tsx";
import { PeopleIcon } from "../../../assets/icons/PeopleIcon.tsx";
import { Link } from "react-router-dom";
import { useNavbarOption } from "../../../states/navbarOptionState.ts";

interface INavbarSvgIcons {
    icon: ReactElement,
    text: string,
    pageRoute: string
}

const navbarSvgIcons: INavbarSvgIcons[] = [
    {
        icon: <HomeIcon/>,
        text: "Main",
        pageRoute: "/"
    },
    {
        icon: <CameraIcon/>,
        text: "Movies",
        pageRoute: "/movies"
    },
    {
        icon: <ChairIcon/>,
        text: "TV Shows",
        pageRoute: "/tv_shows"
    },
    {
        icon: <PeopleIcon/>,
        text: "People",
        pageRoute: "/people"
    }
]

export const AppNavbar = () => {
    const navbarOptionClassName = useWindowSize.getState().isDesktopScreen ?
        "blackBackground" : "whiteBackground"
    const updateNavbarOptionState = useNavbarOption((state) => state.setNavbarOption)
    const getNavbarOptionState = useNavbarOption((state) => state.navbarOptions)

    useEffect(() => {
        const windowPathName = window.location.pathname
        const navbarOptionIndex = navbarSvgIcons.findIndex((icon) => icon.pageRoute === windowPathName)
        updateNavbarOptionState(navbarOptionIndex)
    }, [])

    return (
        <nav className="navbar__options-container space-between-column-start-flex">
            {navbarSvgIcons.map((iconData, index) => (
                <Link
                    key={iconData.text}
                    onClick={() => {
                        updateNavbarOptionState(index)
                    }}
                    className={navbarOptionClassName +
                        ` navbar__option start-row-center-flex ${getNavbarOptionState[index].isSelected ?
                            useWindowSize.getState().isDesktopScreen ?
                                "selected_black" : "selected_white" : ""}`}
                    to={iconData.pageRoute}>
                    <div
                        className={`navbar__option-icon center-flex 
                            ${getNavbarOptionState[index].isSelected ? "selected_border_outline" : ""}`}
                    >{iconData.icon}</div>
                    <p className="navbar__option-text">{iconData.text}</p>
                </Link>
            ))}
        </nav>
    )
}

