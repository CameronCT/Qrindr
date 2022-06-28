import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import Config from "../../../Config";
import {Link} from "react-router-dom";

interface GitHubState {
    URL: string;
    SHA: string;
    DATE: string;
    MSG: string;
}

class Home extends Component {

    state = {
        GitHub: {} as GitHubState,
        playerOne: '',
        playerTwo: '',
        matchGame: 0,
        matchCointoss: 0,
        matches: [] as any,
        statistics: [] as any
    };

    supported = [
        {
            key: 'quake',
            name: 'Quake Champions',
            url: 'https://quake.com/',
        },
        {
            key: 'diabotical',
            name: 'Diabotical',
            url: 'https://diabotical.com',
        },
        {
            key: 'csgo',
            name: 'Counter-Strike: Global Offensive',
            url: 'https://counter-strike.net'
        }
    ];

    componentDidMount() {
        fetch('https://api.github.com/repos/CameronCT/Qrindr/commits/v3')
            .then(response => response.json())
            .then(response => {
                this.setState({ GitHub: response.commit })
            });

        fetch(`${Config.apiUrl}/Home.php`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    blogs: response.Blogs,
                    matches: response.Matches,
                    GitHub: response.GitHub,
                    statistics: response.Statistics
                })
            });
    }


    render() {
        const { GitHub, matches, statistics } = this.state;

        return (
            <div className={"w-full lg:w-2/3 mx-auto"}>
                <div className={"content mx-2 my-6"}>
                    <div style={{ backgroundImage: "url('assets/bg_1.png')", backgroundSize: 'cover' }} className={"p-16 rounded shadow-md"}>
                        <div className={"text-4xl text-white font-bold"}>Qrindr - the <span className={"text-red-500"}>best</span> match creation tool</div>
                        <div className={"text-gray-300 text-base"}>
                            <div>We have created over <span className={"font-semibold"}>{statistics.totalMatches}</span> matches for esports players and teams.</div>
                        </div>
                    </div>
                </div>
                {GitHub && GitHub.SHA && (
                    <div className="border-l-2 border-indigo-600 bg-black-15 text-white py-2 px-4 mx-2 my-6">
                        <FontAwesomeIcon icon={faGithub} /> <span className={"font-semibold"}>Latest Commit: </span> <a href={GitHub.URL} target={"_blank"} rel="noopener noreferrer">{GitHub.SHA}</a> on {GitHub.DATE}
                    </div>
                )}
                <div className={"content my-6"}>
                    <div className={"text-xl mx-2 text-white font-semibold tracking-wide pb-3 mb-3 border-b border-gray-800"}>Supported Games</div>
                    <div className="flex flex-wrap mt-2">
                        {this.supported.map((item) => (
                            <div key={item.key} className={"w-1/3 px-2"}>
                                <a key={item.key} href={item.url}>
                                    <img src={`assets/${item.key}.png`} alt={item.key} className={"w-full h-auto rounded shadow-md border border-transparent transition ease-in-out duration-300 hover:opacity-70"} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={"content my-6"}>
                    <div className={"text-xl mx-2 text-white font-semibold tracking-wide pb-3 mb-3 border-b border-gray-800"}>Recent Matches</div>
                    <div className="flex flex-wrap pt-4 md:pt-0">
                        {matches.map((row: any, key: number) => (
                            <Link key={key} to={`/match/${row.matchHash}`} className="w-full lg:w-1/2 xl:w-1/3 pb-2 md:p-2">
                                <div className="content-mini-bg hover:opacity-70 transition ease-in-out duration-300">
                                    <div>
                                        <span className="font-semibold">{row.matchPlayerOne}</span> vs <span className="font-semibold">{row.matchPlayerTwo}</span>
                                    </div>
                                    <div className="text-gray-500 text-xs">
                                        {row.matchConfig.split(' (')[0]}
                                        <div>
                                            {'('}{row.matchConfig.split(' (')[1]}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;