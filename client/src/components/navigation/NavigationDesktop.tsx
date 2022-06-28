import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faPlusSquare, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {faDiscord, faGithub} from "@fortawesome/free-brands-svg-icons";
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
                fa: faPlusSquare,
                css: 'text-yellow-500',
            }
        },
        {
            name: 'About',
            location: '/about',
            icon: {
                fa: faQuestionCircle,
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
                    <div className="bg-black grid grid-cols-5">
                        {this.navOptions.map((row, key:number) => (
                            <Link key={key} to={row.location} className="hover:text-opacity-70 transition ease-in-out duration-300 py-3">
                                <div className={"text-center"}>
                                    <FontAwesomeIcon icon={row.icon.fa} className={`text-xl hover:opacity-70`} />
                                </div>
                            </Link>
                        ))}
                        {this.navExternal.map((row, key: number) => (
                            <a key={key} href={row.location} className="hover:text-opacity-70 transition ease-in-out duration-300 py-3">
                                <div className={"text-center"}>
                                    <FontAwesomeIcon icon={row.icon.fa} className={`text-xl hover:opacity-70`} />
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