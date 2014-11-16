var app = angular.module("justAMinute", ["xeditable", "ngAudio"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.controller("timerController", ["$scope", "$interval", "ngAudio",
  function($scope, $interval, ngAudio) {
    $scope.whistle = ngAudio.load("media/whistle.wav");
    $scope.timer = {
      remaining: 60,
      progressStyle: function() {
        return { width: this.remaining / 0.6 + "%" };
      }
    };

    $scope.tick = function() {
      if ($scope.timer.remaining > 0.1) {
        $scope.timer.remaining -= 0.1;
      } else {
        $scope.timeUp();
      }
    };

    $scope.timeUp = function() {
      $scope.stop();
      $scope.whistle.play();
    };

    $scope.start = function() {
      $scope.timer.ticker = $interval(this.tick, 100);
    };

    $scope.stop = function() {
      $interval.cancel($scope.timer.ticker);
    };
  }
]);

app.directive("player",function() {
  return {
    scope: {
      name: "@"
    },
    templateUrl: "player.html"
  };
});
