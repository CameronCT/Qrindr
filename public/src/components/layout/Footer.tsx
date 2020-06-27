import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="border-t-2 border-gray-800">
                <div className="flex flex-wrap uppercase font-semibold py-4 text-gray-300">
                    <div className="w-1/2">
                        &copy; Qrindr 2020
                    </div>
                    <div className="w-1/2 text-right">
                        Crafted with love by <a href="https://twitter.com/GNiK">GNiK</a>.
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;