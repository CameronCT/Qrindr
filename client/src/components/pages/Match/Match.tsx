import React, { Component } from 'react';
import data from './data.json';
import Veto from "./Veto";

class Match extends Component {
    state = {
        data: {} as any
    };

    isOdd = (n: number) => {
        return n % 2;
    }

    componentDidMount() {
        this.setState({ data });
    }

    render() {

        return (
            <div>
                <div className={"flex flex-wrap"}>
                    <div className="w-1/3 px-2">
                        {data.matchSteps.list.map((value:any, key:number) => (
                            <div>
                                {key <= data.matchSplitMapOne && key <= (data.matchSteps.next) && (
                                    <Veto name={this.isOdd(key) ? data.matchPlayerOne : data.matchPlayerTwo} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} champions={data.matchChampions.list} next={key >= data.matchSteps.next} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="w-1/3 px-2">
                        <div className={"bg-gray-700 p-6 shadow mb-3"}>
                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                {data.matchMaps.list[data.matchMaps.picked[0]]}
                            </div>
                            {data.matchSteps.list.map((value:any, key:number) => (
                                <div>
                                    {
                                        key > data.matchSplitMapOne &&
                                        key <= (data.matchSteps.next) &&
                                        key <= data.matchSplitMapTwo &&
                                        (
                                            <Veto name={this.isOdd(key) ? data.matchPlayerOne : data.matchPlayerTwo} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} champions={data.matchChampions.list} next={key >= data.matchSteps.next} />
                                        )}
                                </div>
                            ))}
                        </div>
                        <div className={"bg-gray-700 p-6 shadow mb-3"}>
                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                {data.matchMaps.list[data.matchMaps.picked[1]]}
                            </div>
                            {data.matchSteps.list.map((value:any, key:number) => (
                                <div>
                                    {
                                        key > data.matchSplitMapTwo &&
                                        key <= (data.matchSteps.next) &&
                                        key <= data.matchSplitMapThree &&
                                        (
                                            <Veto name={this.isOdd(key) ? data.matchPlayerOne : data.matchPlayerTwo} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} champions={data.matchChampions.list} next={key >= data.matchSteps.next} />
                                        )}
                                </div>
                            ))}
                        </div>
                        <div className={"bg-gray-700 p-6 shadow mb-3"}>
                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                {data.matchMaps.list[data.matchMaps.picked[2]]}
                            </div>
                            {data.matchSteps.list.map((value:any, key:number) => (
                                <div>
                                    {
                                        key > data.matchSplitMapThree &&
                                        key <= (data.matchSteps.next) &&
                                        key <= data.matchSplitMapFour &&
                                        (
                                            <Veto name={this.isOdd(key) ? data.matchPlayerOne : data.matchPlayerTwo} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} champions={data.matchChampions.list} next={key >= data.matchSteps.next} />
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/5 px-2">
                        <div className={"bg-gray-800 shadow p-6 mb-4"}>
                            <div>
                                <div className={"text-lg font-semibold text-white"}>
                                    Maps
                                </div>
                                <div>
                                    <ul className={"list-disc pl-8 text-gray-200 mt-4"}>
                                        <div className="mb-2">
                                            {data.matchMaps.picked.map((value:any, key:any) => (
                                                <li>{key+1}. {data.matchMaps.list[value]}</li>
                                            ))}
                                        </div>
                                        {data.matchMaps.available.map((value:any, key:any) => (
                                            <li>{data.matchMaps.list[value]}</li>
                                        ))}
                                        {data.matchMaps.taken.map((value:any, key:any) => (
                                            <li className={"line-through text-gray-600"}>{data.matchMaps.list[value]}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={"bg-gray-800 shadow p-6 mb-4"}>
                            <div>
                                <div className={"text-lg font-semibold text-white"}>
                                    Champions
                                </div>
                                <div>
                                    <ul className={"list-disc pl-8 text-gray-200 mt-4"}>
                                        {data.matchChampions.available.map((value:any, key:any) => (
                                            <li>{data.matchChampions.list[value]}</li>
                                        ))}
                                        {data.matchChampions.taken.map((value:any, key:any) => (
                                            <li className={"line-through text-gray-600"}>{data.matchChampions.list[value]}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default Match;