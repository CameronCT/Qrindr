import React, { Component } from 'react';

class CreateMatch extends Component {

    render() {
        return (
            <form method="post">
                <div className="bg-gray-800 text-gray-400 shadow p-6 mb-4">
                    <h1 className="pb-4 text-3xl text-gray-300 text-center font-semibold">Configuration</h1>
                    <select name="configuration" className="mb-4">
                        <option value="0">Quake Champions - Best of 3</option>
                        <option value="1">Quake Champions - Best of 5</option>
                        <option value="2">Diabotical Duel - Best of 3</option>
                        <option value="3">Diabotical Duel - Best of 5</option>
                        <option value="4">Diabotical Duel - Best of 7</option>
                        <option value="5">Diabotical MacGuffin - Best of 3</option>
                        <option value="6">Diabotical MacGuffin - Best of 5</option>
                        <option value="7">Diabotical MacGuffin - Best of 7</option>
                    </select>
                    <select name="mode" className="mb-4">
                        <option value="0">Practice</option>
                        <option value="1">Tournament</option>
                    </select>
                </div>

                <div className="bg-gray-800 text-gray-400 shadow p-6">
                    <h1 className="pb-4 text-3xl text-gray-300 text-center font-semibold">Information</h1>
                    <input type="text" name="player1" placeholder="Liquid rapha" required />
                </div>
            </form>
        )
    }

}

export default CreateMatch;