/**
 * Created by tomeraronovsky on 2/5/16.
 */
angular.module('views.about', [])
    .controller('aboutCtrl',[ '$scope' ,function ($scope) {
        $scope.user = {
            name: 'Adi'
        };

        console.log('the controller fired app');
    }]);