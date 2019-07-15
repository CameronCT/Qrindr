function playNotificationSound() {
    document.getElementById('notification_sound').play();
}

function playChatSound() {
    document.getElementById('chat_sound').play();
}

app.controller('MatchController', ['$scope', '$cookieStore', '$routeParams', '$http', '$location', 'toastr', function($scope, $cookieStore, $routeParams, $http, $location, toastr) {



    var firstLoad       = true;
    var firstLoadChat   = true;

    $scope.formData = {};
    $scope.getCurrentURL = $location.protocol() + '://' + $location.host();
    $scope.player = $routeParams.player;
    $scope.pwd = $routeParams.pwd;
    $scope.chats = {};
    var oldUpdated = 0;

    $scope.getMatch = function() {
        UUID = $routeParams.id;

        newString = "";
        if ($routeParams.player != null && $routeParams.pwd != null)
            newString = '&player=' + $routeParams.player + '&pwd=' + $routeParams.pwd;
        
        $http.get('api/pull.php?id=' + UUID + newString).then(
            function(response) {
                if (response.data.error == null) {
                    if ($scope.updated != response.data.data.updated) {
                        oldUpdated = $scope.updated;
                        $scope.match = response.data.data;
                        $scope.champions = response.data.champions;
                        $scope.champions_veto = response.data.champions_veto;
                        $scope.maps = response.data.maps;
                        $scope.maps_veto = response.data.maps_veto;
                        $scope.updated = response.data.data.updated;

                        if (firstLoad == false && $scope.player && oldUpdated != $scope.updated && $cookieStore.get('Speakers') == true) {
                            playNotificationSound();
                        }
                        
                        firstLoad = false; 
                    }
                } else {
                    $location.url("/");
                }
            }
        );
    };

    $scope.resetMatch = function() {

        let r = confirm('Are you sure you want to reset this match?');
        if (r == true) {
            $http.post('api/reset.php', { uuid: $routeParams.id, pwd: $routeParams.pwd }).then(
                function(response) {
                    if (response.data.error != null) {
                        toastr.error(response.data.error);
                    } 
                    if (response.data.success != null) {
                        $scope.getMatch();
                    }
                }
            );
        }
    };

    $scope.resetChat = function() {
        setTimeout(function(){  
            var objDiv = document.getElementById("chat");
            objDiv.scrollTop = objDiv.scrollHeight; 
        }, 1);
    };

    $scope.getChat = function() {
        $http.get('api/chat.php?type=view&uuid=' + $routeParams.id).then(
            function(response) {
                if (response.data.error == null) {
                    if ($scope.chats.length == undefined || response.data.data.length > $scope.chats.length) {
                        $scope.chats = response.data.data;
                        $scope.resetChat();

                        if (firstLoadChat == false && $scope.player && $scope.chats.length != 0 && $cookieStore.get('Speakers') == true) {
                            playChatSound();
                        }
                        
                        firstLoadChat = false;
                    }
                }
            }
        );
    };

    $scope.submitChat = function() {
        $('#chatmsg').val('');
        $scope.postChat.$setPristine();
        $http.post('api/chat.php?type=post&uuid=' + $routeParams.id, { uuid: $routeParams.id, player: $scope.player, chatmessage: $scope.chat, pwd: $scope.pwd }).then(
            function(response) {
                if (response.data.error == null) {
                    setTimeout(function(){  
                        $scope.getChat();
                    }, 1);
                    $scope.resetChat();
                } else {
                    toastr.error(response.data.error);
                }
            }
        );
    };

    $scope.onSubmit = function(id, status, picktype) {
        $http.post('api/match.php', { uuid: $routeParams.id, pwd: $routeParams.pwd, status: status, id: id, pick: parseInt($scope.formData.pick, 10), type: picktype }).then(
            function(response) {
                if (response.data.error != null) {
                    toastr.error(response.data.error);
                } 
                if (response.data.success != null) {
                    $scope.getMatch();
                }
            }
        );
    };

    $scope.getMatch();
    $scope.getChat();
    setInterval(function(){
        $scope.getMatch();
        $scope.getChat();
    }, 5000); 

    $scope.resetChat();
}]);