import React, { Component } from 'react';
import RecentMatchesData, { RecentMatchesDataProps } from './RecentMatchesData';

class RecentMatches extends Component {
    state = {
        data: [],
        isLoading: true,
    };

    componentDidMount() {
        const data = fetch('https://qrindr.com/api/matches.php')
            .then(response => response.json())
            .then(data => this.setState({ data: data, isLoading: false }));

        console.log(this.state);
    }

    render() {
        return (
            <div>render</div>
        )
    };
}

export default RecentMatches;
