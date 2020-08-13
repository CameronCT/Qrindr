import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGamepadAlt} from "@fortawesome/pro-solid-svg-icons";
import FormInput from "../../form/FormInput";
import Config from "../../../Config";

interface GitHubState {
    tree: { sha: string, url: string };
    message: string;
    committer: { date: string }
}

interface BlogRows {
    blogId: number;
    blogThumbnail: string;
    blogTitle: string;
    blogGame: string;
    blogCreated: string;
}

interface MatchRows {
    playerOne: string;
    playerTwo: string;
    matchBestOf: number;
    matchCreated: string;
}

class Home extends Component {

    state = {
        GitHub: {} as GitHubState,
        playerOne: '',
        playerTwo: '',
        matchGame: 0,
        matchCointoss: 0,
        blogs: [] as any,
        matches: [] as any,
        cointoss: [] as any,
        configs: [] as any
    };



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
                    configs: response.Configs,
                    cointoss: response.Cointoss,
                    matches: response.Matches
                })
            });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(formName: string, event: any) {
        this.setState({ [formName]: event.target.value });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        const { state } = this;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state })
        };

        fetch(`http://localhost:3000/Create.php`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    if (data.success !== '') {
                        window.location.href = data.url;
                    }

                    if (data.error !== '')
                        this.setState({ error: data.error });
                }
            });
    }

    render() {
        const { GitHub, blogs, matches, cointoss, configs } = this.state;

        return (
            <div>
                {GitHub && GitHub.tree && GitHub.tree.url && GitHub.tree.sha && GitHub.committer.date && (
                    <div className="border border-blue-900 text-white p-2 mb-4">
                        <span className={"font-bold"}>Latest Commit:</span> <a href={GitHub.tree.url} target={"_blank"} rel="noopener noreferrer">{GitHub.tree.sha}</a> on {GitHub.committer.date}
                    </div>
                )}

                <div className="bg-gray-800 shadow-md p-6">
                    <div className={"pl-2 pb-4 text-xl text-white uppercase font-bold"}>
                        News
                    </div>
                    <div className="flex flex-wrap">
                        {blogs.map((row: any) => (
                            <div className="w-1/2 md:w-1/3 xl:w-1/5 mb-4 xl:mb-0 px-2">
                                <a href={row.blogHref} target={"_blank"} rel="noopener noreferrer">
                                    <img className={"w-full h-auto border-2 border-gray-700"} src={row.blogThumbnail} alt={row.blogTitle} />
                                </a>
                                <div className={"text-white text-sm font-semibold"}>
                                    {row.blogTitle}
                                </div>
                                <div className={"border-b-2 my-2 border-gray-700"} />
                                <div className={"flex text-xs text-gray-500"}>
                                    <div className="w-1/2">
                                        <FontAwesomeIcon icon={faGamepadAlt} className={"text-red-500"} /> {row.blogGame}
                                    </div>
                                    <div className="w-1/2 text-right">
                                        {row.blogCreated}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap mt-6">
                    <div className={"w-full md:w-1/2 lg:w-1/3 md:pr-2"}>
                        <div className={"bg-gray-800 p-6 shadow-md"}>
                            <form method={"post"} onSubmit={this.handleSubmit}>
                                <div className="pb-4 text-2xl text-center font-semibold text-white">
                                    Create Match
                                </div>
                                <div className={"mb-4"}>
                                    <div className="font-semibold text-base text-gray-200">Game</div>
                                    <select className={"w-full p-2 bg-gray-900 border-2 border-gray-800 text-gray-300 placeholder:text-gray-400 focus:border-gray-700 focus:outline-none"} onChange={(e: any) => this.handleChange("matchGame", e)} required>
                                        {configs.map((row: any) => (
                                            <option value={row.configId}>{row.configName}</option>
                                        ))}
                                    </select>
                                </div>
                                <FormInput type="text" name="playerOne" id="You" placeholder="RAIJIN GNiK" className={"mb-4"} onChange={(e: any) => this.handleChange("playerOne", e)} />
                                <FormInput type="text" name="playerTwo" id="Opponent" placeholder="Nemesis dooi" className={"mb-4"} onChange={(e: any) => this.handleChange("playerTwo", e)} />
                                <div className={"mb-4"}>
                                    <div className="font-semibold text-base text-gray-200">First Seed</div>
                                    <select className={"w-full p-2 bg-gray-900 border-2 border-gray-800 text-gray-300 placeholder:text-gray-400 focus:border-gray-700 focus:outline-none"} onChange={(e: any) => this.handleChange("matchCointoss", e)} required>
                                        {cointoss.map((row: any) => (
                                            <option value={row.cointossId}>{row.cointossName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={"text-right"}>
                                    <button type="submit" className={"btn-medium btn-blue"}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={"w-full md:w-1/2 lg:w-2/3 md:pl-2"}>
                        <div className="flex flex-wrap pt-4 md:pt-0">
                            {matches.map((row: any) => (
                                <a href={`/match/${row.matchHash}`} className="w-full xl:w-1/3 pb-2 md:px-1">
                                    <div className="p-3 text-white text-xl bg-gray-800 border-2 border-gray-700 shadow text-center">
                                        <div>
                                            <span className="font-semibold">{row.matchPlayerOne}</span> vs <span className="font-semibold">{row.matchPlayerTwo}</span>
                                        </div>
                                        <div className="text-gray-500 text-xs">{row.matchConfig}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;