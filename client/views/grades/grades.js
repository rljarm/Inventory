'use strict';

angular.module('poseidon')
.controller('GradesCtrl', function($scope, Grade){
  var afUser = $scope.afUser = Grade.init();
  afUser.$loaded().then(addToArray);

  $scope.addClass = function(name){
    Grade.add(name).then(addToArray);
    $scope.clName = '';
  };

  $scope.addGrade = function(cl){
    Grade.addGrade(cl);
    $scope.cl = {};
  };

  $scope.destroyGrade = function(grade, index){
    Grade.destroyGrade(grade, index);
  };

  $scope.editGrade = function(grade){
      $scope.cl.grade = grade.grade;

  };

  function addToArray(){
    $scope.names = afUser.names ? afUser.names.split(',') : [];
  }
});
