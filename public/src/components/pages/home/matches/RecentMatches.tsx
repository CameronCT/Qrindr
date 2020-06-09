import React, { Component } from 'react';
import RecentMatchesData, { RecentMatchesDataProps } from './RecentMatchesData';

class RecentMatches extends Component {
    render() {

        this.state.loading = false;

        componentDidMount() {
            const data = fetch('https://qrindr.com/api/matches.php')
                .then(response => response.json())
                .then(data => this.setState({ data: data, loading: true }));
        }

        return (
            <div>loading</div>
        )
    }
}

export default RecentMatches;
