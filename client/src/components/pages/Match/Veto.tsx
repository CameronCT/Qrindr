import React, { Component } from 'react';

interface IProps {
    name: string;
    type: string;
    value: string;
    next?: boolean;
}

class Veto extends Component<IProps> {

    render() {

        const { name, type, value, next } = this.props;
        const types = type.split('_');

        let css = 'yellow';

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

        return next ? (
            <div className={`border border-${css}-800 p-3 text-white`}>
                <span className="font-semibold">{name}</span> has {types[1]}ed {value}.
            </div>
        ) : (
            <div className={`border border-${css}-800 p-3 text-white`}>
                Waiting on <span className="font-semibold">{name}</span> to {types[1]} a {types[0]}.
            </div>
        )

    }
}

export default Veto;