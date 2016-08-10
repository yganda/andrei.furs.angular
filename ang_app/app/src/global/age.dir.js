app.directive('integer', function() {
  var INTEGER_REGEXP = /^[0-9]/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
      ctrl.$validators.range = function(modelValue, viewValue) {
        if(modelValue>=18 && modelValue<=65){
          return true;
        }
        // it is invalid
        return false;
      };
    }
  };
});