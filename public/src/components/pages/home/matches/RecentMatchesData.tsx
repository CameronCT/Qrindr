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
            <div className="w-1/2 px-1">
                <div className="flex flex-wrap bg-gray-800 px-4 py-2 mb-3 border border-gray-700 text-center shadow">
                    <div className="w-full text-gray-300 font-semibold">
                        <span className="text-lg">{player1}</span> <span className="text-xs text-gray-500 px-1">VS</span> <span className="text-lg">{player2}</span>
                    </div>
                    <div className="w-full text-gray-500 font-semibold text-sm">
                        {jsDatetime}
                    </div>
                </div>
            </div>
        )
    }
}

export default RecentMatchesData;