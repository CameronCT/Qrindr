var app = angular.module('MyQrindr', ['ngRoute', 'ngAnimate', 'ngCookies', 'toastr', 'angular-md5']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController', 
            templateUrl: 'views/home.html'
        })
        .when('/play', {
            controller: 'PlayController', 
            templateUrl: 'views/play.html'
        })
        .when('/match/:id/:pwd/:player', {
            controller: 'MatchController', 
            templateUrl: 'views/match.html'
        })
        .when('/match/:id', {
            controller: 'MatchController', 
            templateUrl: 'views/match.html'
        })
        .when('/about', { 
            templateUrl: 'views/about.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.run(['$rootScope', '$http', '$cookieStore', function($rootScope, $http, $cookieStore) {

    $rootScope.config = {
        'name':       'Qrindr',
        'year':       '2019',
    };

    $rootScope.fuckNavigation = false;
    $rootScope.news = 'Welcome to the new update, if there is any bugs feel free to contact GNiK on Discord directly or create an issue in GitHub!';

    $rootScope.getSession = function() {
        $http.get('api/session.php')
            .then(function(response) {
                $rootScope.session = response.data;
            }).catch(function(response) {
                console.log('err');
            }
        );
    };
    $rootScope.getSession();

    if ($cookieStore.get('Speakers') == undefined)
        $cookieStore.put('Speakers', true);

    if ($cookieStore.get('Music') == undefined)
        $cookieStore.put('Music', false);

    $rootScope.getSpeaker = $cookieStore.get('Speakers');
    $rootScope.getMusic = $cookieStore.get('Music');

    $rootScope.setSpeakers = function(theVal) {
        $cookieStore.put('Speakers', theVal);
        $rootScope.getSpeaker = theVal;
    }

    $rootScope.setMusic = function(theVal) {
        $cookieStore.put('Music', theVal);
        $rootScope.getMusic = theVal;

        if (theVal == false)
            document.getElementById('waiting_sound').pause();
    }

}]);

app.filter('urlencode', function() {
    return function(input) {
        return window.encodeURIComponent(input);
    }
});
