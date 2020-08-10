import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/pro-duotone-svg-icons";
import {faCheck, faTimes} from "@fortawesome/pro-solid-svg-icons";

interface IProps {
    currentName: string | boolean;
    name: string;
    type: string;
    value: any;
    maps: any;
    champions: any;
    next?: boolean;
}

class Veto extends Component<IProps> {

    render() {

        const { currentName, name, value, next, maps, champions } = this.props;
        let { type } = this.props;
        let css = 'yellow';
        let icon = { icon: faCircleNotch, color: 'text-gray-300' };

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
                icon = { icon: faTimes, color: 'text-red-500' };
                break;
            case 'pick':
                css = 'green';
                icon = { icon: faCheck, color: 'text-green-500' };
                break;
            default:
                css = 'orange';
        }

        return !next ? (
            <div className={`border-2 border-${css}-800 bg-gray-800 p-3 text-white shadow-md mb-4`}>
                <FontAwesomeIcon icon={icon.icon} className={icon.color} /> <span className="font-semibold">{name}</span> has {types[1] == 'ban' ? 'banned' : 'picked'} <span className="font-semibold">{types[0] === 'map' ? maps[value] : champions[value]}</span>.
            </div>
        ) : (
            <div className={`border-2 border-${css}-800 bg-gray-800 p-3 text-white shadow-md mb-4`}>
                <FontAwesomeIcon icon={faCircleNotch} spin /> Waiting on <span className="font-semibold">{name}</span> to {types[1]} a {types[0]}.
                {name === currentName && (
                  <div>
                    Pick
                  </div>
                )}
            </div>
        )

    }
}

export default Veto;