import React, { Component } from 'react';

export interface RecentMatchesDataProps {
    id: number,
    uuid: string,
    player1: string,
    player2: string,
    jsDatetime: string,
}

class RecentMatchesData extends Component<RecentMatchesDataProps> {
    render() {
        const { id, uuid, player1, player2, jsDatetime } = this.props;

        return (
            <div className="bg-gray-800 px-4 py-2 mb-3 border border-gray-700 shadow flex">
                <div className="w-1/2 text-gray-300 font-semibold">
                    {player1} vs {player2}
                </div>
                <div className="w-1/2 text-gray-400 text-right">
                    {jsDatetime}
                </div>
            </div>
        )
    }
}

export default RecentMatchesData;