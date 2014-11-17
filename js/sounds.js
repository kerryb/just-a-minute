app.service("sounds", ["ngAudio", function(ngAudio) {
  this._whistle = ngAudio.load("media/whistle.wav");

  this.whistle = function() {
    this._whistle.play();
  };
}]);
