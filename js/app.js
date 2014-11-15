var app = angular.module("justAMinute", ["xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.controller("timerController", ["$scope", "$interval", function($scope, $interval) {
  $scope.timer = {
    remaining: 60,
    progressStyle: function() {
      return { width: this.remaining / 0.6 + "%" };
    }
  };

  $scope.tick = function() {
    $scope.timer.remaining -= 0.1;
    if ($scope.timer.remaining <= 0) {
      $scope.stop();
    }
  };

  $scope.start = function() {
    $scope.timer.ticker = $interval(this.tick, 100);
  };

  $scope.stop = function() {
    $interval.cancel($scope.timer.ticker);
  };
}]);

app.directive("player",function() {
  return {
    scope: {
      name: "@"
    },
    templateUrl: "player.html"
  };
});
