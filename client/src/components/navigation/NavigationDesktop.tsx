import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGamepad, faHome, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {faDiscord, faGithub} from "@fortawesome/free-brands-svg-icons";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class NavigationDesktop extends Component {

    navOptions = [
        {
            name: 'Home',
            location: '/',
            icon: {
                fa: faHome,
                css: 'text-green-500',
            }
        },
        {
            name: 'Create',
            location: '/create',
            icon: {
                fa: faGamepad,
                css: 'text-yellow-500',
            }
        },
        {
            name: 'About',
            location: '/about',
            icon: {
                fa: faInfoCircle,
                css: 'text-blue-300',
            }
        }
    ];

    navExternal = [
        {
            name: 'Discord',
            location: 'https://discord.gg/BAEkm58',
            icon: {
                fa: faDiscord,
                css: 'text-indigo-400',
            }
        },
        {
            name: 'GitHub',
            location: 'https://github.com/CameronCT/Qrindr',
            external: true,
            icon: {
                fa: faGithub,
                css: 'text-gray-200',
            }
        },
        {
            name: 'Donate',
            location: 'https://streamlabs.com/gnikgg',
            icon: {
                fa: faDollarSign,
                css: 'text-orange-400',
            }
        },
    ];

    render() {
        return (
            <div>
                <div className={"hidden lg:block"}>
                    <div className="flex flex-wrap px-5" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                        <div className="w-24 mr-auto py-2">
                            <Link to={"/"} className="text-2xl text-white font-bold">
                                Q<span className={"hidden lg:inline"}>rindr</span>
                            </Link>
                        </div>
                        {this.navOptions.map((row, key:number) => (
                            <Link key={key} to={row.location} className="animation-short w-auto px-5 py-4 flex justify-center font-semibold text-sm text-white hover:text-red-400 uppercase hover:bg-black hover:bg-opacity-25">
                                {row.name}
                            </Link>
                        ))}
                        {this.navExternal.map((row, key: number) => (
                            <a key={key} href={row.location} className="animation-short w-auto px-5 py-4 flex justify-center font-semibold text-sm text-white hover:text-red-400 uppercase hover:bg-black hover:bg-opacity-25">
                                {row.name}
                            </a>
                        ))}
                    </div>
                </div>
                <div className={"z-50 fixed bottom-0 w-full lg:hidden"}>
                    <div className="flex flex-wrap bg-gray-900 border-t border-gray-800">
                        {this.navOptions.map((row, key:number) => (
                            <Link key={key} to={row.location} className="animation-short w-1/6 py-2 text-xs uppercase hover:bg-black hover:bg-opacity-25">
                                <div className={"text-center"}>
                                    <FontAwesomeIcon icon={row.icon.fa} className={`text-xl ${row.icon.css}`} />
                                    <div className={"text-white font-semibold"}>
                                        {row.name}
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {this.navExternal.map((row, key: number) => (
                            <a key={key} href={row.location} className="animation-short w-1/6 py-2 text-xs uppercase hover:bg-black hover:bg-opacity-25">
                                <div className={"text-center"}>
                                    <FontAwesomeIcon icon={row.icon.fa} className={`text-xl ${row.icon.css}`} />
                                    <div className={"text-white font-semibold"}>
                                        {row.name}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        )
    }

}

export default NavigationDesktop;