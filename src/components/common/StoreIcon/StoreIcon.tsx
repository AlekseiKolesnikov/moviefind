import './StoreIcon.css'
import { Icons, useIcons } from "../../../states/useIcons.ts";
import { useEffect, useState } from "react";

export const StoreIcon = ({ id }: { id: string }) => {
    const updateStoreIcons = useIcons((state) => state.setStoreIcons)
    const [isHovered, setIsHovered] = useState(false)
    const [storeIcon, setStoreIcon] = useState<Icons[]>(useIcons.getState().storeIcons)

    useEffect(() => {
        setStoreIcon(useIcons.getState().storeIcons)
    }, [isHovered])

    return (
        <a
            className="store"
            onMouseOver={() => {
                updateStoreIcons(id)
                setIsHovered(!isHovered)
            }}
            onMouseOut={() => {
                updateStoreIcons(id)
                setIsHovered(!isHovered)
            }}
        >
            <img
                className="store__image"
                src={storeIcon[useIcons.getState().getStoreIcons(id)].current_icon}
                alt={storeIcon[useIcons.getState().getStoreIcons(id)].alt}
            />
        </a>
    )
}

