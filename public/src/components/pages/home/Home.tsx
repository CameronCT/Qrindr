import React, { Component } from 'react';
import RecentMatches from './matches/RecentMatches';
import CreateMatch from './matches/CreateMatch';

class Home extends Component {
    render() {
        return (
            <div className="flex flex-wrap py-6">
                <div className="w-full md:w-1/3 pr-2">
                    <CreateMatch />
                </div>
                <div className="w-full md:w-2/3 pl-2">
                    <RecentMatches />
                </div>
            </div>
        )
    }
}

export default Home;