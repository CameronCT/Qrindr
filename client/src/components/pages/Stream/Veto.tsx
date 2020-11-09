import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-duotone-svg-icons";

interface IProps {
    currentName: string | boolean;
    hash: string;
    secret: string;
    name: string;
    type: string;
    value: any;
    maps: any;
    mapsAvailable: any;
    mapsImage: any;
    champions: any;
    championsImage: any;
    championsAvailable: any;
    next?: boolean;
    getMatch: any;
}

class Veto extends Component<IProps> {

    state = {
        stepValue: 9999,
        timer: 15,
        hide: false,
    }

    render() {

        const { name, value, next, maps, champions, mapsImage, championsImage } = this.props;
        let { type } = this.props;
        let css;
        if (!type)
            type = 'map_pick';

        let types = type.split('_');

        if (!types)
            types = ['map', 'ban'];

        if (!types[0])
            types[0] = 'map';

        if (!types[1])
            types[1] = 'ban';

        switch (types[1]) {
            case 'ban':
                css = 'red';
                break;
            case 'pick':
                css = 'green';
                break;
            default:
                css = 'orange';
        }

        return !next ? (
            <div>
                {types[0] === 'map'
                    ? (
                        <div className={`relative text-white shadow-md mb-4`}>
                            <img className={`border-2 border-${css}-800 w-full h-auto`} src={mapsImage[value]} alt={maps[value]} />
                            <div className={"absolute text-white bg-black bg-opacity-75 p-px text-shadow text-center bottom-0 w-full text-base"}>
                                {name}
                            </div>
                        </div>
                    ) : (
                        <div className={`relative text-white shadow-md mb-4`}>
                            <img className={`border-2 border-${css}-800 w-full h-auto`} src={championsImage[value]} alt={champions[value]} />
                            <div className={"absolute text-white bg-black bg-opacity-75 p-px text-shadow text-center bottom-0 w-full text-base"}>
                                {name}
                            </div>
                        </div>
                    )
                }
            </div>
        ) : (
            <div>
                <div className={`relative text-white shadow-md mb-4`}>
                    <div className={`border-2 border-yellow-800 bg-gray-800 w-full h-auto text-center py-10`}>
                        <FontAwesomeIcon icon={faSpinner} className="mb-4" spin />
                    </div>
                    <div className={"absolute text-white bg-black bg-opacity-75 p-px text-shadow text-center bottom-0 w-full text-base"}>
                        {name}
                    </div>
                </div>
            </div>
        )

    }
}

export default Veto;