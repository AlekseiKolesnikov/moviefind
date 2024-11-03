import './FooterIcons .css'

export const FooterIcons = ({ iconSrc, iconAlt }: { iconSrc: string, iconAlt: string }) => {

    return (
        <a className="footer-logo">
            <img
                className="footer-logo__image"
                src={iconSrc}
                alt={iconAlt}
            />
        </a>
    )
}

