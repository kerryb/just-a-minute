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

app.service("timer", [function() {
  this.remaining = 60;

  this.progressStyle = function() {
    return { width: this.remaining / 0.6 + "%" };
  }
}]);

app.controller("timerController", ["$scope", "$interval", "timer", "sounds",
  function($scope, $interval, timer, sounds) {

    $scope.timer = timer;

    $scope.tick = function() {
      if (timer.remaining >= 0.1) {
        timer.remaining -= 0.1;
      } else {
        timer.remaining = 0;
        $scope.timeUp();
      }
    };

    $scope.timeUp = function() {
      $scope.stop();
      sounds.whistle();
    };

    $scope.start = function() {
      timer.ticker = $interval(this.tick, 100);
    };

    $scope.stop = function() {
      $interval.cancel(timer.ticker);
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
