var app = angular.module("justAMinute", []);

app.controller("timerController", ["$scope", "$interval", function($scope, $interval) {
  $scope.timer = {
    remaining: 60,
    progressStyle: function() {
      return { width: this.remaining / 0.6 + "%" };
    }
  };

  $scope.tick = function() {
    $scope.timer.remaining -= 0.1;
  };

  $scope.start = function() {
    $scope.timer.ticker = $interval(this.tick, 100);
  };

  $scope.stop = function() {
    $interval.cancel($scope.timer.ticker);
  };
}]);
