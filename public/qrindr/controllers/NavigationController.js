app.controller('NavigationController', ['$scope', '$http', function($scope, $http) {
    $scope.gitCommits = function() {
        $http.get('https://api.github.com/repos/CameronCT/Qrindr/commits'.then(
            function success(response) {
                console.log(response);
            }, function error(response) {
                console.log(response);
            }
        ));
    }
}]);