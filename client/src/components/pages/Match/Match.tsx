import React, { Component } from 'react';

class Match extends Component {

    data = [
        {
            matchId: 0,
            matchConfig: 'Quake Champions - Timelimit Duel (Best of 3)',
            matchPlayerOne: 'GNiK',
            matchPlayerTwo: 'rapha',
            matchCointoss: 0,
            matchSteps: [
                {
                    stepType: 'map_pick',
                    stepValue: 0,
                }
            ]
        }
    ];

    componentDidMount() {

    }

    render() {
        return (
            <div>
                Test
            </div>
        )
    }

}

export default Match;