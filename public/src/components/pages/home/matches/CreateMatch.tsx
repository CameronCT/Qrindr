import React, { Component } from 'react';
import Games from "./Games";

class CreateMatch extends Component {

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form method="post" onSubmit={this.handleSubmit}>
                <div className="bg-gray-800 text-gray-400 shadow p-6">
                    <h1 className="pb-4 text-2xl text-gray-300 text-center font-semibold">Configuration</h1>
                    <div className="text-gray-200 font-semibold">Game</div>
                    <Games />

                    <div className="text-gray-200 font-semibold">Format</div>
                    <select name="gameFormat" className="mb-4">
                        <option value="0">Practice</option>
                        <option value="1">Tournament</option>
                    </select>

                    <div className="border-t border-gray-700 my-4"></div>

                    <h1 className="pb-4 text-2xl text-gray-300 text-center font-semibold">Information</h1>
                    <div className="text-gray-200 font-semibold">You</div>
                    <input type="text" name="player1" placeholder="Liquid rapha" className="mb-4" required />

                    <div className="text-gray-200 font-semibold">Opponent</div>
                    <input type="text" name="player2" placeholder="Nemesis dooi" className="mb-4" required />

                    <div className="text-gray-200 font-semibold">Cointoss</div>
                    <select name="cointoss" className="mb-4">
                        <option value="0">Random</option>
                        <option value="1">You</option>
                        <option value="2">Opponent</option>
                    </select>

                    <div className="text-gray-200 font-semibold">Secret</div>
                    <input type="password" name="secret" placeholder="********" className="mb-4" required />
                </div>

                <button type="submit" className="bg-blue-700 text-blue-100 hover:bg-blue-800 hover:text-blue-200 hover:outline-none py-2 px-4 w-full">Start!</button>
            </form>
        )
    }

}

export default CreateMatch;