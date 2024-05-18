import './AppNavbar.css'
import { ReactElement, useEffect, useState } from "react";
import '../../../assets/styles/flex-patterns.css'
import { HomeIcon } from "../../../assets/icons/HomeIcon.tsx";
import { CameraIcon } from "../../../assets/icons/CameraIcon.tsx";
import { ChairIcon } from "../../../assets/icons/ChairIcon.tsx";
import { PeopleIcon } from "../../../assets/icons/PeopleIcon.tsx";
import { Link } from "react-router-dom";
import { useNavbarOption } from "../../../states/navbarOptionState.ts";
import { useSideBarState } from "../../../states/sideBarState.ts";
import { usePathNameState } from "../../../states/pathNameState.ts";
import classNames from "classnames";

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

const blackBackground = classNames(' blackBackground')
const whiteBackground = classNames(' whiteBackground')
const navbarOptionClassName = classNames(' navbar__option')
const startRowCenterFlexClassName = classNames(' start-row-center-flex')
const selectedBlackClassName = classNames(' selected_black')
const selectedWhiteClassName = classNames(' selected_white')

export const AppNavbar = () => {
    const [isSideBarWhite, setSideBarWhite] = useState(useSideBarState.getState().sideBarVisible)
    const updateSideBarState = useSideBarState((state) => state.setSideBarState)
    const updateNavbarOptionState = useNavbarOption((state) => state.setNavbarOption)
    const getNavbarOptionState = useNavbarOption((state) => state.navbarOptions)
    const windowPathName = window.location.pathname
    const fontColorClassNames =  isSideBarWhite ? blackBackground : whiteBackground

    useEffect(() => {
        const navbarOptionIndex = navbarSvgIcons.findIndex((icon) => icon.pagePathName === windowPathName);
        const selectedPathName = navbarSvgIcons[navbarOptionIndex]?.pagePathName;
        updateNavbarOptionState(selectedPathName);
    }, [updateNavbarOptionState, windowPathName])

    useEffect(() => {
        const handleResize = () => {
            updateSideBarState(usePathNameState.getState().pathName)
            setSideBarWhite(useSideBarState.getState().sideBarVisible)
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isSideBarWhite, updateSideBarState]);

    return (
        <nav className="navbar__options-container space-between-column-start-flex">
            {navbarSvgIcons.map((navbarOption) => {
                const isSelected = getNavbarOptionState[getNavbarOptionState.findIndex((option) => option.pathName === navbarOption.pagePathName)].isSelected;

                return (
                    <Link
                        key={navbarOption.text}
                        onClick={() => {
                            updateNavbarOptionState(navbarOption.pagePathName)
                        }}
                        className={navbarOptionClassName + fontColorClassNames + startRowCenterFlexClassName + ` ${isSelected ? isSideBarWhite ? selectedBlackClassName : selectedWhiteClassName : ""}`}
                        to={navbarOption.pagePathName}>
                        <div
                            className={`navbar__option-icon center-flex 
                            ${isSelected ? "selected_border_outline" : ""}`}
                        >{navbarOption.icon}</div>
                        <p className="navbar__option-text">{navbarOption.text}</p>
                    </Link>
                )
            })}
        </nav>
    )
}

