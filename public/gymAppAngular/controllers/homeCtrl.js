angular.module('views.home', [])
    .controller('homeCtrl', ['$scope', 'getGym' ,function ($scope, getGym) {
        function init () {
         $scope.loading = false;

        }

        $scope.saveGym = function () {
            //validations if needed..




        };

        init();
    }]);