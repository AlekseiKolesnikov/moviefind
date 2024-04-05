import './AppLayout.css'
import '../../../assets/styles/flex-patterns.css'
import { AppHeader } from "../AppHeader/AppHeader.tsx";
import { AppSider } from "../AppSider/AppSider.tsx";
import { AppContent } from "../AppContent/AppContent.tsx";
import { AppFooter } from "../AppFooter/AppFooter.tsx";

export const AppLayout = () => {

    return (
        <div className="layout-wrapper center-column-top-flex">
            <AppHeader/>
            <div className="layout-content-sider-container center-row-flex">
                <AppSider/>
                <AppContent/>
            </div>
            <AppFooter/>
        </div>
    )
}

