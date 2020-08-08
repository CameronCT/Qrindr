import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHandHoldingUsd, faHome, faInfoCircle} from "@fortawesome/pro-solid-svg-icons";
import {faDiscord, faGithub, faTwitch} from "@fortawesome/free-brands-svg-icons";
import {faDollarSign} from "@fortawesome/pro-duotone-svg-icons";

class NavigationDesktop extends Component {

    navOptions = [
        {
            name: 'Home',
            icon: {
                fa: faHome,
                css: 'text-red-400',
            }
        },
        {
            name: 'About',
            icon: {
                fa: faInfoCircle,
                css: 'text-teal-400',
            }
        },
        {
            name: 'Watch',
            icon: {
                fa: faTwitch,
                css: 'text-purple-500',
            }
        },
        {
            name: 'Betting',
            icon: {
                fa: faHandHoldingUsd,
                css: 'text-yellow-400',
            }
        },
        {
            name: 'Discord',
            icon: {
                fa: faDiscord,
                css: 'text-indigo-300',
            }
        },
        {
            name: 'GitHub',
            icon: {
                fa: faGithub,
                css: 'text-gray-200',
            }
        },
        {
            name: 'Donate',
            icon: {
                fa: faDollarSign,
                css: 'text-green-400',
            }
        },
    ];

    render() {
        return (
            <div className="w-12 lg:w-2/12 border-r border-gray-800" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                <div className="text-center lg:p-6">
                    <div className="text-sm lg:text-3xl text-white font-bold">Qrindr</div>
                </div>
                {this.navOptions.map((row) => (
                    <a href="#" className="flex py-3 hover:bg-gray-900">
                        <div className="w-full lg:w-3/12 text-center my-auto">
                            <FontAwesomeIcon icon={row.icon.fa} className={` ${row.icon.css}`} />
                        </div>
                        <div className="hidden lg:block lg:w-9/12">
                            <div className={"font-semibold tracking-wide text-gray-100"}>
                                {row.name}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        )
    }

}

export default NavigationDesktop;