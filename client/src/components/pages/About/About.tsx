import React, { Component } from 'react';

class About extends Component {

    render() {
        return (
            <div className={"max-w-screen-md mx-auto"}>
                <div className={"text-center pb-10"}>
                    <div className={"text-3xl text-white font-semibold"}>About Qrindr</div>
                    <div className={"border-b w-48 mx-auto border-white my-6"} />
                    <div className={"text-gray-100 text-lg"}>
                        When Quake Pro League was announced in Summer 2019, players have been emulating the formats used by professional players on their streams. For many, this is still being manually done and oftentimes leads to confusion and forgetfulness.

                        Qrindr is designed as a user-friendly system that walks players through both map and champion selection processes. Accounts are unnecessary and player names used are simply for show.
                    </div>
                </div>

                <div className={"text-center pt-10"}>
                    <div className={"text-3xl text-white font-semibold"}>Frequently Asked Questions</div>
                    <div className={"border-b w-48 mx-auto border-white my-6"} />
                    <div className={"text-gray-100 text-lg"}>
                        <div className={"mb-6"}>
                            <div className={"font-semibold"}>Can you add [insert map] or [insert modes] for other tournaments?</div>
                            <div>
                                This tool was built as a way for me to easily pick my champions and maps due to the use of typing each picks out at the time was frustrating. With this in mind, the functionality is very static and is hard to modify for all modes and extra maps.
                            </div>
                        </div>

                        <div className={"mb-6"}>
                            <div className={"font-semibold"}>Does this app follow all "Tier 1" tournaments (ESL, FACEIT, QPL) veto standards?</div>
                            <div>
                                While the functionality will allow most tournaments to use this system, it is ultimately up to them if they want to use them.
                            </div>
                        </div>

                        <div className={"mb-6"}>
                            <div className={"font-semibold"}>What was Qrindr built with?</div>
                            <div>
                                The app was originally built during one extremely late night and was built very poorly using PHP & AngularJS. It is now being coded with React and PHP. The code is open-sourced!
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"text-center py-10"}>
                    <div className={"text-3xl text-white font-semibold"}>Credits</div>
                    <div className={"border-b w-48 mx-auto border-white my-6"} />
                    <div className={"text-gray-100 text-lg"}>
                        I want to give a big thanks to <a className="font-semibold text-gray-400" href={"https://xjon.me"}>Jon Lachney</a> for helping with the bleep and boopity sounds for Qrindr!
                    </div>
                </div>
            </div>
        );
    }

}

export default About;