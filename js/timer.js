app.factory("timer", ["$interval", "sounds",
  function($interval, sounds) {
    return {
      running: false,
      finished: false,
      remaining: 60,

      tick: function(timer) {
        if (timer.remaining > 0) {
          timer.running = true;
          timer.finished = false;
          timer.remaining -= 0.1;
        } else {
          timer.timeUp();
        }
      },

      timeUp: function() {
        this.stop();
        this.finished = true;
        this.remaining = 60;
        sounds.whistle();
      },

      stop: function() {
        this.running = false;
        $interval.cancel(this.ticker);
      }
    };
  }
]);

app.controller("timerController", ["$scope", "$document", "$interval", "timer", "scoreboard",
  function($scope, $document, $interval, timer, scoreboard) {
    $scope.timer = timer;

    $scope.$watch("timer.finished", function() {
      if (timer.finished) {
        scoreboard.timeUp();
      }
    });

    $scope.progressStyle = function() {
      return { width: timer.remaining / 0.6 + "%" };
    };

    $scope.startTimer = function() {
      timer.ticker = $interval(function() { timer.tick(timer) }, 100);
    };

    $document.bind("keypress", function(event) {
      if(event.which === 32) {
        $scope.startTimer();
      }
    });
  }
]);
