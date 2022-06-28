import React, { useCallback, useEffect, useRef, useState } from 'react';
import Veto from "./Veto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt, faEye} from "@fortawesome/free-solid-svg-icons";
import Config from "../../../Config";
import LoadingSpinner from "../../navigation/LoadingSpinner";
import { useParams } from 'react-router';

const Stream = () => {

    const refreshInterval = useRef<NodeJS.Timer | null>(null);

    const { hash, player, secret } = useParams<{ hash: string; player?: string; secret?: string; }>();

    const [ data, setData ] = useState<any>({});
    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
    const [ currentPlayer, setCurrentPlayer ] = useState<string>('');

    const playNotificationSound = () => (document.getElementById('NotificationSound') as HTMLAudioElement)?.play();

    const getMatch = useCallback(() => {
        fetch(`${Config.apiUrl}/Match.php?hash=${hash}`)
            .then(response => response.json())
            .then(response => {
                if (data && data.matchSteps && data.matchSteps.values) {
                    if (data.matchSteps.values.length !== response.matchSteps.values.length)
                        playNotificationSound();
                }
                setData({ ...response });
                setIsLoaded(true);
            });

        setCurrentPlayer(player || '');
    }, [ data, hash, player ]);

    useEffect(() => {
        return () => {
            if (refreshInterval.current) {
                clearInterval(refreshInterval.current);
                refreshInterval.current = null;
            }
        }
    }, []);

    useEffect(() => {

        if (refreshInterval.current) {
            clearInterval(refreshInterval.current);
            refreshInterval.current = null;
        }

        refreshInterval.current = setInterval(() => getMatch(), 5000);
        if (!data?.matchHash)
            getMatch();

    }, [ hash, data, getMatch ])


    let matchSecret = "";
    if (secret)
        matchSecret = secret;

    return isLoaded ? (
        <div className={`${(data.matchSplitMapOne && data.matchSplitMapOne !== 999) ? 'py-6' : 'w-2/3 mx-auto py-6'}`}>
            <div className={"grid grid-cols-1 md:grid-cols-2 mb-6"}>
                <div className="text-2xl">
                    <span className={"font-semibold"}>{data.matchPlayerOne}</span> <span className={"text-gray-300"}>vs</span> <span className={"font-semibold"}>{data.matchPlayerTwo}</span>
                    <div className={"text-xs text-gray-500 mt-1"}>
                        {data.matchConfig} <span className={"px-2"}>|</span>
                        {data.matchCointoss === '0' ? 'Random' : 'Manual'} Cointoss
                    </div>
                </div>
                <div className={"flex justify-center md:justify-end space-x-2"}>
                    {matchSecret !== "" && (
                        <a href={`/match/${hash}/${matchSecret}/${data.matchPlayerOne === currentPlayer ? data.matchPlayerTwo : data.matchPlayerOne}`} className={"btn-icon btn-blue"}>
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a>
                    )}
                    <a href={`/match/${hash}`} className={"btn-icon btn-blue"}>
                        <FontAwesomeIcon icon={faEye} />
                    </a>
                </div>
            </div>
            <div>
                <div className={`flex flex-wrap`}>
                    {data.matchSteps.list.map((value:any, key:number) => (
                        <div className="w-52 px-2" key={key}>
                            {key <= data.matchSplitMapOne && key <= (data.matchSteps.next) && (
                                <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                            )}
                        </div>
                    ))}
                </div>
                {(data.matchSplitMapOne && data.matchSplitMapOne !== 999) && (
                    <div className="w-full px-2">
                        <div className={"flex flex-wrap justify-center items-center"}>
                            {data.matchSteps.next > data.matchSplitMapOne && (
                                <div className={"w-1/2 px-2"}>
                                    <div className={"p-6 shadow mb-3 alt bg-opacity-75 rounded-lg"}>
                                        <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                            {data.matchMaps.list[data.matchMaps.picked[0]]}
                                        </div>
                                        <div className={"flex flex-wrap justify-center"}>
                                            {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapOne && key <= (data.matchSteps.next) && key <= data.matchSplitMapTwo) && (
                                                <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                    <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}
                            {data.matchSteps.next > data.matchSplitMapTwo && (
                                <div className={"w-1/2 px-2"}>
                                    <div className={"p-6 shadow mb-3 alt bg-opacity-75 rounded-lg"}>
                                        <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                            {data.matchMaps.list[data.matchMaps.picked[1]]}
                                        </div>
                                        <div className={"flex flex-wrap justify-center"}>
                                            {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapTwo && key <= (data.matchSteps.next) && key <= data.matchSplitMapThree) && (
                                                <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                    <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}
                            {data.matchSteps.next > data.matchSplitMapThree && (
                                <div className={"w-1/2 px-2"}>
                                    <div className={"p-6 shadow mb-3 alt bg-opacity-75 rounded-lg"}>
                                        <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                            {data.matchMaps.list[data.matchMaps.picked[2]]}
                                        </div>
                                        <div className={"flex flex-wrap justify-center"}>
                                            {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapThree && key <= (data.matchSteps.next) && key <= data.matchSplitMapFour) && (
                                                <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                    <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}
                            {data.matchSteps.next > data.matchSplitMapFour && (
                                <div className={"w-1/2 px-2"}>
                                    <div className={"p-6 shadow mb-3 alt bg-opacity-75 rounded-lg"}>
                                        <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                            {data.matchMaps.list[data.matchMaps.picked[3]]}
                                        </div>
                                        <div className={"flex flex-wrap justify-center"}>
                                            {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapFour && key <= (data.matchSteps.next) && key <= data.matchSplitMapFive) && (
                                                <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                    <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}
                            {data.matchSteps.next > data.matchSplitMapFive && (
                                <div className={"w-1/2 px-2"}>
                                    <div className={"p-6 shadow mb-3 alt bg-opacity-75 rounded-lg"}>
                                        <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                            {data.matchMaps.list[data.matchMaps.picked[4]]}
                                        </div>
                                        <div className={"flex flex-wrap justify-center"}>
                                            {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapFive && key <= (data.matchSteps.next) && key <= data.matchSplitMapSix) && (
                                                <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                    <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {data.matchSteps.next > data.matchSplitMapSix && (
                                <div className={"w-1/2 px-2"}>
                                    <div className={"p-6 shadow mb-3 alt bg-opacity-75 rounded-lg"}>
                                        <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                            {data.matchMaps.list[data.matchMaps.picked[5]]}
                                        </div>
                                        <div className={"flex flex-wrap justify-center"}>
                                            {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapSix && key <= (data.matchSteps.next) && key <= data.matchSplitMapSeven) && (
                                                <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                    <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {data.matchSteps.next > data.matchSplitMapSeven && (
                                <div className={"w-1/2 px-2"}>
                                    <div className={"p-6 shadow mb-3 alt bg-opacity-75 rounded-lg"}>
                                        <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                            {data.matchMaps.list[data.matchMaps.picked[5]]}
                                        </div>
                                        <div className={"flex flex-wrap justify-center"}>
                                            {data.matchSteps.list.map((value:any, key:number) => (key > data.matchSplitMapSeven && key <= (data.matchSteps.next)) && (
                                                <div className={`w-32 px-2 ${data.matchSteps.values[key]}`} key={key}>
                                                    <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
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

export default Stream;