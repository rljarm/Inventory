'use strict';

angular.module('poseidon')
.factory('Grade', function($rootScope, $firebaseObject, $firebaseArray){
  var fbUser;
  var afUser;

  function Grade(){
  }

  Grade.init = function(){
    fbUser = $rootScope.fbRoot.child('users/' + $rootScope.activeUser.uid);
    afUser = $firebaseObject(fbUser);
    return afUser;
  };

  // Grade.editGrade = function(cl, index){
  //   var fbGrades = fbUser.child('subjects/' + cl.subject);
  //   var afGrades = $firebaseArray(fbGrades);
  //   afGrades.$loaded().then(function(){
  //     var foundcl = afGrades[index];
  //     return foundcl;
  //   });
  // };

  Grade.destroyGrade = function(grade, index){
    var fbGrades = fbUser.child('subjects/' + grade.subject);
    var afGrades = $firebaseArray(fbGrades);
    afGrades.$loaded().then(function(){
      var foundcl = afGrades[index];
      afGrades.$remove(foundcl);
    });
  };

  Grade.addGrade = function(cl){
    var grade = angular.copy(cl);
    grade.date = grade.date.getTime();
    var fbGrades = fbUser.child('subjects/' + grade.subject);
    var afGrades = $firebaseArray(fbGrades);
    afGrades.$add(grade);
  };

  Grade.add = function(name){
    var names = afUser.names ? afUser.names.split(',') : [];
    names.push(name);
    afUser.names = names.join(',');
    return afUser.$save();
  };

  return Grade;
});
