import './AppContent.css'
import { ListOptionsContainer } from "../../features/ListOptionFeature/ListOptionsContainer/ListOptionsContainer.tsx";
import { AppCategoryOption } from "../../common/AppCategoryOption/AppCategoryOption.tsx";
import { useSideBarState } from "../../../states/sideBarState.ts";

export const AppContent = () => {
    const windowPathName = window.location.pathname

    return (
        <div
            className={`content-container ${useSideBarState.getState().sideBarVisible ? "notFullScreenWidth" : "fullScreenWidth"}`}>
            <div>
                {windowPathName !== '/' &&
                    <>
                        <ListOptionsContainer/>
                        <AppCategoryOption/>
                    </>
                }
            </div>
        </div>
    )
}

