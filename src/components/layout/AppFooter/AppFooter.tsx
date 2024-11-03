import './AppFooter.css'
import { footerSocialMediaIcons, footerStoreIcons } from "../../../data/footer-icons.ts";
import { FooterIcons } from "../../common/FooterIcons /FooterIcons .tsx";

export const AppFooter = () => {

    return (
        <footer className="footer">
            <div className="footer__container center-column-flex">
                <div className="footer__social-media center-row-flex">
                    {footerSocialMediaIcons.map((icon) => (
                        <FooterIcons iconSrc={icon.src} iconAlt={icon.alt} key={icon.alt + 1}/>
                    ))}
                </div>
                <ul className="footer__support-links">
                    <li className="footer__support-link">Vacancies</li>
                    <li className="footer__support-link">Advertisement</li>
                    <li className="footer__support-link">Reference</li>
                    <li className="footer__support-link">Agreement</li>
                    <li className="footer__support-link">Rules of recommendations</li>
                    <li className="footer__support-link">Blog</li>
                    <li className="footer__support-link">Suggestions</li>
                    <li className="footer__support-link">All movies</li>
                    <li className="footer__support-link">All series</li>
                    <li className="footer__support-link">Promotions and subscriptions</li>
                    <li className="footer__support-link">Support Service</li>
                </ul>
                <div className="footer__stores center-row-flex">
                    {footerStoreIcons.map((icon) => (
                        <FooterIcons iconSrc={icon.src} iconAlt={icon.alt} key={icon.alt + 1}/>
                    ))}
                </div>
                <div className="footer__copy-rights space-between-row-center-flex">
                    <span className="footer__project-release-date">
                        ©&nbsp;2024, MovieFind
                    </span>
                    <span className="footer__project-founder">
                        Made by <span className="footer__project-founder-name">Aleksei Kolesnikov</span>
                    </span>
                </div>
            </div>
        </footer>
    )
}

