app.directive("player", function() {
  return {
    scope: {
      number: "="
    },

    templateUrl: "player.html",

    controller: ["$scope", "$document", "scoreboard",
      function($scope, $document, scoreboard) {
        scoreboard.registerPlayer($scope.number);

        $scope.player = {
          name: "Player " + $scope.number,
          score: 0
        };

        $scope.class = function() {
          return { active: scoreboard.isActive($scope.number) };
        };

        $scope.score = function() {
          return scoreboard.score($scope.number);
        };

        $scope.buzzed = function() {
          return scoreboard.buzzedPlayer === $scope.number;
        };

        $scope.correctChallenge = function() {
          scoreboard.correctChallenge($scope.number);
        };

        $scope.incorrectChallenge = function() {
          alert("TODO!");
          scoreboard.continue();
        };

        $scope.bonus = function() {
          scoreboard.awardBonus($scope.number);
        };

        $document.bind("keypress", function(event) {
          if (event.which == $scope.number + 48) {
            scoreboard.buzz($scope.number);
          }
        });
      }
    ]
  };
});
