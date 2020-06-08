module.exports = {
    'HttpPort': 8000,

    'Session': { secret: 'my_secret_key' },
    'JWT': { 'key': 'my_secret_jwt_key', 'expiryMin': ((24 * (60 * 60)) * 7), 'expiryMax': ((24 * (60 * 60)) * 30) },

    'OAUTH': {
        'Discord': {
            'Client': '',
            'Secret': '',
            'Redirect': '',
        },
        'Google': {
            'Client': '',
            'Secret': '',
            'Redirect': '',
        },
        'Facebook': {
            'Client': '',
            'Secret': '',
            'Redirect': '',
        },
    },
    'MariaDB': {
        'Host': 'localhost',
        'Name': 'qrindr',
        'User': 'root',
        'Pass': ''
    },

};