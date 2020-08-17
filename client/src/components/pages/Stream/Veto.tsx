import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IProps {
    currentName: string | boolean;
    hash: string;
    secret: string;
    name: string;
    type: string;
    value: any;
    maps: any;
    mapsImage: any;
    champions: any;
    championsImage: any;
    next?: boolean;
    getMatch: any;
}

class Veto extends Component<IProps> {

    state = {
        stepValue: 9999,
        timer: 15,
        hide: false,
    }

    componentDidMount() { }

    render() {

        const { currentName, name, value, next, maps, champions, mapsImage, championsImage } = this.props;
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
            <div className={`p-3 text-white shadow-md mb-4`}>
                <img className={`border-4 border-${css}-800`} src={mapsImage[value]} />
                <div className={"absolute text-white text-center"} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    {name}
                </div>
            </div>
        ) : (
            <div>
                <div className={`border-2 border-yellow-800 bg-gray-800 p-3 text-white shadow-md mb-4`}>
                    Waiting on <span className="font-semibold">{name}</span> to {types[1]} a {types[0]}.
                </div>
            </div>
        )

    }
}

export default Veto;