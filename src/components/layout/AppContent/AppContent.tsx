import './AppContent.css'
import '../../../assets/styles/flex-patterns.css'
import { ListOptionsContainer } from "../../features/ListOptionFeature/ListOptionsContainer/ListOptionsContainer.tsx";
import { AppCategoryOption } from "../../common/AppCategoryOption/AppCategoryOption.tsx";
import { VideoTrailerFeature } from "../../features/VideoTrailerFeature/VideoTrailerFeature.tsx";
import { useHandelResize } from "../../../hooks/useHandelResize.ts";

export const AppContent = () => {
    const windowPathName = window.location.pathname
    const handleResizeStates = useHandelResize()

    return (
        <div
            className={`content-container ${handleResizeStates.isSideBarWhite ? "notFullScreenWidth" : "fullScreenWidth"}`}>
            <div className="content-container__content center-flex">
                {windowPathName !== '/' &&
                    <div className="list-option-pages">
                        <ListOptionsContainer/>
                        <AppCategoryOption/>
                    </div>
                }
                {(windowPathName === '/' && window.innerWidth > 900) &&
                    <VideoTrailerFeature/>
                }
            </div>
        </div>
    )
}

