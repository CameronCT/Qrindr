import React, { Component } from 'react';
import Veto from "./Veto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt, faEye} from "@fortawesome/free-solid-svg-icons";
import Config from "../../../Config";
import LoadingSpinner from "../../navigation/LoadingSpinner";

interface IProps {
    match: {
        params: {
            hash: string;
            player?: string;
            secret?: string;
        }
    }
}

class Match extends Component<IProps> {

    protected refreshInterval: any;

    state = {
        data: {} as any,
        isLoaded: false,
        currentPlayer: false
    };

    playNotificationSound = () => {
        if (document.getElementById('NotificationSound')) {
            // @ts-ignore
            document.getElementById('NotificationSound').play();
        }
    }

    getMatch = () => {
        fetch(`${Config.apiUrl}/Match.php?hash=${this.props.match.params.hash}`)
            .then(response => response.json())
            .then(response => {
                if (this.state.data && this.state.data.matchSteps && this.state.data.matchSteps.values) {
                    if (this.state.data.matchSteps.values.length !== response.matchSteps.values.length)
                        this.playNotificationSound();
                }
                this.setState({ data: response, isLoaded: true })
            });

        this.setState({ currentPlayer: this.props.match.params.player || null });
    }

    componentDidMount() {
        this.getMatch();
        this.refreshInterval = setInterval(() => {
            this.getMatch();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval);
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.match.params.hash !== this.props.match.params.hash) {
            clearInterval(this.refreshInterval);
            this.getMatch();

            this.refreshInterval = setInterval(() => {
                this.getMatch();
            }, 5000);
        }
    }

    render() {

        const { currentPlayer, data, isLoaded } = this.state;
        const { hash } = this.props.match.params;

        let matchSecret = "";
        if (this.props.match.params.secret)
            matchSecret = this.props.match.params.secret;


        return isLoaded ? (
            <div className={`${(data.matchSplitMapOne && data.matchSplitMapOne !== 999) ? 'py-6' : 'w-2/3 mx-auto py-6'}`}>
                <div className={"flex flex-wrap border-b border-gray-700 mb-4 pb-4 mx-2"}>
                    <div className={"w-full md:w-3/4 text-xl my-auto text-white"}>
                        <span className={"font-semibold"}>{data.matchPlayerOne}</span> <span className={"text-gray-300"}>vs</span> <span className={"font-semibold"}>{data.matchPlayerTwo}</span>
                        <div className={"text-xs text-gray-500"}>
                            {data.matchConfig} <span className={"px-2"}>|</span>
                            {data.matchCointoss === '0' ? 'Random' : 'Manual'} Cointoss
                        </div>
                    </div>
                    <div className={"w-full md:w-1/4 text-center md:text-right my-auto"}>
                        {matchSecret !== "" && (
                            <a href={`/match/${hash}/${matchSecret}/${data.matchPlayerOne === currentPlayer ? data.matchPlayerTwo : data.matchPlayerOne}`} className={"ml-2 px-4 py-2 font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded"}>
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </a>
                        )}
                        <a href={`/match/${hash}`} className={"ml-2 px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded"}>
                            <FontAwesomeIcon icon={faEye} />
                        </a>
                    </div>
                </div>
                <div className={"flex flex-wrap"}>
                    <div className={`w-full ${(data.matchSplitMapOne && data.matchSplitMapOne !== 999) ? 'lg:w-3/12' : 'lg:w-2/3'} px-2`}>
                        {data.matchSteps.list.map((value:any, key:number) => (
                            <div key={key}>
                                {key <= data.matchSplitMapOne && key <= (data.matchSteps.next) && (
                                    <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                )}
                            </div>
                        ))}
                        {(data.matchSplitMapOne === 999 && data.matchCopyPasta) && (
                            <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                    Copy Pasta
                                </div>
                                <div>
                                    <div className={"text-white text-center bg-gray-800 p-4 w-full"}>{data.matchCopyPasta}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    {(data.matchSplitMapOne && data.matchSplitMapOne !== 999) && (
                        <div className="w-full lg:w-6/12 px-2">
                            {data.matchSteps.next > data.matchSplitMapOne && (
                                <div className={"p-6 shadow mb-3 bg-gray-800 bg-opacity-75"}>
                                    <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                        {data.matchMaps.list[data.matchMaps.picked[0]]}
                                    </div>
                                    {data.matchSteps.list.map((value:any, key:number) => (
                                        <div key={key}>
                                            {
                                                key > data.matchSplitMapOne &&
                                                key <= (data.matchSteps.next) &&
                                                key <= data.matchSplitMapTwo &&
                                                (
                                                    <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {data.matchSteps.next > data.matchSplitMapTwo && (
                                <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                    <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                        {data.matchMaps.list[data.matchMaps.picked[1]]}
                                    </div>
                                    {data.matchSteps.list.map((value:any, key:number) => (
                                        <div key={key}>
                                            {
                                                key > data.matchSplitMapTwo &&
                                                key <= (data.matchSteps.next) &&
                                                key <= data.matchSplitMapThree &&
                                                (
                                                    <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {data.matchSteps.next > data.matchSplitMapThree && (
                                <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                    <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                        {data.matchMaps.list[data.matchMaps.picked[2]]}
                                    </div>
                                    {data.matchSteps.list.map((value:any, key:number) => (
                                        <div key={key}>
                                            {
                                                key > data.matchSplitMapThree &&
                                                key <= (data.matchSteps.next) &&
                                                key <= data.matchSplitMapFour &&
                                                (
                                                    <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {data.matchSteps.next > data.matchSplitMapFour && (
                                <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                    <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                        {data.matchMaps.list[data.matchMaps.picked[3]]}
                                    </div>
                                    {data.matchSteps.list.map((value:any, key:number) => (
                                        <div key={key}>
                                            {
                                                key > data.matchSplitMapFour &&
                                                key <= (data.matchSteps.next) &&
                                                key <= data.matchSplitMapFive &&
                                                (
                                                    <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {data.matchSteps.next > data.matchSplitMapFive && (
                                <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                    <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                        {data.matchMaps.list[data.matchMaps.picked[4]]}
                                    </div>
                                    {data.matchSteps.list.map((value:any, key:number) => (
                                        <div key={key}>
                                            {
                                                key > data.matchSplitMapFive &&
                                                key <= (data.matchSteps.next) &&
                                                (
                                                    <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {data.matchCopyPasta && (
                                <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                    <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                        Copy Pasta
                                    </div>
                                    <div>
                                        <div className={"text-white text-center bg-gray-800 p-4 w-full"}>{data.matchCopyPasta}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className={`w-full ${(data.matchSplitMapOne && data.matchSplitMapOne !== 999) ? 'lg:w-3/12' : 'lg:w-1/3'} px-2`}>
                        <div className={"bg-gray-800 shadow p-6 mb-4"}>
                            <div>
                                <div className={"text-lg font-semibold text-white"}>
                                    Maps
                                </div>
                                <div>
                                    <ul className={"list-decimal pl-8 text-gray-200 mt-4"}>
                                        <div className="mb-2">
                                            {data.matchMaps.picked.map((value:any, key:any) => (
                                                <li key={key}>{data.matchMaps.list[value]}</li>
                                            ))}
                                        </div>
                                    </ul>
                                    <ul className={"list-disc pl-8 text-gray-200 mt-4"}>
                                        {data.matchMaps.available.map((value:any) => (
                                            <li key={value}>{data.matchMaps.list[value]}</li>
                                        ))}
                                        {data.matchMaps.taken.map((value:any) => (
                                            <li key={value} className={"line-through text-gray-600"}>{data.matchMaps.list[value]}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {data.matchChampions.list[0] && (
                            <div className={"bg-gray-800 shadow p-6 mb-4"}>
                                <div>
                                    <div className={"text-lg font-semibold text-white"}>
                                        Champions
                                    </div>
                                    <div>
                                        <ul className={"list-disc pl-8 text-gray-200 mt-4"}>
                                            {data.matchChampions.available && data.matchChampions.available.map((value:any) => (
                                                <li key={value}>{data.matchChampions.list[value]}</li>
                                            ))}
                                            {data.matchChampions.taken.map((value:any) => (
                                                <li key={value} className={"line-through text-gray-600"}>{data.matchChampions.list[value]}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <audio id="NotificationSound" src="/assets/audio/ready.wav" crossOrigin="anonymous" preload="auto" />
            </div>
        ) : <LoadingSpinner />
    }

}

export default Match;