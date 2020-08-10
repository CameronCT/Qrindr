import React, { Component } from 'react';
import data from './data.json';
import Veto from "./Veto";

class Match extends Component {
    state = {
        data: {} as any
    };

    componentDidMount() {
        this.setState({ data });
    }

    /*
    {data.matchSteps.list.map((key, value: any) => (
                            <div>
                                <Veto name={"playerNameHere"} type={value} value={data.matchSteps.values[key]} />
                            </div>
                        ))}
     */
    render() {
        return (
            <div>
                <div className={"flex flex-wrap"}>
                    <div className="w-2/5 bg-red-500 min-h-screen">
                        {data.matchSteps.list.map((key, value: any) => (
                            <div>
                                <Veto name={"playerNameHere"} type={value} value={data.matchSteps.values[key]} />
                            </div>
                        ))}
                    </div>
                    <div className="w-2/5 bg-blue-800">

                    </div>
                    <div className="w-1/5 bg-yellow-900">

                    </div>
                </div>
            </div>
        )
    }

}

export default Match;