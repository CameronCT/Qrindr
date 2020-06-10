import React, { Component } from 'react';
import axios from 'axios';
import RecentMatchesData from './RecentMatchesData';

class RecentMatches extends Component {

    state = {
        rows: [],
        isLoading: true,
        error: false
    }

    componentDidMount() {
        fetch('/getMatch')
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
        console.log(rows);
        console.log(isLoading);
        return rows && !error && !isLoading && (
            <div className="flex flex-wrap">
                {rows.map((row: any) => (
                    <RecentMatchesData key={row.id} {...row} />
                ))}
            </div>
        )
    }
}

export default RecentMatches;
