import React, { Component } from 'react';
import RecentMatchesData from './RecentMatchesData';

class RecentMatches extends Component {

    state = {
        rows: [],
        isLoading: true,
        error: false
    }

    componentDidMount() {
        fetch('/getMatches')
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
            <div className="flex flex-wrap">
                {rows.map((row: any) => (
                    <RecentMatchesData key={row.matchId} {...row} />
                ))}
            </div>
        )
    }
}

export default RecentMatches;