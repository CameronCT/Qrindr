import React, { Component } from 'react';
import GamesData from './GamesData';

class Games extends Component {

    state = {
        rows: [],
        isLoading: true,
        error: false
    }

    componentDidMount() {
        fetch('/getGames')
            .then(response => response.json())
            .then(response => this.setState({
                rows: response.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                isLoading: false,
                error: true
            }));

    }

    render() {
        const { rows, isLoading, error } = this.state;
        return rows && !error && !isLoading && (
            <select name="gameFormat" className="mb-4">
                {rows.map((row: any) => (
                    <GamesData key={row.gameId} {...row} />
                ))}
            </select>
        )
    }
}

export default Games;
