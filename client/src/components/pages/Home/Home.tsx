import React, { Component } from 'react';

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

    blogs = [
        {
            blogId: 0,
            blogThumbnail: `https://images.ctfassets.net/rporu91m20dc/4ZIIRBz1xqsLCqvwgFRSC1/bb758e0f5ab9c29fdcee17eca4ae9d63/QC_QPL_HERO_1920x870.jpg?w=380&h=210&fit=thumb`,
            blogTitle: `Quake World Championships - Day Three`,
            blogGame: 'Quake',
            blogCreated: `Aug 9, 2020`
        },
        {
            blogId: 0,
            blogThumbnail: `https://images.ctfassets.net/rporu91m20dc/4ZIIRBz1xqsLCqvwgFRSC1/bb758e0f5ab9c29fdcee17eca4ae9d63/QC_QPL_HERO_1920x870.jpg?w=380&h=210&fit=thumb`,
            blogTitle: `Quake World Championships - Day Two`,
            blogGame: 'Quake',
            blogCreated: `Aug 8, 2020`
        },
        {
            blogId: 0,
            blogThumbnail: `https://images.ctfassets.net/rporu91m20dc/4ZIIRBz1xqsLCqvwgFRSC1/bb758e0f5ab9c29fdcee17eca4ae9d63/QC_QPL_HERO_1920x870.jpg?w=380&h=210&fit=thumb`,
            blogTitle: `Quake World Championships - Day One`,
            blogGame: 'Quake',
            blogCreated: `Aug 7, 2020`
        },
        {
            blogId: 0,
            blogThumbnail: `https://i.ytimg.com/vi/YTQelhNvjSE/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAIfTYH9wEe4QbMzn6tn87AU4r14w`,
            blogTitle: `Diabotical Closed Beta Dates - Aug 10, 2020`,
            blogGame: 'Diabotical',
            blogCreated: `Aug 4, 2020`
        },
        {
            blogId: 0,
            blogThumbnail: `https://images.ctfassets.net/rporu91m20dc/4ZIIRBz1xqsLCqvwgFRSC1/bb758e0f5ab9c29fdcee17eca4ae9d63/QC_QPL_HERO_1920x870.jpg?w=380&h=210&fit=thumb`,
            blogTitle: `Quake World Championships - Details`,
            blogGame: 'Quake',
            blogCreated: `Aug 2, 2020`
        }
    ];

    render() {
        return (
            <div>
                <div className="bg-gray-800 p-6">
                    <div className="flex flex-wrap">
                        {this.blogs.map((row) => (
                            <div className="w-1/5 px-2">
                                <a href="#">
                                    <img className={"w-full h-auto border border-gray-800"} src={row.blogThumbnail} alt={row.blogTitle} />
                                </a>
                                <div className={"text-white text-sm font-semibold"}>
                                    {row.blogTitle}
                                </div>
                                <div className={"border-b-2 my-2 border-gray-700"} />
                                <div className={"flex text-xs text-gray-500"}>
                                    <div className="w-1/2">
                                        {row.blogGame}
                                    </div>
                                    <div className="w-1/2 text-right">
                                        {row.blogCreated}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className={"w-full lg:w-3/5"}>
                        Form
                    </div>
                    <div className={"w-full lg:w-2/5"}>
                        Form
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;