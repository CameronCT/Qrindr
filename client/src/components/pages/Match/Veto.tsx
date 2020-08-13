import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/pro-duotone-svg-icons";
import {faCheck, faTimes} from "@fortawesome/pro-solid-svg-icons";
import Match from "./Match";

interface IProps {
    currentName: string | boolean;
    hash: string;
    secret: string;
    name: string;
    type: string;
    value: any;
    maps: any;
    mapsAvailable: any;
    champions: any;
    championsAvailable: any;
    next?: boolean;
    getMatch: any;
}

class Veto extends Component<IProps> {

    state = {
        stepValue: 9999,
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

        const { currentName, hash, secret } = this.props;
        const { stepValue } = this.state;

        console.log(this.state);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hash: hash, player: currentName, value: stepValue, secret: secret })
        };

        fetch(`http://localhost:3000/Step.php`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    if (data.success !== '') {
                        this.setState({success: data.success });
                        this.props.getMatch();
                    }

                    if (data.error !== '')
                        this.setState({ error: data.error });
                }
            });
    }

    render() {

        const { timer } = this.state;
        const { currentName, name, value, next, maps, champions, mapsAvailable, championsAvailable } = this.props;
        let { type } = this.props;
        let css;
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
                <div className={`border-2 border-yellow-800 bg-gray-800 p-3 text-white shadow-md mb-4`}>
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
                                        <option value="999" selected>Select</option>
                                        {championsAvailable.map((value:number) => (
                                            <option value={value}>{champions[value]}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <select className={`w-full p-2 bg-gray-800 border-2 border-gray-800 text-gray-300 placeholder:text-gray-400 focus:border-${css}-800 focus:outline-none`} onChange={(e: any) => this.handleChange("stepValue", e)} required>
                                        <option value="999" selected>Select</option>
                                        {mapsAvailable.map((value:number) => (
                                            <option value={value}>{maps[value]}</option>
                                        ))}
                                    </select>
                                )}
                                <button type="submit" className={`w-full btn-medium btn-${types[1] === 'pick' ? 'green' : 'red'} mt-4`}>{types[1].toLocaleUpperCase()}</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        )

    }
}

export default Veto;