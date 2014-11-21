app.service("players", ["sounds", "timer",
  function(sounds, timer) {
    this.activePlayer = 1;

    this.buzz = function(_this) {
      return function(playerNumber) {
        if (!_this.buzzedPlayer) {
          _this.buzzedPlayer = playerNumber;
          timer.stop();
          sounds.buzz();
        };
      };
    }(this);
  }
]);

app.directive("player", function() {
  return {
    scope: {
      number: "="
    },

    templateUrl: "player.html",

    controller: function($scope, $document, players) {
      $scope.player = {
        name: "Player " + $scope.number,
        score: 0
      };

      $scope.active = function() {
        return players.activePlayer === $scope.number;
      };

      $scope.buzzed = function() {
        return players.buzzedPlayer === $scope.number;
      };

      $document.bind("keypress", function(event) {
        if (event.which == $scope.number + 48) {
          players.buzz($scope.number);
        }
      });
    }
  };
});
