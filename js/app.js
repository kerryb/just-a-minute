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

app.service("timer", ["$interval", "sounds", function($interval, sounds) {
  this.remaining = 60;

  this.tick = function(_this) {
    return function() {
      if (_this.remaining > 0) {
        _this.remaining -= 0.1;
      } else {
        _this.timeUp();
      }
    };
  }(this);

  this.timeUp = function(_this) {
    return function() {
      _this.stop();
      sounds.whistle();
    };
  }(this);

  this.start = function(_this) {
    return function() {
      _this.ticker = $interval(_this.tick, 100);
    };
  }(this);

  this.stop = function(_this) {
    return function() {
      $interval.cancel(_this.ticker);
    };
  }(this);

  this.progressStyle = function(_this) {
    return function() {
      return { width: _this.remaining / 0.6 + "%" };
    };
  }(this);
}]);

app.controller("timerController", ["$scope", "$interval", "timer", "sounds",
  function($scope, $interval, timer, sounds) {
    $scope.timer = timer;
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
