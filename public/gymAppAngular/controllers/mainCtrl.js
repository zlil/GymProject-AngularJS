angular.module('views.main', [])
    .controller('mainCtrl',[ '$scope' ,function ($scope) {
        $scope.user = {
            name: 'Adi'
        };

        console.log('the controller fired app');
    }]);


