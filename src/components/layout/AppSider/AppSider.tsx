import './AppSider.css'
import '../../../assets/styles/flex-patterns.css'
import { AppNavbar } from "../AppNavbar/AppNavbar.tsx";

export const AppSider = () => {

    return (
        <div className="sider start-center-flex">
            <AppNavbar/>
        </div>
    )
}

