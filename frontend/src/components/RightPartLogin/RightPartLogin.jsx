import React from 'react'
import Logo from '../../images/Logo.png';
import Illustration from '../../images/Illustration.png';
import "./RightPartLogin.css";

const RightPartLogin = () => {
    return (<>
        <div className="logoSection">
            <img src={Logo} alt="Logo" />
        </div>
        <div className="mainContainer">
            <div className="textContainer">
                <img src={Illustration} alt="Ilustration" />

                <h1 className="title">Welcome aboard my friend</h1>
                <p className="subTitle">just a couple of clicks and we start</p>
            </div>
        </div>
    </>
    )
}

export default RightPartLogin