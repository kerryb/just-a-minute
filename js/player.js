app.service("players", ["sounds", function(sounds) {
  this.buzz = function(_this) {
    return function(playerNumber) {
      _this.buzzedPlayer = playerNumber;
      sounds.buzz();
    };
  }(this);
}]);

app.directive("player", function() {
  return {
    scope: {
      number: "="
    },

    templateUrl: "player.html",

    controller: function($scope, $document, players) {
      $scope.name = "Player " + $scope.number;

      $scope.class = function() {
        return { buzzed: players.buzzedPlayer === $scope.number };
      };

      $document.bind("keypress", function(event) {
        if (event.which == $scope.number + 48) {
          players.buzz($scope.number);
        }
      });
    }
  };
});
