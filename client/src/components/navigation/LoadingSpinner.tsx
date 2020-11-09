import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinnerThird} from "@fortawesome/pro-duotone-svg-icons";

class LoadingSpinner extends Component {
    render() {
        return (
            <div className={"flex create-screen"}>
                <div className={"m-auto"}><FontAwesomeIcon icon={faSpinnerThird} className={"fa-8x text-red-500"} spin /></div>

            </div>
        )
    }
}

export default LoadingSpinner;