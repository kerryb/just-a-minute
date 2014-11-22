app.service("scoreboard", ["sounds", "timer",
  function(sounds, timer) {
    return {
      activePlayer: 1,
      players: {},

      registerPlayer: function(playerNumber) {
        this.players[playerNumber] = {
          name: "Player " + playerNumber,
          score: 0
        };
      },

      isActive: function(playerNumber) {
        return this.activePlayer === playerNumber;
      },

      buzz: function(playerNumber) {
        if (!this.buzzedPlayer) {
          this.buzzedPlayer = playerNumber;
          timer.stop();
          sounds.buzz();
        };
      },

      switchToPlayer: function(playerNumber) {
        this.activePlayer = playerNumber;
      },

      continue: function() {
        delete this.buzzedPlayer;
      }
    }
  }
]);

