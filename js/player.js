app.directive("player", function() {
  return {
    scope: {
      name: "@",
      key: "@",
    },

    templateUrl: "player.html",

    controller: function($scope, $document) {
      $scope.buzz = function() {
        $scope.buzzed = true;
      }

      $document.bind("keypress", function(event) {
        if (event.which == $scope.key) {
          $scope.buzz();
        }
      });
    }
  };
});
