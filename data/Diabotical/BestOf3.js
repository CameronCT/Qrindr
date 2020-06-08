'use strict';
module.exports = function() {
    return {
        totalSteps: function () {
            return 6;
        },
        getSteps: function() {
            let steps = {
                1: 'map_ban',
                2: 'map_ban',
                3: 'map_pick',
                4: 'map_pick',
                5: 'map_ban',
                6: 'map_ban',
            };
            return steps;
        },
        getMaps: function() {
            let maps = {
                1: { name: 'Wellspring', abbreviation: 'Wellspring' },
                2: { name: 'Bioplant', abbreviation: 'Bioplant' },
                3: { name: 'F1sks House', abbreviation: 'F1sks' },
                4: { name: 'Outpost Dunia', abbreviation: 'Outpost' },
                5: { name: 'Placeholder 5', abbreviation: 'P5' },
                6: { name: 'Placeholder 6', abbreviation: 'P6' },
                7: { name: 'Placeholder 7', abbreviation: 'P7' },
            };
            return maps;
        }
    }
};



