app.controller('HomeController', ['$scope', '$location', '$http', 'toastr', 'md5', function($scope, $location, $http, toastr, md5) {

	$scope.date = new Date();
	$scope.formData = {};

	$scope.getCurrentURL = $location.protocol() + '://' + $location.host();

	$scope.optionsBO = {
		3: 'Best of 3',
		5: 'Best of 5'
	};

	$scope.getStatistics = function() {
		$http.get('api/statistics.php').then(
			function(response) {
				$scope.getStatistics = response.data;
			}
		);
	};
	$scope.getStatistics();

	$scope.getMatches = function() {
		$http.get('api/matches.php').then(
			function(response) {
				$scope.getMatches = response.data;
			}
		);
	};
	$scope.getMatches();

	$scope.onSubmit = function() {

		youPlayer = $scope.formData.player1;
		cointoss = Math.floor(Math.random() * 2);

		if (cointoss == 1) {
			$scope.formData.player1 = $scope.formData.player2;
			$scope.formData.player2 = youPlayer;
		}

		$http.post('api/create.php', { player1: $scope.formData.player1, player2: $scope.formData.player2, bestof: $scope.formData.bestof, pwd: $scope.formData.pwd }).then(
			function(response) {
				console.log(response.data);
				if (response.data.success != null) {
					$location.url('match/' + response.data.success + '/' + md5.createHash($scope.formData.pwd) + '/' + youPlayer);
				} 
				if (response.data.error != null) {
					toastr.error(response.data.error);
				}
			}
		);
		
	}
}]);
