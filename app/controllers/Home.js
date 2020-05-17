app.controller('HomeController', ['$rootScope', '$cookieStore', '$scope', '$location', '$http', 'toastr', 'md5', function($rootScope, $cookieStore, $scope, $location, $http, toastr, md5) {

	$scope.date = new Date();
	$scope.formData = {};
	$scope.getQueueTime = 0;

	$scope.getCurrentURL = $location.protocol() + '://' + $location.host();

	/* --------------- Matchmaking --------------- */

	/* Update */
	$scope.getMatchmakingUpdate = function() {
		$http.get('api/matchmaking.php?update=true').then(
			function(response) {
				$scope.getMatchmaking = response.data;

				if (response.data.error != null) 
					toastr.error(response.data.error);
				if (response.data.success != null)
					toastr.success(response.data.success);
				if (response.data.redirect != null) {
					document.getElementById('MatchMaking').style.display = "none";
					document.getElementById('MatchMakingFound').style.display = "block";
					
					if ($cookieStore.get('Speakers') == true)
						playReadySound();

					setTimeout(function() { 
						$location.url('match/' + response.data.redirect); 
					}, 2000);
				}
				if (response.data.queue != 0) {
					$scope.getQueueTime = response.data.queue;
				}
			}
		);
	};
	$scope.getMatchmakingUpdate();
	

	/* Statistics */
	$scope.getMatchMakingStats = function() {
		$http.get('api/matchmaking.php?stats=true').then(
			function(response) {
				$scope.getMatchmakingStatistics = response.data.stats;
			}
		);
	};
	$scope.getMatchMakingStats();

	/* Timers */
	setInterval(
		function() { 
			$scope.getMatchmakingUpdate(); 
			$scope.getMatchMakingStats();
			$rootScope.getSession();
		}, 
	3000);

	/* Leave Queue */
	$scope.exitQueue = function() {
        $http.post('api/matchmaking.php', { remove: $rootScope.session.queueName }).then(
            function(response) {
                if (response.data.error == null) {
					toastr.success(response.data.success);

					if ($cookieStore.get('Speakers') == true)
						playNotificationSound();

					$rootScope.getSession();
                } else if (response.data.success == null) {
                    toastr.error(response.data.error);
                }
            }
        );
	};
	
	/* Join Queue */
	$scope.onQueue = function() {
        $http.post('api/matchmaking.php', { add: $scope.formData.queuePlayer, region: $scope.formData.queueRegion }).then(
            function(response) {
                if (response.data.error == null) {
					toastr.success(response.data.success);

					if ($cookieStore.get('Speakers') == true)
						playNotificationSound();

					$rootScope.getSession();
                } else if (response.data.success == null) {
                    toastr.error(response.data.error);
                }
            }
        );
	};



	/* ------------------------------------------- */


	/* get Matches and Create */
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

		if ($scope.formData.seedings == 0) {
			cointoss = Math.floor(Math.random() * 2);
			if (cointoss == 1) {
				$scope.formData.player1 = $scope.formData.player2;
				$scope.formData.player2 = youPlayer;
			}
		} else if ($scope.formData.seedings == 2) { 
			$scope.formData.player1 = $scope.formData.player2;
			$scope.formData.player2 = youPlayer;
		}

		$http.post('api/create.php', { player1: $scope.formData.player1, player2: $scope.formData.player2, decider: $scope.formData.seedings, bestof: $scope.formData.bestof, format: $scope.formData.format, pwd: $scope.formData.pwd }).then(
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
