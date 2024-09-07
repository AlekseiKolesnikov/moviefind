import './SocialMediaIcon.css'
import { Icons, useIcons } from "../../../states/useIcons.ts";
import { useEffect, useState } from "react";

export const SocialMediaIcon = ({ id }: { id: string }) => {
    const updateSocialMediaIcons = useIcons((state) => state.setSocialMediaIcons)
    const [isHovered, setIsHovered] = useState(false)
    const [socialMediaIcon, setSocialMediaIcon] = useState<Icons[]>(useIcons.getState().socialMediaIcons)


    useEffect(() => {
        setSocialMediaIcon(useIcons.getState().socialMediaIcons)
    }, [isHovered])

    return (
        <a
            className="social-media-logo"
            onMouseOver={() => {
                updateSocialMediaIcons(id)
                setIsHovered(!isHovered)
            }}
            onMouseOut={() => {
                updateSocialMediaIcons(id)
                setIsHovered(!isHovered)
            }}
        >
            <img
                className="social-media-logo__image"
                src={socialMediaIcon[useIcons.getState().getSocialMediaIcons(id)].current_icon}
                alt={socialMediaIcon[useIcons.getState().getSocialMediaIcons(id)].alt}
            />
        </a>
    )
}

