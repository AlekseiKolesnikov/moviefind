import './AppNavbar.css'
import { ReactElement } from "react";
import '../../../assets/styles/flex-patterns.css'
import { useWindowSize } from "../../../states/windowSizeState.ts";
import { HomeIcon } from "../../../assets/icons/HomeIcon.tsx";
import { CameraIcon } from "../../../assets/icons/CameraIcon.tsx";
import { ChairIcon } from "../../../assets/icons/ChairIcon.tsx";
import { PeopleIcon } from "../../../assets/icons/PeopleIcon.tsx";

interface INavbarSvgIcons {
    icon: ReactElement,
    text: string
}

const navbarSvgIcons: INavbarSvgIcons[] = [
    {
        icon: <HomeIcon/>,
        text: "Main"
    },
    {
        icon: <CameraIcon/>,
        text: "Movies"
    },
    {
        icon: <ChairIcon/>,
        text: "TV Shows"
    },
    {
        icon: <PeopleIcon/>,
        text: "People"
    }
]

export const AppNavbar = () => {
    const navbarOptionClassName = !useWindowSize.getState().isDesktopScreen ?
        "navbar__option start-row-center-flex whiteBackground" :
        "navbar__option start-row-center-flex blackBackground"

    return (
        <div className="navbar__options-container space-between-column-start-flex">
            {navbarSvgIcons.map((iconData) => (
                <div
                    key={iconData.text}
                    className={navbarOptionClassName}
                >
                    <div className="navbar__option-icon center-flex">{iconData.icon}</div>
                    <p className="navbar__option-text">{iconData.text}</p>
                </div>
            ))}
        </div>
    )
}

