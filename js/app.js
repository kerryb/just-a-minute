var app = angular.module("justAMinute", ["xeditable", "ngAudio"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
