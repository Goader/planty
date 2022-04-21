import React from "react";
import './Footer.css'

function Footer() {

    return (
        <footer className={"mainFooter set_bg"} style={{
            backgroundImage: `url(${require('../footerBackground.png')})`,
            width: `100%`,
            height: `562px`,
            backgroundRepeat: `no-repeat`
        }}>
            <div className={"aboutUs"}>
                <div className={"aboutUsButton"}>About us</div>
                <div className={"aboutUsButton"}>Not about us</div>
                <div className={"aboutUsButton"}>No-privacy policy</div>
            </div>
            <div className={"copyRight"}>
                Copyright © 2022<br/>
                Plants vs Developers
            </div>
        </footer>
    )
}

export default Footer;