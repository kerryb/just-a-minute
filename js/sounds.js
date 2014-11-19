app.service("sounds", ["ngAudio", function(ngAudio) {
  this._buzz= ngAudio.load("media/buzz.wav");
  this._whistle = ngAudio.load("media/whistle.wav");

  this.buzz = function() {
    this._buzz.play();
  };

  this.whistle = function() {
    this._whistle.play();
  };
}]);
