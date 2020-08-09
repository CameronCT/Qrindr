import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGamepadAlt} from "@fortawesome/pro-solid-svg-icons";
import FormInput from "../../form/FormInput";

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
        matchSecret: '',
        matchCointoss: 0,
    };

    blogs = [
        {
            blogId: 0,
            blogThumbnail: `https://images.ctfassets.net/rporu91m20dc/4ZIIRBz1xqsLCqvwgFRSC1/bb758e0f5ab9c29fdcee17eca4ae9d63/QC_QPL_HERO_1920x870.jpg?w=380&h=210&fit=thumb`,
            blogTitle: `Quake World Championships - Day Three`,
            blogHref: 'https://quake.com',
            blogGame: 'Quake',
            blogCreated: `Aug 9, 2020`
        },
        {
            blogId: 0,
            blogThumbnail: `https://images.ctfassets.net/rporu91m20dc/4ZIIRBz1xqsLCqvwgFRSC1/bb758e0f5ab9c29fdcee17eca4ae9d63/QC_QPL_HERO_1920x870.jpg?w=380&h=210&fit=thumb`,
            blogTitle: `Quake World Championships - Day Two`,
            blogHref: 'https://quake.com',
            blogGame: 'Quake',
            blogCreated: `Aug 8, 2020`
        },
        {
            blogId: 0,
            blogThumbnail: `https://images.ctfassets.net/rporu91m20dc/4ZIIRBz1xqsLCqvwgFRSC1/bb758e0f5ab9c29fdcee17eca4ae9d63/QC_QPL_HERO_1920x870.jpg?w=380&h=210&fit=thumb`,
            blogTitle: `Quake World Championships - Day One`,
            blogHref: 'https://quake.com',
            blogGame: 'Quake',
            blogCreated: `Aug 7, 2020`
        },
        {
            blogId: 0,
            blogThumbnail: `https://i.ytimg.com/vi/YTQelhNvjSE/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAIfTYH9wEe4QbMzn6tn87AU4r14w`,
            blogTitle: `Diabotical Closed Beta Dates - Aug 10, 2020`,
            blogHref: 'https://quake.com',
            blogGame: 'Diabotical',
            blogCreated: `Aug 4, 2020`
        },
        {
            blogId: 0,
            blogThumbnail: `https://images.ctfassets.net/rporu91m20dc/4ZIIRBz1xqsLCqvwgFRSC1/bb758e0f5ab9c29fdcee17eca4ae9d63/QC_QPL_HERO_1920x870.jpg?w=380&h=210&fit=thumb`,
            blogTitle: `Quake World Championships - Details`,
            blogHref: 'https://quake.com',
            blogGame: 'Quake',
            blogCreated: `Aug 2, 2020`
        }
    ];

    configs = [
        {
            configId: 0,
            configName: 'Quake Champions - Timelimit Duel (Best of 3)',
        },
        {
            configId: 1,
            configName: 'Quake Champions - Timelimit Duel (Best of 5)',
        },
        {
            configId: 2,
            configName: 'Diabotical - Duel (Best of 3)',
        }
    ];

    cointoss = [
        {
            cointossId: 0,
            cointossName: 'Random',
        },
        {
            cointossId: 1,
            cointossName: 'You',
        },
        {
            cointossId: 2,
            cointossName: 'Opponent',
        },
    ];

    matches = [
        {
            matchId: 0,
            matchHash: 'alsl20dfkj2f0dfk20la',
            matchPlayerOne: 'GNiK',
            matchPlayerTwo: 'rapha',
            matchConfig: 'Quake Champions - Timelimit Duel (Best of 3)',
            matchCreated: 'Aug 9, 2020'
        },
        {
            matchId: 0,
            matchHash: 'alsl20dfkj2f0dfk20la',
            matchPlayerOne: 'GNiK',
            matchPlayerTwo: 'rapha',
            matchConfig: 'Quake Champions - Timelimit Duel (Best of 3)',
            matchCreated: 'Aug 9, 2020'
        },
        {
            matchId: 0,
            matchHash: 'alsl20dfkj2f0dfk20la',
            matchPlayerOne: 'GNiK',
            matchPlayerTwo: 'rapha',
            matchConfig: 'Quake Champions - Timelimit Duel (Best of 3)',
            matchCreated: 'Aug 9, 2020'
        },
        {
            matchId: 0,
            matchHash: 'alsl20dfkj2f0dfk20la',
            matchPlayerOne: 'GNiK',
            matchPlayerTwo: 'rapha',
            matchConfig: 'Quake Champions - Timelimit Duel (Best of 3)',
            matchCreated: 'Aug 9, 2020'
        },
    ]

    componentDidMount() {
        fetch('https://api.github.com/repos/CameronCT/Qrindr/commits/v3')
            .then(response => response.json())
            .then(response => {
                this.setState({ GitHub: response.commit })
            });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(formName: string, event: any) {
        this.setState({ [formName]: event.target.value });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        console.log(this.state);

        /* perform cointoss stuff here */
    /*
        const { state } = this;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        };
*/
    }

    render() {
        const { GitHub } = this.state;

        return (
            <div>
                {GitHub && GitHub.tree && GitHub.tree.url && GitHub.tree.sha && GitHub.committer.date && (
                    <div className="border border-blue-900 text-white p-2 mb-4">
                        <span className={"font-bold"}>Latest Commit:</span> <a href={GitHub.tree.url} target={"_blank"}>{GitHub.tree.sha}</a> on {GitHub.committer.date}
                    </div>
                )}

                <div className="bg-gray-800 shadow-md p-6">
                    <div className={"pl-2 pb-4 text-xl text-white uppercase font-bold"}>
                        News
                    </div>
                    <div className="flex flex-wrap">
                        {this.blogs.map((row) => (
                            <div className="w-1/2 md:w-1/3 xl:w-1/5 mb-4 xl:mb-0 px-2">
                                <a href={row.blogHref} target={"_blank"}>
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
                                    <select className={"w-full p-2 bg-gray-900 border-2 border-gray-800 text-gray-300 placeholder:text-gray-400 focus:border-gray-700 focus:outline-none"} onChange={(e: any) => this.handleChange("matchConfig", e)} required>
                                        {this.configs.map((row) => (
                                            <option value={row.configId}>{row.configName}</option>
                                        ))}
                                    </select>
                                </div>
                                <FormInput type="text" name="playerOne" id="You" placeholder="RAIJIN GNiK" className={"mb-4"} onChange={(e: any) => this.handleChange("playerOne", e)} />
                                <FormInput type="text" name="playerTwo" id="Opponent" placeholder="Nemesis dooi" className={"mb-4"} onChange={(e: any) => this.handleChange("playerTwo", e)} />
                                <div className={"mb-4"}>
                                    <div className="font-semibold text-base text-gray-200">First Seed</div>
                                    <select className={"w-full p-2 bg-gray-900 border-2 border-gray-800 text-gray-300 placeholder:text-gray-400 focus:border-gray-700 focus:outline-none"} onChange={(e: any) => this.handleChange("matchCointoss", e)} required>
                                        {this.cointoss.map((row) => (
                                            <option value={row.cointossId}>{row.cointossName}</option>
                                        ))}
                                    </select>
                                </div>
                                <FormInput type="password" name="playerTwo" id="Passphrase" placeholder="**************" className={"mb-4"} onChange={(e: any) => this.handleChange("matchSecret", e)} />
                                <div className={"text-right"}>
                                    <button type="submit" className={"btn-medium btn-blue"}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={"w-full md:w-1/2 lg:w-2/3 md:pl-2"}>
                        <div className="flex flex-wrap pt-4 md:pt-0">
                            {this.matches.map((row) => (
                                <a href="/" className="w-full xl:w-1/3 pb-2 md:px-1">
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