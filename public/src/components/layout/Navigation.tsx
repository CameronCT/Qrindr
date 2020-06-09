import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div className="border-t-4 border-gray-800 text-gray-100 py-4">
                <div className="max-w-screen-lg container mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-1/5 text-4xl my-auto font-bold">
                            Qrindr
                        </div>
                        <div className="w-4/5 text-right my-auto">
                            <Link className="text-gray-300 font-semibold uppercase pl-3" to="/">Home</Link>
                            <Link className="text-gray-300 font-semibold uppercase pl-3" to="/about">About</Link>
                            <a href="https://discord.gg/BAEkm58" className="text-gray-300 font-semibold uppercase pl-3">Discord</a>
                            <a href="https://github.com/CameronCT/Qrindr" className="text-gray-300 font-semibold uppercase pl-3">GitHub</a>
                            <a href="https://streamlabs.com/gnikgg" className="text-gray-300 font-semibold uppercase pl-3">Donate</a>
                            <span className="border-r border-gray-500 px-2"></span>
                            <a href="#home" className="text-gray-300 font-semibold uppercase pl-3">Settings</a>
                            <a href="http://localhost:8000/auth/discord" className="text-blue-100 font-semibold bg-blue-700 hover:bg-blue-800 hover:text-blue-200 uppercase py-2 px-4 rounded-full ml-3">Login with Discord</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navigation;