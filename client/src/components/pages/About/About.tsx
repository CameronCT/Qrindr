import React, { Component } from 'react';

class About extends Component {

    render() {
        return (
            <div className={"max-w-screen-md mx-auto mt-16"}>
                <div className={"content-bg next"}>
                    <div className={"text-xl text-white font-semibold border-b border-gray-800 pb-3 mb-3"}>About Qrindr</div>
                    <div className={"text-gray-100 text-sm tracking-wide"}>
                        When Quake Pro League was announced in Summer 2019, players have been emulating the formats used by professional players on their streams. For many, this is still being manually done and oftentimes leads to confusion and forgetfulness.

                        Qrindr is designed as a user-friendly system that walks players through both map and champion selection processes. Accounts are unnecessary and player names used are simply for show.
                    </div>
                </div>

                <div className={"content-bg next"}>
                    <div className={"text-xl text-white font-semibold border-b border-gray-800 pb-3 mb-3"}>Frequently Asked Questions</div>
                    <div className={"text-gray-100 text-sm tracking-wide"}>
                        <div className={"mt-3"}>
                            <div className={"font-semibold"}>Can you add [insert map] or [insert modes] for other tournaments?</div>
                            <div>
                                This tool was built as a way for me to easily pick my champions and maps due to the use of typing each picks out at the time was frustrating. With this in mind, the functionality is very static and is hard to modify for all modes and extra maps.
                            </div>
                        </div>

                        <div className={"my-3"}>
                            <div className={"font-semibold"}>Does this app follow all "Tier 1" tournaments (ESL, FACEIT, QPL) veto standards?</div>
                            <div>
                                While the functionality will allow most tournaments to use this system, it is ultimately up to them if they want to use them.
                            </div>
                        </div>

                        <div className={"mt-3"}>
                            <div className={"font-semibold"}>What was Qrindr built with?</div>
                            <div>
                                The app was originally built during one extremely late night and was built very poorly using PHP & AngularJS. It is now being coded with React and PHP. The code is open-sourced!
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"content-bg next"}>
                    <div className={"text-xl text-white font-semibold border-b border-gray-800 pb-3 mb-3"}>Other credits</div>
                    <div className={"text-gray-100 text-sm tracking-wide"}>
                        I want to give a big thanks to <a className="font-semibold text-gray-400" href={"https://xjon.me"}>Jon Lachney</a> for helping with the bleep and boopity sounds for Qrindr!
                    </div>
                </div>
            </div>
        );
    }

}

export default About;