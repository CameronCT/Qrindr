import React, { Component } from 'react';
import Veto from "./Veto";
import Config from "../../../Config";

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


        return isLoaded && (
            <div>
                <div className={"flex flex-wrap"}>
                    <div className={"w-full lg:w-1/5 lg:pr-2"}>
                        <div className={"text-white font-bold pb-6 text-center text-3xl uppercase"}>
                            Maps
                        </div>
                        {data.matchSteps.list.map((value:any, key:number) => (
                            <div key={key}>
                                {key <= data.matchSplitMapOne && key <= (data.matchSteps.next) && (
                                    <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="w-full lg:w-4/5 lg:pl-2">
                        {data.matchSteps.next > data.matchSplitMapOne && (
                            <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                    {data.matchMaps.list[data.matchMaps.picked[0]]}
                                </div>
                                <div className={"flex flex-wrap"}>
                                    {data.matchSteps.list.map((value:any, key:number) => (
                                        <div key={key} className={` px-2`}>
                                            {
                                                key > data.matchSplitMapOne &&
                                                key <= (data.matchSteps.next) &&
                                                key <= data.matchSplitMapTwo &&
                                                (
                                                    <div key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data.matchSteps.next > data.matchSplitMapTwo && (
                            <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                    {data.matchMaps.list[data.matchMaps.picked[1]]}
                                </div>
                                <div className={"flex flex-wrap"}>
                                    {data.matchSteps.list.map((value:any, key:number) => (
                                        <div key={key} className={"w-1/3 px-2"}>
                                            {
                                                key > data.matchSplitMapTwo &&
                                                key <= (data.matchSteps.next) &&
                                                key <= data.matchSplitMapThree &&
                                                (
                                                    <div key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data.matchSteps.next > data.matchSplitMapThree && (
                            <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                    {data.matchMaps.list[data.matchMaps.picked[2]]}
                                </div>
                                <div className={"flex flex-wrap"}>
                                    {data.matchSteps.list.map((value:any, key:number) => (
                                        <div key={key} className={"w-1/3 px-2"}>
                                            {
                                                key > data.matchSplitMapThree &&
                                                key <= (data.matchSteps.next) &&
                                                key <= data.matchSplitMapFour &&
                                                (
                                                    <div key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data.matchSteps.next > data.matchSplitMapFour && (
                            <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                    {data.matchMaps.list[data.matchMaps.picked[3]]}
                                </div>
                                <div className={"flex flex-wrap"}>
                                    {data.matchSteps.list.map((value:any, key:number) => (
                                        <div key={key} className={"w-1/3 px-2"}>
                                            {
                                                key > data.matchSplitMapFour &&
                                                key <= (data.matchSteps.next) &&
                                                key <= data.matchSplitMapFive &&
                                                (
                                                    <div key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data.matchSteps.next > data.matchSplitMapFive && (
                            <div className={"p-6 shadow mb-3"} style={{ backgroundColor: 'rgba(45, 55, 72, 0.5)' }}>
                                <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                    {data.matchMaps.list[data.matchMaps.picked[4]]}
                                </div>
                                <div className={"flex flex-wrap"}>
                                    {data.matchSteps.list.map((value:any, key:number) => (
                                        <div key={key} className={"w-1/3 px-2"}>
                                            {
                                                key > data.matchSplitMapFive &&
                                                key <= (data.matchSteps.next) &&
                                                (
                                                    <div key={key}>
                                                        <Veto secret={matchSecret} hash={hash} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} next={key >= data.matchSteps.next} getMatch={this.getMatch} />
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <audio id="NotificationSound" src="/assets/audio/ready.wav" crossOrigin="anonymous" preload="auto" />
                </div>
            </div>
        )
    }

}

export default Stream;