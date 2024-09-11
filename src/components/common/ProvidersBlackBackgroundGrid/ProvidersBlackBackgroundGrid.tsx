import './ProvidersBlackBackgroundGrid.css'
import '../../../assets/styles/flex-patterns.css';
import { Icons, useIcons } from "../../../states/useIcons.ts";
import { useEffect, useState } from "react";

export const ProvidersBlackBackgroundGrid = () => {
    const updateProvidersIcons = useIcons((state) => state.setProvidersIcons)
    const [isHovered, setIsHovered] = useState(false)
    const [providerIcon, setProviderIcon] = useState<Icons[]>(useIcons.getState().providersIcons)

    useEffect(() => {
        setProviderIcon(useIcons.getState().providersIcons)
    }, [isHovered])

    return (
        <div className="providers-grid__wrapper start-column-top-flex">
            <p className="providers-grid__label">Watch MovieFind on TV</p>
            <div className="providers-grid__grid-container">
                <div
                    className="providers-grid__tv providers-grid__common-class"
                    onMouseOver={() => {
                        updateProvidersIcons('tv')
                        setIsHovered(!isHovered)
                    }}
                    onMouseOut={() => {
                        updateProvidersIcons('tv')
                        setIsHovered(!isHovered)
                    }}
                >
                    <div className="start-column-top-flex">
                        <h2>A regular TV</h2>
                        <p>
                            <span>Additional module </span>will transform your TV in Smart TV
                        </p>
                    </div>
                    <img
                        className="providers-grid__tv-console"
                        src={providerIcon[0].current_icon}
                        alt={providerIcon[0].alt}
                    />
                </div>

                <div
                    className="providers-grid__samsung providers-grid__common-class"
                    onMouseOver={() => {
                        updateProvidersIcons('samsung')
                        setIsHovered(!isHovered)
                    }}
                    onMouseOut={() => {
                        updateProvidersIcons('samsung')
                        setIsHovered(!isHovered)
                    }}
                >
                    <img
                        className="providers-grid__samsung-logo"
                        src={providerIcon[1].current_icon}
                        alt={providerIcon[1].alt}
                    />
                    <p>2013 y. and newer</p>
                </div>

                <div
                    className="providers-grid__android providers-grid__common-class"
                    onMouseOver={() => {
                        updateProvidersIcons('android')
                        setIsHovered(!isHovered)
                    }}
                    onMouseOut={() => {
                        updateProvidersIcons('android')
                        setIsHovered(!isHovered)
                    }}
                >
                    <img
                        className="providers-grid__android-logo"
                        src={providerIcon[3].current_icon}
                        alt={providerIcon[3].alt}
                    />
                    <img
                        className="providers-grid__android-remote"
                        src={providerIcon[2].current_icon}
                        alt={providerIcon[2].alt}
                    />
                    <p>Televisions and consoles</p>
                </div>

                <div
                    className="providers-grid__apple providers-grid__common-class"
                    onMouseOver={() => {
                        updateProvidersIcons('apple')
                        setIsHovered(!isHovered)
                    }}
                    onMouseOut={() => {
                        updateProvidersIcons('apple')
                        setIsHovered(!isHovered)
                    }}
                >
                    <img
                        className="providers-grid__apple-logo"
                        src={providerIcon[5].current_icon}
                        alt={providerIcon[5].alt}
                    />
                    <img
                        className="providers-grid__apple-tv"
                        src={providerIcon[4].current_icon}
                        alt={providerIcon[4].alt}
                    />

                </div>

                <div
                    className="providers-grid__lg providers-grid__common-class"
                    onMouseOver={() => {
                        updateProvidersIcons('lg')
                        setIsHovered(!isHovered)
                    }}
                    onMouseOut={() => {
                        updateProvidersIcons('lg')
                        setIsHovered(!isHovered)
                    }}
                >
                    <img
                        className="providers-grid__lg-logo"
                        src={providerIcon[6].current_icon}
                        alt={providerIcon[6].alt}
                    />
                    <p>2014 y. and newer</p>
                </div>

                <div
                    className="providers-grid__mi providers-grid__common-class"
                    onMouseOver={() => {
                        updateProvidersIcons('mi')
                        setIsHovered(!isHovered)
                    }}
                    onMouseOut={() => {
                        updateProvidersIcons('mi')
                        setIsHovered(!isHovered)
                    }}
                >
                    <img
                        className="providers-grid__mi-logo"
                        src={providerIcon[7].current_icon}
                        alt={providerIcon[7].alt}
                    />
                    <img
                        className="providers-grid__mi-remote"
                        src={providerIcon[8].current_icon}
                        alt={providerIcon[8].alt}
                    />
                </div>

                <div
                    className="providers-grid__sony providers-grid__common-class"
                    onMouseOver={() => {
                        updateProvidersIcons('sony')
                        setIsHovered(!isHovered)
                    }}
                    onMouseOut={() => {
                        updateProvidersIcons('sony')
                        setIsHovered(!isHovered)
                    }}
                >
                    <img
                        className="providers-grid__sony-logo"
                        src={providerIcon[9].current_icon}
                        alt={providerIcon[9].alt}
                    />
                    <img
                        className="providers-grid__sony-remote"
                        src={providerIcon[10].current_icon}
                        alt={providerIcon[10].alt}
                    />
                </div>
            </div>
        </div>
    )
}
