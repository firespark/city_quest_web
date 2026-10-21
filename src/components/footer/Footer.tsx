
import { FooterDescription } from './FooterDescription'
import { FooterCities } from './FooterCities'
import { FooterMenu } from './FooterMenu'
import { FooterCopyright } from './FooterCopyright'

import { Socials } from '../common/Socials'

import footerStyle from '../../styles/footerStyle.module.css'

export const Footer = (_props: { active?: string }) => {
    return (
        <footer className={footerStyle.footerPanel}>
            <div className={footerStyle.footerInner}>

                <div className={footerStyle.footerColumns}>
                    <FooterDescription />
                    <FooterCities />
                    <FooterMenu />
                </div>

                <div className={footerStyle.footerBottom}>
                    <FooterCopyright />

                    <Socials
                        variant="footer"
                        className={footerStyle.socials}
                    />
                </div>

            </div>
        </footer>
    )
}
