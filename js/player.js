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

    this.switchToPlayer = function(_this) {
      return function(playerNumber) {
        _this.activePlayer = playerNumber;
      };
    }(this);

    this.continue = function(_this) {
      return function() {
        delete _this.buzzedPlayer;
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

    controller: ["$scope", "$document", "players",
      function($scope, $document, players) {
        $scope.player = {
          name: "Player " + $scope.number,
          score: 0
        };

        $scope.class = function() {
          return { active: players.activePlayer === $scope.number };
        };

        $scope.buzzed = function() {
          return players.buzzedPlayer === $scope.number;
        };

        $scope.correctChallenge = function() {
          $scope.player.score++;
          players.switchToPlayer($scope.number);
          players.continue();
        };

        $scope.incorrectChallenge = function() {
          alert("TODO!");
          players.continue();
        };

        $scope.bonus = function() {
          $scope.player.score++;
          players.continue();
        };

        $document.bind("keypress", function(event) {
          if (event.which == $scope.number + 48) {
            players.buzz($scope.number);
          }
        });
      }
    ]
  };
});
