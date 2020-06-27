import React, { Component } from 'react';
import GamesData from "./GamesData";

interface gameRowsData {
    gameIdId: number;
    gameIdName: string;
}

interface IState {
    gameId?: number;
    format?: number;
    player1?: string;
    player2?: string;
    cointoss?: number;
    secret?: string;
    game?: gameRowsData[];
}

class CreateMatch extends Component {

    state:IState = {
        gameId: -1,
        format: -1,
        player1: "",
        player2: "",
        cointoss: -1,
        secret: "",
        game: []
    };

    componentDidMount() {
        fetch('/getGames')
            .then(response => response.json())
            .then(response => this.setState({
                game: response.data
            }))

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(formName: string, event: any) {
        console.log(event.target.value);

        this.setState({ [formName]: event.target.value });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        const { state } = this;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        };
        fetch('/createMatch', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
            });

    }

    render() {
        const { game } = this.state;

        return (
            <form method="post" onSubmit={this.handleSubmit}>
                <div className="bg-gray-800 text-gray-400 shadow p-6">
                    <h1 className="pb-4 text-2xl text-gray-300 text-center font-semibold">Configuration</h1>
                    <div className="text-gray-200 font-semibold">Game</div>
                    {game && (
                        <select name="gameId" className="mb-4" onChange={(e) => this.handleChange("gameId", e)}>
                            {game.map((row: any) => (
                                <GamesData key={row.gameIdId} {...row} />
                            ))}
                        </select>
                    )}

                    <div className="text-gray-200 font-semibold">Format</div>
                    <select name="format" className="mb-4" onChange={(e) => this.handleChange("format", e)}>
                        <option value="0">Practice</option>
                        <option value="1">Tournament</option>
                    </select>

                    <div className="border-t border-gray-700 my-4"/>

                    <h1 className="pb-4 text-2xl text-gray-300 text-center font-semibold">Information</h1>
                    <div className="text-gray-200 font-semibold">You</div>
                    <input type="text" name="player1" placeholder="Liquid rapha" className="mb-4" onChange={(e) => this.handleChange("player1", e)} required />

                    <div className="text-gray-200 font-semibold">Opponent</div>
                    <input type="text" name="player2" placeholder="Nemesis dooi" className="mb-4" onChange={(e) => this.handleChange("player2", e)} required />

                    <div className="text-gray-200 font-semibold">Cointoss</div>
                    <select name="cointoss" className="mb-4" onChange={(e) => this.handleChange("cointoss", e)}>
                        <option value="0">Random</option>
                        <option value="1">You</option>
                        <option value="2">Opponent</option>
                    </select>

                    <div className="text-gray-200 font-semibold">Secret</div>
                    <input type="password" name="secret" placeholder="********" className="mb-4" onChange={(e) => this.handleChange("secret", e)} required />
                </div>

                <button type="submit" className="bg-blue-700 text-blue-100 hover:bg-blue-800 hover:text-blue-200 hover:outline-none py-2 px-4 w-full">Start!</button>
            </form>
        )
    }

}

export default CreateMatch;