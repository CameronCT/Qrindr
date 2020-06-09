import React, { Component } from 'react';
import axios from 'axios';
import RecentMatchesData, { RecentMatchesDataProps } from './RecentMatchesData';

class RecentMatches extends Component {
    constructor(props: any) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
        };
    }


    componentDidMount() {
        this.setState({ isLoading: true });
        axios.get('/getMatch')
            .then(result => this.setState({
                data: result.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    render() {
        return this.state.data && (
            <div>
                {this.state.data.map((row) => (
                        <RecentMatchesData key={row.id} {...row} />
                    ))
                }
            </div>
        )
    }
}

export default RecentMatches;
