app.service("scoreboard", ["sounds", "timer",
  function(sounds, timer) {
    return {
      startingPlayer: 1,
      interrupted: false,
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
        this.interrupted = true;
        this.switchToPlayer(challenger);
        this.continue();
      },

      incorrectChallenge: function(challenger) {
        this.players[this.activePlayer].score++;
        this.continue();
      },

      awardBonus: function(challenger) {
        this.players[this.activePlayer].score++;
        this.players[challenger].score++;
        this.interrupted = true;
        this.continue();
      },

      switchToPlayer: function(playerNumber) {
        this.activePlayer = playerNumber;
      },

      timeUp: function() {
        this.players[this.activePlayer].score += (this.interrupted ? 1 : 2);
        this.startingPlayer = this.activePlayer = this.startingPlayer % 4 + 1;
      },

      continue: function() {
        delete this.buzzedPlayer;
      }
    };
  }
]);

