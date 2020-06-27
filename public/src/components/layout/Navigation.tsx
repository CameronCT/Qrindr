import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div className="w-24 bg-gray-800">
                <a key={"main"} href="/">
                    <div className="nav-link">
                        <i className="fad fa-home"/>
                        <div>Home</div>
                    </div>
                </a>

                <a key={"about"} href="/about">
                    <div className="nav-link">
                        <i className="fad fa-info-circle"/>
                        <div>About</div>
                    </div>
                </a>

                <a key={"discord"} href="https://discord.gg/gvrmT9j">
                    <div className="nav-link">
                        <i className="fab fa-discord"/>
                        <div>Discord</div>
                    </div>
                </a>

                <a key={"github"} href="https://github.com/CameronCT">
                    <div className="nav-link">
                        <i className="fab fa-github"/>
                        <div>GitHub</div>
                    </div>
                </a>

                <a key={"donate"} href="https://streamlabs.com/gnikgg/donate">
                    <div className="nav-link">
                        <i className="fad fa-donate"/>
                        <div>Donate</div>
                    </div>
                </a>

            </div>
        )
    }
}

export default Navigation;