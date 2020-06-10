import React, { Component } from 'react';

export interface GamesDataProps {
    gameId: number,
    gameName: string
}

class GamesData extends Component<GamesDataProps> {
    render() {
        const { gameId, gameName } = this.props;

        return (
            <option value={gameId}>{gameName}</option>
        )
    }
}

export default GamesData;