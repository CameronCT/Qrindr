import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className="my-6 text-gray-100 text-center">
                <h1 className="text-3xl font-semibold text-center py-2">About Qrindr</h1>
                <div className="my-2 border-t-2 border-gray-500 mx-auto w-1/5"></div>
                <div className="w-2/4 mx-auto py-2">
                    When Quake Pro League was announced in Summer 2019, players have been emulating the formats used by professional players on their streams. For many, this is still being manually done and oftentimes leads to confusion and forgetfulness.

                    <div className="mt-4">
                        Qrindr is designed as a userfriendly system that walks players through both map and champion selection processes. Accounts are unnecessary and player names used are simply for show.
                    </div>
                </div>

                <h1 className="text-3xl font-semibold text-center py-2 mt-10">Frequently Asked Questions</h1>
                <div className="my-2 border-t-2 border-gray-500 mx-auto w-1/5"></div>
                <div className="w-2/4 mx-auto py-2 text-center">
                    <div className="font-semibold">Can you add [insert map] or [insert modes] for other tournaments?</div>
                    This tool was built as a way for me to easily pick my champions and maps due to the use of typing each picks out at the time was frustrating. With this in mind, the functionality is very static and is hard to modify for all modes and extra maps.

                    <div className="font-semibold mt-8">Does this app follow all "Tier 1" tournaments (ESL, FACEIT, QPL) veto standards?</div>
                    While the functionality will allow most tournaments to use this system, it is ultimately up to them if they want to use them.

                    <div className="font-semibold mt-8">What was Qrindr built with?</div>
                    The app was originally built during one extremely late night and was built very poorly using PHP &amp; AngularJS. However it is now built using NodeJS and React. The code is completely open source!

                </div>
            </div>
        )
    }
}

export default About;