app.directive('date', function() {
  var DATE_REGEXP = /(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19[3-9][0-9]|200[0-1])/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.format = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }
          if (DATE_REGEXP.test(modelValue)) {
          // it is valid
          return true;
        }
        return false;
      };
    }
  };
});