app.service("scoreboard", ["sounds", "timer",
  function(sounds, timer) {
    this.activePlayer = 1;

    this.buzz = function(_this) {
      return function(playerNumber) {
        if (!_this.buzzedPlayer) {
          _this.buzzedPlayer = playerNumber;
          timer.stop();
          sounds.buzz();
        };
      };
    }(this);

    this.switchToPlayer = function(_this) {
      return function(playerNumber) {
        _this.activePlayer = playerNumber;
      };
    }(this);

    this.continue = function(_this) {
      return function() {
        delete _this.buzzedPlayer;
      };
    }(this);
  }
]);

