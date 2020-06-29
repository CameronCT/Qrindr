import React, { Component } from 'react';
import ReactHtmlParser from "react-html-parser";

interface IPropsMatch {
    params: any;
}

interface IProps {
    match?: IPropsMatch;
}

interface IStateData {
    Config: any;
    Match: any;
    Data: any;
    isAuthenticated: boolean;
}

interface IState {
    data: IStateData;
}

class Match extends Component<IProps, IState> {

    state:IState = {
        data: {} as IStateData
    }

    componentDidMount() {
        fetch('/getMatch?matchHash=83eca00ce606817c943db89b7c3f645473a02f8e&playerName=GNiK&secret=test')
            .then(response => response.json())
            .then(response => this.setState(response))


    }

    isEven(n: number) {
        return n % 2 == 0;
    }

    render() {
        const { Config, Match, Data, isAuthenticated } = this.state.data;

        /*
         * Create Data to Take From
         */
        let generateHTML            = "";
        let generateSubHTML         = "";
        let getSelectedChampions    = [];
        let getSelectedMaps         = [];
        let getRemovedChampions     = [];
        let getRemovedMaps          = [];
        let getCurrentStep          = 1;
        let getCurrentPlayer        = "";

        /*
         * Format Data for Front
         */
        if (Config && Match) {

            let i;
            for (i = 1; i <= Config.totalSteps; i++) {
                let iArray:number = (i - 1);
                let iSteps:number = (i);

                if (Data[iArray]) {
                    /*
                     * Get Player
                     * (Odd #: 1, 3, 5) = Player1
                     * (Even #: 2, 4, 6) = Player2
                     */
                    getCurrentPlayer = Match.player1;
                    if (this.isEven(getCurrentStep)) {
                        getCurrentPlayer = Match.player2;
                    }

                    /*
                     * Filter Data
                     */
                    if (Data[iArray]) {
                        if (Config.getSteps[i] == 'map_ban' || Config.getSteps[i] == 'map_ban') {
                            if (Data[iArray].matchDataStep === i)
                                getRemovedMaps.push(Data[iArray].matchDataValue);
                        }
                        if (Config.getSteps[i] == 'map_pick' || Config.getSteps[i] == 'map_pick') {
                            if (Data[iArray].matchDataStep === i)
                                getSelectedMaps.push(Data[iArray].matchDataValue);
                        }
                        if (Config.getSteps[i] == 'champ_ban' || Config.getSteps[i] == 'champ_ban') {
                            if (Data[iArray].matchDataStep === i)
                                getRemovedChampions.push(Data[iArray].matchDataValue);
                        }
                        if (Config.getSteps[i] == 'champ_pick' || Config.getSteps[i] == 'champ_pick') {
                            if (Data[iArray].matchDataStep === i)
                                getSelectedChampions.push(Data[iArray].matchDataValue);
                        }
                    }

                    /*
                     * Generate HTML
                     * if: Step has already been performed
                     */
                    if (Data[iArray]) {
                        generateHTML += `
                        <div class="step step--regular">
                            <span>${Data[iArray].matchDataPlayer}</span> performed ${Config.getSteps[i]}
                        </div>
                    `;
                    } else {
                        generateHTML += `
                        <div class="step step--regular">
                            <span>${Data[iArray].matchDataPlayer}</span> has to create step
                        </div>
                    `;
                    }

                    /*
                     * Generate HTML
                     * if: step hasn't been performed
                     */
                    getCurrentStep++;
                } else if (!Data[iArray]) {
                    /*
                     * Generate HTML
                     * if: Step has already been performed
                     */
                    generateHTML += `
                        <div>
                            player needs to perform a step ${i}
                        </div>
                    `;
                }
            }
        }

        return (
            <div>
                testing generation
                { ReactHtmlParser(generateHTML) }
            </div>
        )
    }
}

export default Match;