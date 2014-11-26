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

      score: function(playerNumber) {
        return this.players[playerNumber].score;
      },

      buzz: function(playerNumber) {
        if (!this.buzzedPlayer) {
          this.buzzedPlayer = playerNumber;
          timer.stop();
          sounds.buzz();
        };
      },

      correctChallenge: function(challenger) {
        this.players[challenger].score++;
        this.switchToPlayer(challenger);
        this.continue();
      },

      incorrectChallenge: function(challenger) {
        this.players[this.activePlayer].score++;
        this.continue();
      },

      awardBonus: function(challenger) {
        this.players[challenger].score++;
        this.continue();
      },

      switchToPlayer: function(playerNumber) {
        this.activePlayer = playerNumber;
      },

      continue: function() {
        delete this.buzzedPlayer;
      }
    };
  }
]);

