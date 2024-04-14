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
    pagePathName: string
}

const navbarSvgIcons: INavbarSvgIcons[] = [
    {
        icon: <HomeIcon/>,
        text: "Main",
        pagePathName: "/"
    },
    {
        icon: <CameraIcon/>,
        text: "Movies",
        pagePathName: "/movies"
    },
    {
        icon: <ChairIcon/>,
        text: "TV Shows",
        pagePathName: "/tv_shows"
    },
    {
        icon: <PeopleIcon/>,
        text: "People",
        pagePathName: "/people"
    }
]

export const AppNavbar = () => {
    const navbarOptionClassName = useWindowSize.getState().isDesktopScreen ?
        "blackBackground" : "whiteBackground"
    const updateNavbarOptionState = useNavbarOption((state) => state.setNavbarOption)
    const getNavbarOptionState = useNavbarOption((state) => state.navbarOptions)
    const windowPathName = window.location.pathname

    useEffect(() => {
        const navbarOptionIndex = navbarSvgIcons.findIndex((icon) => icon.pagePathName === windowPathName);
        const selectedPathName = navbarSvgIcons[navbarOptionIndex]?.pagePathName;
        updateNavbarOptionState(selectedPathName);
    }, [updateNavbarOptionState, windowPathName])

    return (
        <nav className="navbar__options-container space-between-column-start-flex">
            {navbarSvgIcons.map((navbarOption) => (
                <Link
                    key={navbarOption.text}
                    onClick={() => {
                        updateNavbarOptionState(navbarOption.pagePathName)
                    }}
                    className={navbarOptionClassName +
                        ` navbar__option start-row-center-flex 
                        ${getNavbarOptionState[getNavbarOptionState.findIndex((option) => option.pathName === navbarOption.pagePathName)].isSelected ?
                            useWindowSize.getState().isDesktopScreen ?
                                "selected_black" : "selected_white" : ""}`}
                    to={navbarOption.pagePathName}>
                    <div
                        className={`navbar__option-icon center-flex 
                            ${getNavbarOptionState[getNavbarOptionState.findIndex((option) => option.pathName === navbarOption.pagePathName)].isSelected ? 
                            "selected_border_outline" : ""}`}
                    >{navbarOption.icon}</div>
                    <p className="navbar__option-text">{navbarOption.text}</p>
                </Link>
            ))}
        </nav>
    )
}

