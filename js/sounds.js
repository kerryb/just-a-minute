app.factory("sounds", ["ngAudio", function(ngAudio) {
  return {
    _buzz: ngAudio.load("media/buzz.wav"),
    _whistle: ngAudio.load("media/whistle.wav"),

    buzz: function() {
      this._buzz.play();
    },

    whistle: function() {
      this._whistle.play();
    }
  };
}]);
