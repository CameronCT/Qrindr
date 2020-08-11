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
    mapsAvailable: any;
    champions: any;
    championsAvailable: any;
    next?: boolean;
}

class Veto extends Component<IProps> {

    state = {
        stepValue: 0,
        timer: 15,
    }

    componentDidMount() {
        const countdownPick = setInterval(() => {
            if (this.state.timer <= 0)
                clearInterval(countdownPick);

            this.setState({ timer: (this.state.timer - 1) });
        }, 1000);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(formName: string, event: any) {
        this.setState({ stepValue: event.target.value });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        console.log(this.state);
    }

    render() {

        const { timer } = this.state;
        const { currentName, name, value, next, maps, champions, mapsAvailable, championsAvailable } = this.props;
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
            <div>
                <div className={`border-2 border-${css}-800 bg-gray-800 p-3 text-white shadow-md mb-4`}>
                    <FontAwesomeIcon icon={faCircleNotch} spin /> Waiting on <span className="font-semibold">{name}</span> to {types[1]} a {types[0]}.
                </div>
                <div>
                    {name === currentName && (
                        <div className={"border-t border-gray-600 pt-4"}>
                            <div className={"text-white font-semibold mb-2"}>
                                It is your turn to {types[1]} a {types[0]}.
                            </div>
                            <form method="post" onSubmit={this.handleSubmit}>
                                {types[0] === 'champ' ? (
                                    <select className={`w-full p-2 bg-gray-800 border-2 border-gray-800 text-gray-300 placeholder:text-gray-400 focus:border-${css}-800 focus:outline-none`} onChange={(e: any) => this.handleChange("stepValue", e)} required>
                                        {championsAvailable.map((value:number) => (
                                            <option value={value}>{champions[value]}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <select className={`w-full p-2 bg-gray-800 border-2 border-gray-800 text-gray-300 placeholder:text-gray-400 focus:border-${css}-800 focus:outline-none`} onChange={(e: any) => this.handleChange("stepValue", e)} required>
                                        {mapsAvailable.map((value:number) => (
                                            <option value={value}>{maps[value]}</option>
                                        ))}
                                    </select>
                                )}
                                <button type="submit" className={"w-full btn-medium btn-red mt-4"}>{types[1].toLocaleUpperCase()}</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        )

    }
}

export default Veto;