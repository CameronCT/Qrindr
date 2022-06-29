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

        const { name, value, next, maps, mapsImage, championsImage } = this.props;
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
                <div className={`border-4 ${css} w-full ${types[0] === 'map' ? 'h-20' : 'h-24'} relative text-white shadow-md rounded-lg`} style={{
                    backgroundImage: `url('${types[0] === 'map' ? mapsImage[value] : championsImage[value]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#555',
                }}>
                    <div className={"absolute bg-black bg-opacity-90 rounded px-2 py-0.5 bottom-2 left-2 text-sm"}>
                        <span className="font-semibold">{name}</span>
                        {types[0] === 'map' && (
                            <span>
                                {types[1] === 'ban' ? ' banned ' : ' picked '}
                                <span className="font-semibold">{maps[value]}</span>
                            </span> 
                        )}
                    </div>
                </div>
            </div>
        ) : (
            <div>
                <div className={`border-4 ${css} w-full ${types[0] === 'map' ? 'h-20' : 'h-24'} relative text-white shadow-md rounded-lg bg-white bg-opacity-10`}>
                    <div className={"absolute bg-black bg-opacity-90 rounded px-2 py-0.5 bottom-2 left-2 text-sm"}>
                        {types[0] === 'map' ? (
                            <span>
                                <FontAwesomeIcon icon={faSpinner} className="mr-2" spin />
                                Waiting on <span className="font-semibold">{name}</span>
                                {types[1] === 'ban' ? ' ban ' : ' pick '} a map
                            </span> 
                        ) : (
                            <div>
                                <FontAwesomeIcon icon={faSpinner} className="absolute -top-9 -right-7 text-3xl" spin />
                                <span>
                                    {name}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )

    }
}

export default Veto;