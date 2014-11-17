var app = angular.module("justAMinute", ["xeditable", "ngAudio"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.service("sounds", ["ngAudio", function(ngAudio) {
  this._whistle = ngAudio.load("media/whistle.wav");
  this.whistle = function() {
    this._whistle.play();
  };
}]);

app.controller("timerController", ["$scope", "$interval", "sounds",
  function($scope, $interval, sounds) {
    $scope.timer = {
      remaining: 60,
      progressStyle: function() {
        return { width: this.remaining / 0.6 + "%" };
      }
    };

    $scope.tick = function() {
      if ($scope.timer.remaining >= 0.1) {
        $scope.timer.remaining -= 0.1;
      } else {
        $scope.timer.remaining = 0;
        $scope.timeUp();
      }
    };

    $scope.timeUp = function() {
      $scope.stop();
      sounds.whistle();
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
