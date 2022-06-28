import React, { useCallback } from 'react';
import { useRef, useEffect, useState } from 'react';
import Veto from "./Veto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt, faEye} from "@fortawesome/free-solid-svg-icons";
import Config from "../../../Config";
import LoadingSpinner from "../../navigation/LoadingSpinner";
import { useParams } from 'react-router';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';

const Match = () => {

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
                if (data.matchSteps?.values?.length !== response.matchSteps?.values?.length)
                    playNotificationSound();

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
                    <a href={`/stream/${hash}`} className={"btn-icon btn-blue"}>
                        <FontAwesomeIcon icon={faTwitch} />
                    </a>
                    <a href={`/match/${hash}`} className={"btn-icon btn-blue"}>
                        <FontAwesomeIcon icon={faEye} />
                    </a>
                </div>
            </div>
            <div className={"grid grid-cols-4 gap-4"}>
                <div className={`col-span-full ${(data.matchSplitMapOne && data.matchSplitMapOne !== 999) ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
                    {data.matchSteps.list.map((value:any, key:number) => (
                        <div key={key}>
                            {key <= data.matchSplitMapOne && key <= (data.matchSteps.next) && (
                                <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                            )}
                        </div>
                    ))}
                    {(data.matchSplitMapOne === 999 && data.matchCopyPasta) && (
                        <div className={"content-bg next"}>
                            <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                Copy Pasta
                            </div>
                            <div>
                                <div className={"text-white text-center alt p-4 w-full"}>{data.matchCopyPasta}</div>
                            </div>
                        </div>
                    )}
                </div>
                {(data.matchSplitMapOne && data.matchSplitMapOne !== 999) && (
                    <div className="col-span-full lg:col-span-2">
                        {data.matchSteps.next > data.matchSplitMapOne && (
                            <div className={"content-bg next"}>
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
                                                <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                            )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {data.matchSteps.next > data.matchSplitMapTwo && (
                            <div className={"content-bg next"}>
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
                                                <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                            )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {data.matchSteps.next > data.matchSplitMapThree && (
                            <div className={"content-bg next"}>
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
                                                <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                            )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {data.matchSteps.next > data.matchSplitMapFour && (
                            <div className={"content-bg next"}>
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
                                                <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                            )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {data.matchSteps.next > data.matchSplitMapFive && (
                            <div className={"content-bg next"}>
                                <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                    {data.matchMaps.list[data.matchMaps.picked[4]]}
                                </div>
                                {data.matchSteps.list.map((value:any, key:number) => (
                                    <div key={key}>
                                        {
                                            key > data.matchSplitMapFive &&
                                            key <= (data.matchSteps.next) &&
                                            (
                                                <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                            )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {data.matchCopyPasta && (
                            <div className={"content-bg next"}>
                                <div className={"text-center text-white text-lg font-semibold mb-4"}>
                                    Copy Pasta
                                </div>
                                <div>
                                    <div className={"text-white text-center alt p-4 w-full"}>{data.matchCopyPasta}</div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className={`col-span-full ${(data.matchSplitMapOne && data.matchSplitMapOne !== 999) ? 'lg:col-span-1' : 'lg:col-span-2'} px-2`}>
                    <div className={"content-bg next"}>
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
                        <div className={"content-bg next"}>
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

export default Match;