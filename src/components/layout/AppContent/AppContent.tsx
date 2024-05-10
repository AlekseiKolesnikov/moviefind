import './AppContent.css'
import { AppCategoryOptions } from "../../common/AppCategoryOptions/AppCategoryOptions.tsx";
import {
    CategoryOptionDataContainer
} from "../../features/CategoryOptionDataContainer/CategoryOptionDataContainer.tsx";

interface IAppContentProps {
    isFullScreenContent: boolean
}



export const AppContent = ({isFullScreenContent}: IAppContentProps) => {
    const windowPathName = window.location.pathname


    return (
        <div className={`content-container ${isFullScreenContent ? "notFullScreenWidth" : "fullScreenWidth"}`}>
            <div>
                {windowPathName != '/' && <AppCategoryOptions/>}
            </div>
            <CategoryOptionDataContainer/>
        </div>
    )
}

