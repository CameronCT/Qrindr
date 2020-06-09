import React, { Component } from 'react';
import RecentMatches from './matches/RecentMatches';

class Home extends Component {
    render() {
        return (
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2">
                    <div className="text-2xl font-bold">Welcome -> Home</div>
                </div>
                <div className="w-full md:w-1/2">
                    <RecentMatches />
                </div>
            </div>
        )
    }
}

export default Home;