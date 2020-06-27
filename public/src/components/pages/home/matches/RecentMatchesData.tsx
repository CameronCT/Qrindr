import React, { Component } from 'react';

export interface RecentMatchesDataProps {
    matchId: number,
    matchHash: string,
    matchPlayerOne: string,
    matchPlayerTwo: string,
    matchCreated: string,
}

class RecentMatchesData extends Component<RecentMatchesDataProps> {
    render() {
        const { matchId, matchHash, matchPlayerOne, matchPlayerTwo, matchCreated } = this.props;

        return (

            <div className="w-1/3 px-1">
                <a href={"/match/" + matchHash}>
                    <div className="flex flex-wrap bg-gray-800 px-4 py-2 mb-3 border border-gray-700 text-center shadow">
                        <div className="w-full text-gray-300 font-semibold">
                            <span className="text-lg">{matchPlayerOne}</span> <span className="text-xs text-gray-500 px-1">VS</span> <span className="text-lg">{matchPlayerTwo}</span>
                        </div>
                        <div className="w-full text-gray-500 font-semibold text-sm">
                            {matchCreated}
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default RecentMatchesData;