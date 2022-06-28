import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = () => {
    return (
        <div className={"flex create-screen"}>
            <div className={"m-auto"}><FontAwesomeIcon icon={faSpinner} className={"fa-8x text-red-500"} spin /></div>

        </div>
    )
}

export default LoadingSpinner;