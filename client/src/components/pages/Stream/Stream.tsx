import React, { useCallback, useEffect, useRef, useState } from 'react';
import Veto from "./Veto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
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

    }, [ hash, data, getMatch ]);

    const renderIndexTitle = (index: number) => {
        if (index === 0) return 'One';
        else if (index === 1) return 'Two';
        else if (index === 2) return 'Three';
        else if (index === 3) return 'Four';
        else if (index === 4) return 'Five';
        else if (index === 5) return 'Six';
        else if (index === 6) return 'Seven';
    }

    const renderSplit = (index: number) => {
        return (
            <div className={"content-bg no-padding overflow-hidden"}>
                <div className="relative h-32" style={{
                    backgroundImage: `url('${data.matchMaps.listImage[data.matchMaps.picked[index]]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <div className="flex h-full">
                        <div className="m-auto">
                            <div className="font-bold text-lg bg-black bg-opacity-70 px-4 py-1.5 rounded-xl">
                                {data.matchMaps.list[data.matchMaps.picked[index]]}
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={"grid grid-cols-3 gap-2 p-6"}>
                    {data.matchSteps.list.map((value:any, key:number) => (key > data[`matchSplitMap${renderIndexTitle(index)}`] && key <= (data.matchSteps.next) && key <= data[`matchSplitMap${renderIndexTitle(index + 1)}`]) && (
                        <div className={`w-full ${data.matchSteps.values[key]}`} key={key}>
                            <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

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
                    <a href={`/match/${hash}`} className={"btn-icon btn-blue"}>
                        <FontAwesomeIcon icon={faEye} />
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-full lg:col-span-1">
                    <div className="">
                        <div className={`grid grid-cols-1 gap-4`}>
                            {data.matchSteps.list.map((value:any, key:number) => (
                                <div className="w-full" key={key}>
                                    {key <= data.matchSplitMapOne && key <= (data.matchSteps.next) && (
                                        <Veto secret={matchSecret} hash={String(hash)} currentName={currentPlayer} name={data.matchSteps.player[key] === 1 ? data.matchPlayerTwo : data.matchPlayerOne} type={value} value={data.matchSteps.values[key]} maps={data.matchMaps.list} mapsImage={data.matchMaps.listImage} mapsAvailable={data.matchMaps.available} champions={data.matchChampions.list} championsImage={data.matchChampions.listImage} championsAvailable={data.matchChampions.available} next={key >= data.matchSteps.next} getMatch={getMatch} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-span-full lg:col-span-3">
                    {(data.matchSplitMapOne && data.matchSplitMapOne !== 999) && (
                        <div className={"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"}>
                            {data.matchSteps.next > data.matchSplitMapOne && renderSplit(0)}
                            {data.matchSteps.next > data.matchSplitMapTwo && renderSplit(1)}
                            {data.matchSteps.next > data.matchSplitMapThree && renderSplit(2)}
                            {data.matchSteps.next > data.matchSplitMapFour && renderSplit(3)}
                            {data.matchSteps.next > data.matchSplitMapFive && renderSplit(4)}
                            {data.matchSteps.next > data.matchSplitMapSix && renderSplit(5)}
                            {data.matchSteps.next > data.matchSplitMapSeven && renderSplit(7)}
                        </div>
                    )}
                </div>
            </div>
            <audio id="NotificationSound" src="/assets/audio/ready.wav" crossOrigin="anonymous" preload="auto" />
        </div>
    ) : <LoadingSpinner />
}

export default Stream;