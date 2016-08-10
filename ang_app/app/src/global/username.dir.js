app.directive('username', function() {
  var UESRNAME_REGEXP = /^[a-zA-Z]+$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.lengthName = function(modelValue, viewValue) {
       var valid = true;
       _.forEach(modelValue.split(' '), function (val) {
        if(val.length<3) {
          valid = false;
        }
      });
       if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }
          return valid;
        };
        ctrl.$validators.badName = function(modelValue, viewValue) {
          var valid = true;
          _.forEach(modelValue.split(' '), function (val) {
            if(!UESRNAME_REGEXP.test(val)) {
              valid = false;
            }
          });
          return valid;
        };
        ctrl.$validators.moreWord = function(modelValue, viewValue) {
          if(modelValue.split(' ').length>2){
            return false;
          }
          return true;
        };
      }
    };
  });