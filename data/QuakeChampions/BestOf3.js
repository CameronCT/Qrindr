'use strict';
module.exports = function() {
    return {
        totalSteps: function () {
            return 16;
        },
        getSteps: function() {
            let steps = {
                1: 'map_ban',
                2: 'map_ban',
                3: 'map_pick',
                4: 'map_pick',
                5: 'map_ban',
                6: 'map_ban',
                7: 'map_ban',
                8: 'champ_ban',
                9: 'champ_pick',
                10: 'champ_pick',
                11: 'champ_ban',
                12: 'champ_pick',
                13: 'champ_pick',
                14: 'champ_ban',
                15: 'champ_pick',
                16: 'champ_pick'
            };
            return steps;
        },
        getChampions: function() {
            let champions = {
                1: { name: 'Nyx', abbreviation: 'Nyx' },
                2: { name: 'Anarki', abbreviation: 'Anarki' },
                3: { name: 'Slash', abbreviation: 'Slash' },
                4: { name: 'Athena', abbreviation: 'Athena' },
                5: { name: 'Visor', abbreviation: 'Visor' },
                6: { name: 'Ranger', abbreviation: 'Ranger' },
                7: { name: 'Galena', abbreviation: 'Galena' },
                8: { name: 'B.J. Blazkowicz', abbreviation: 'BJ Blazk' },
                9: { name: 'Doom Slayer', abbreviation: 'Doom' },
                10: { name: 'Strogg & Peeker', abbreviation: 'Strogg' },
                11: { name: 'Death Knight', abbreviation: 'DK' },
                12: { name: 'Eisen', abbreviation: 'Eisen' },
                13: { name: 'Scalebearer', abbreviation: 'Scalebearer' },
                14: { name: 'Sorlag', abbreviation: 'Sorlag' },
                15: { name: 'Keel', abbreviation: 'Keel' },
            };
            return champions;
        },
        getMaps: function() {
            let maps = {
                1: { name: 'Awoken', abbreviation: 'Awoken' },
                2: { name: 'Blood Covenant', abbreviation: 'BC/DM6' },
                3: { name: 'Blood Run', abbreviation: 'BR/ZTN' },
                4: { name: 'Corrupted Keep', abbreviation: 'CK' },
                5: { name: 'Ruins of Sarnath', abbreviation: 'Ruins' },
                6: { name: 'Molten Falls', abbreviation: 'Molten' },
                7: { name: 'Vale of Pnath', abbreviation: 'Vale' },
                8: { name: 'Tower of KOTH', abbreviation: 'TOK' },
            };
            return maps;
        }
    }
};



