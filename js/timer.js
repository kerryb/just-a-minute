app.service("timer", ["$interval", "sounds", function($interval, sounds) {
  this.running = false;
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
      _this.running = true;
      _this.ticker = $interval(_this.tick, 100);
    };
  }(this);

  this.stop = function(_this) {
    return function() {
      _this.running = false;
      $interval.cancel(_this.ticker);
    };
  }(this);
}]);

app.controller("timerController", ["$scope", "$document", "timer",
  function($scope, $document, timer) {
    $scope.timer = timer;

    $scope.progressStyle = function() {
      return { width: timer.remaining / 0.6 + "%" };
    };

    $document.bind("keypress", function(event) {
      if(event.which === 32) {
        timer.start();
      }
    });
  }
]);
