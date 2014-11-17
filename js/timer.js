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

app.controller("timerController", ["$scope", "$document", "timer",
  function($scope, $document, timer) {
    $scope.timer = timer;

    $document.bind("keypress", function(event) {
      if(event.which === 32) {
        timer.start();
      }
    });
  }
]);
