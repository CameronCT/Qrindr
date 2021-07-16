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

class Stream extends Component<IProps> {

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
                <div>
                    <div className={`flex flex-wrap px-3`}>
                        {data.matchSteps.list.map((value:any, key:number) => (
                            <div className="w-56 px-2" key={key}>
                                {key <= data.matchSplitMapOne && key <= (data.matchSteps.next) && (
                                    <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                )}
                            </div>
                        ))}
                    </div>
                    {(data.matchSplitMapOne && data.matchSplitMapOne !== 999) && (
                        <div className="w-full px-2">
                            <div className={"flex flex-wrap justify-center items-center"}>
                                {data.matchSteps.next > data.matchSplitMapOne && (
                                    <div className={"w-1/2 px-2"}>
                                        <div className={"p-6 shadow mb-3 bg-gray-800 bg-opacity-75"}>
                                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                                {data.matchMaps.list[data.matchMaps.picked[0]]}
                                            </div>
                                            <div className={"flex flex-wrap justify-center"}>
                                                {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapOne && key <= (data.matchSteps.next) && key <= data.matchSplitMapTwo) && (
                                                    <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                                {data.matchSteps.next > data.matchSplitMapTwo && (
                                    <div className={"w-1/2 px-2"}>
                                        <div className={"p-6 shadow mb-3 bg-gray-800 bg-opacity-75"}>
                                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                                {data.matchMaps.list[data.matchMaps.picked[1]]}
                                            </div>
                                            <div className={"flex flex-wrap justify-center"}>
                                                {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapTwo && key <= (data.matchSteps.next) && key <= data.matchSplitMapThree) && (
                                                    <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                                {data.matchSteps.next > data.matchSplitMapThree && (
                                    <div className={"w-1/2 px-2"}>
                                        <div className={"p-6 shadow mb-3 bg-gray-800 bg-opacity-75"}>
                                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                                {data.matchMaps.list[data.matchMaps.picked[2]]}
                                            </div>
                                            <div className={"flex flex-wrap justify-center"}>
                                                {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapThree && key <= (data.matchSteps.next) && key <= data.matchSplitMapFour) && (
                                                    <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                                {data.matchSteps.next > data.matchSplitMapFour && (
                                    <div className={"w-1/2 px-2"}>
                                        <div className={"p-6 shadow mb-3 bg-gray-800 bg-opacity-75"}>
                                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                                {data.matchMaps.list[data.matchMaps.picked[3]]}
                                            </div>
                                            <div className={"flex flex-wrap justify-center"}>
                                                {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapFour && key <= (data.matchSteps.next) && key <= data.matchSplitMapFive) && (
                                                    <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                                {data.matchSteps.next > data.matchSplitMapFive && (
                                    <div className={"w-1/2 px-2"}>
                                        <div className={"p-6 shadow mb-3 bg-gray-800 bg-opacity-75"}>
                                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                                {data.matchMaps.list[data.matchMaps.picked[4]]}
                                            </div>
                                            <div className={"flex flex-wrap justify-center"}>
                                                {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapFive && key <= (data.matchSteps.next) && key <= data.matchSplitMapSix) && (
                                                    <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {data.matchSteps.next > data.matchSplitMapSix && (
                                    <div className={"w-1/2 px-2"}>
                                        <div className={"p-6 shadow mb-3 bg-gray-800 bg-opacity-75"}>
                                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                                {data.matchMaps.list[data.matchMaps.picked[5]]}
                                            </div>
                                            <div className={"flex flex-wrap justify-center"}>
                                                {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapSix && key <= (data.matchSteps.next) && key <= data.matchSplitMapSeven) && (
                                                    <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {data.matchSteps.next > data.matchSplitMapSeven && (
                                    <div className={"w-1/2 px-2"}>
                                        <div className={"p-6 shadow mb-3 bg-gray-800 bg-opacity-75"}>
                                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                                {data.matchMaps.list[data.matchMaps.picked[5]]}
                                            </div>
                                            <div className={"flex flex-wrap justify-center"}>
                                                {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapSeven && key <= (data.matchSteps.next)) && (
                                                    <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <audio id="NotificationSound" src="/assets/audio/ready.wav" crossOrigin="anonymous" preload="auto" />
            </div>
        ) : <LoadingSpinner />
    }

}

export default Stream;