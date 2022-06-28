import React, { FormEvent, useEffect, useState } from 'react'
import FormInput from "../../form/FormInput";
import Config from "../../../Config";
import LoadingSpinner from "../../navigation/LoadingSpinner";

const Create = () => {
    const [ playerOne, setPlayerOne ] = useState<string>('');
    const [ playerTwo, setPlayerTwo ] = useState<string>('');
    const [ matchGame, setMatchGame ] = useState<number>(0);
    const [ matchCointoss, setMatchCointoss ] = useState<number>(0);
    const [ cointoss, setCointoss ] = useState<any>([]);
    const [ configs, setConfigs ] = useState<any>([]);

    useEffect(() => {
        fetch(`${Config.apiUrl}/Home.php`)
            .then(response => response.json())
            .then(response => {
                setConfigs(response.Configs);
                setCointoss(response.Cointoss);
                setMatchGame(response.Configs[0].configId || 0);
            });
        
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: { playerOne, playerTwo, matchGame, matchCointoss }})
        };

        fetch(`${Config.apiUrl}/Create.php`, { ...requestOptions })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    if (data.success !== '') 
                        window.location.href = data.url;
                }
            });
    }

    return configs.length ? (
        <div className={"flex create-screen"}>
            <div className={"w-full lg:w-1/3 m-auto"}>
                <div className={"bg-black bg-opacity-25 p-8"}>
                    <form method={"post"} onSubmit={handleSubmit}>
                        <div className="pb-4 text-2xl text-center font-semibold text-white">
                            Create Match
                        </div>
                        <div className={"mb-4"}>
                            <div className="font-semibold text-base text-gray-200">Game</div>
                            <select className={"form-control"} onChange={(e) => setMatchGame(Number(e.target.value))} required>
                                {configs.map((row: any) => (
                                    <option key={row.configId} value={row.configId}>{row.configName}</option>
                                ))}
                            </select>
                        </div>
                        <FormInput type="text" name="playerOne" id="You" placeholder="RAIJIN GNiK" className={"mb-4"} onChange={(e) => setPlayerOne(String(e.target.value))} />
                        <FormInput type="text" name="playerTwo" id="Opponent" placeholder="Nemesis dooi" className={"mb-4"} onChange={(e) => setPlayerTwo(String(e.target.value))} />
                        <div className={"mb-4"}>
                            <div className="font-semibold text-base text-gray-200">First Seed</div>
                            <select className={"form-control"} onChange={(e) => setMatchCointoss(Number(e.target.value))} required>
                                {cointoss.map((row: any) => (
                                    <option key={row.cointossId} value={row.cointossId}>{row.cointossName}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"text-right"}>
                            <button type="submit" className={"btn-medium btn-blue"}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : <LoadingSpinner />
}

export default Create;