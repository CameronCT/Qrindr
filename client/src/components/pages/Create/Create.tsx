import React, { Component } from 'react'
import FormInput from "../../form/FormInput";
import Config from "../../../Config";
import LoadingSpinner from "../../navigation/LoadingSpinner";

interface IState {
    playerOne: string;
    playerTwo: string;
    matchGame: number;
    matchCointoss: number;
    cointoss: any;
    configs: any;
}

class Create extends Component {

    state : IState = {
        playerOne: '',
        playerTwo: '',
        matchGame: 0,
        matchCointoss: 0,
        cointoss: [] as any,
        configs: [] as any
    };

    componentDidMount() {
        fetch(`${Config.apiUrl}/Home.php`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    configs: response.Configs,
                    cointoss: response.Cointoss,
                })
            });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(formName: string, event: any) {
        this.setState({ [formName]: event.target.value });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        const { state } = this;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state })
        };

        fetch(`${Config.apiUrl}/Create.php`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    if (data.success !== '') {
                        window.location.href = data.url;
                    }

                    if (data.error !== '')
                        this.setState({ error: data.error });
                }
            });
    }

    render() {

        const { configs, cointoss } = this.state;

        return configs.length ? (
            <div className={"flex create-screen"}>
                <div className={"w-full lg:w-1/3 m-auto"}>
                    <div className={"bg-black bg-opacity-25 p-8"}>
                        <form method={"post"} onSubmit={this.handleSubmit}>
                            <div className="pb-4 text-2xl text-center font-semibold text-white">
                                Create Match
                            </div>
                            <div className={"mb-4"}>
                                <div className="font-semibold text-base text-gray-200">Game</div>
                                <select className={"form-control"} onChange={(e: any) => this.handleChange("matchGame", e)} required>
                                    {configs.map((row: any) => (
                                        <option key={row.configId} value={row.configId}>{row.configName}</option>
                                    ))}
                                </select>
                            </div>
                            <FormInput type="text" name="playerOne" id="You" placeholder="RAIJIN GNiK" className={"mb-4"} onChange={(e: any) => this.handleChange("playerOne", e)} />
                            <FormInput type="text" name="playerTwo" id="Opponent" placeholder="Nemesis dooi" className={"mb-4"} onChange={(e: any) => this.handleChange("playerTwo", e)} />
                            <div className={"mb-4"}>
                                <div className="font-semibold text-base text-gray-200">First Seed</div>
                                <select className={"form-control"} onChange={(e: any) => this.handleChange("matchCointoss", e)} required>
                                    {cointoss.map((row: any) => (
                                        <option key={row.cointossId} value={row.cointossId}>{row.cointossName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={"text-right"}>
                                <button type="submit" className={"btn-medium btn-blue"}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        ) : <LoadingSpinner />
    }
}

export default Create;