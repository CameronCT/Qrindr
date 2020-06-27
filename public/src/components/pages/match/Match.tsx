import React, { Component } from 'react';

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

        /*
         * Format Data for Front
         */
        if (Config && Match) {

            let i;
            for (i = 1; i <= Config.totalSteps; i++) {
                if (Data) {
                    /*
                     * Filter Data
                     */
                    if (Config.getSteps[i] == 'map_ban' || Config.getSteps[i] == 'map_ban') {
                        if (Data[i].matchDataStep === i)
                            getRemovedMaps.push(Data[i].matchDataValue);
                    }
                    if (Config.getSteps[i] == 'map_pick' || Config.getSteps[i] == 'map_pick') {
                        if (Data[i].matchDataStep === i)
                            getSelectedMaps.push(Data[i].matchDataValue);
                    }
                    if (Config.getSteps[i] == 'champ_ban' || Config.getSteps[i] == 'champ_ban') {
                        if (Data[i].matchDataStep === i)
                            getRemovedChampions.push(Data[i].matchDataValue);
                    }
                    if (Config.getSteps[i] == 'champ_pick' || Config.getSteps[i] == 'champ_pick') {
                        if (Data[i].matchDataStep === i)
                            getSelectedChampions.push(Data[i].matchDataValue);
                    }

                    /*
                     * Generate HTML
                     */
                    generateHTML += (
                        <div>
                            testing
                        </div>
                    );
                }
            }
        }

        return (
            <div>
                testing generation
                {generateHTML}
            </div>
        )
    }
}

export default Match;