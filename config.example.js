module.exports = {
    'HttpPort': 8000,

    'Session': { secret: 'my_secret_key' },
    'JWT': { 'key': 'my_secret_jwt_key', 'expiryMin': ((24 * (60 * 60)) * 7), 'expiryMax': ((24 * (60 * 60)) * 30) },

    'BASE_URL': 'localhost:3000',
    'API_URL': 'localhost:8000',

    'OAUTH': {
        'Discord': {
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