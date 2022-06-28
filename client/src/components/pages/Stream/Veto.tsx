import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

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

        const { name, value, next, mapsImage, championsImage } = this.props;
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
                css = 'border-red-800';
                break;
            case 'pick':
                css = 'border-green-800';
                break;
            default:
                css = 'border-orange-800';
        }

        return !next ? (
            <div>
                <div className={`border-2 ${css} w-full ${types[0] === 'map' ? 'h-36' : 'h-32'} relative text-white shadow-md mb-4 rounded-lg`} style={{
                    backgroundImage: `url('${types[0] === 'map' ? mapsImage[value] : championsImage[value]}')`,
                    backgroundSize: 'cover'
                }}>
                    <div className={"absolute bg-black bg-opacity-90 rounded px-2 py-0.5 bottom-2 left-2 text-sm"}>
                        {name}
                    </div>
                </div>
            </div>
        ) : (
            <div>
                <div className={`relative text-white shadow-md mb-4 rounded-xl`}>
                    <div className={`border-2 border-yellow-800 alt w-full h-auto text-center py-10 rounded-xl`}>
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