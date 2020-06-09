import React, { Component } from 'react';

export interface RecentMatchesDataProps {
    id: number,
    uuid: string,
    player1: string,
    player2: string,
    datetime: string,
}

class RecentMatchesData extends Component<RecentMatchesDataProps> {
    render() {
        const { id, uuid, player1, player2, datetime } = this.props;

        return (
            <div className="bg-gray-800 p-3 border shadow">
                <div className="w-1/2">
                    {player1} vs {player2}
                </div>
                <div className="w-1/2">
                    {datetime}
                </div>
            </div>
        )
    }
}

export default RecentMatchesData;