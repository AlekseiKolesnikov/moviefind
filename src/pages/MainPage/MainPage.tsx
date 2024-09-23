import './MainPage.css'
import { AppLayout } from "../../components/layout/AppLayout/AppLayout.tsx";
import { AppSider } from "../../components/layout/AppSider/AppSider.tsx";
import { MainPageContent } from "../../components/common/Content/MainPageContent/MainPageContent.tsx";
import { useHandelResize } from "../../hooks/useHandelResize.ts";

export const MainPage = () => {
    const handleResizeStates = useHandelResize()

    return (
        <AppLayout>
            <div className="layout__content-sider-container center-row-flex">
                {handleResizeStates.isSideBarWhite && <AppSider/>}
                <MainPageContent/>
            </div>
        </AppLayout>
    )
}

