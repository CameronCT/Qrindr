import React, { Component } from 'react';

class CreateMatch extends Component {

    render() {
        return (
            <form method="post">
                <div className="bg-gray-800 text-gray-400 shadow p-6">
                    <h1 className="pb-4 text-2xl text-gray-300 text-center font-semibold">Configuration</h1>
                    <select name="gameId" className="mb-4">
                        <option value="0">Quake Champions - Best of 3</option>
                        <option value="1">Quake Champions - Best of 5</option>
                        <option value="2">Diabotical Duel - Best of 3</option>
                        <option value="3">Diabotical Duel - Best of 5</option>
                        <option value="4">Diabotical Duel - Best of 7</option>
                        <option value="5">Diabotical MacGuffin - Best of 3</option>
                        <option value="6">Diabotical MacGuffin - Best of 5</option>
                        <option value="7">Diabotical MacGuffin - Best of 7</option>
                    </select>
                    <select name="gameFormat" className="mb-4">
                        <option value="0">Practice</option>
                        <option value="1">Tournament</option>
                    </select>
                    <div className="border-t border-gray-700 my-4"></div>
                    <h1 className="pb-4 text-2xl text-gray-300 text-center font-semibold">Information</h1>
                    <input type="text" name="player1" placeholder="Liquid rapha" className="mb-4" required />
                    <input type="text" name="player2" placeholder="Nemesis dooi" className="mb-4" required />
                    <select name="cointoss" className="mb-4">
                        <option value="0">Random</option>
                        <option value="1">You</option>
                        <option value="2">Opponent</option>
                    </select>
                    <input type="password" name="secret" placeholder="********" className="mb-4" required />
                </div>

                <button type="submit" className="bg-blue-700 text-blue-100 hover:bg-blue-800 hover:text-blue-200 hover:outline-none py-2 px-4 w-full">Start!</button>
            </form>
        )
    }

}

export default CreateMatch;