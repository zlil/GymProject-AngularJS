/*angular.module('views.gyms', [])
    .controller('gymsCtrl', ['$scope', 'getGyms', function ($scope, getGyms) {
        $scope.user = {
            name: 'Adi'
        };
        function initGymData() {
            getGyms.getGyms().then(function (gyms) {
                $scope.gyms = gyms;
            });
        }

        function init() {
            initGymData().then(function () {
                if($scope.gyms) {
                    // do some logic here..

                } else {
                    console.log('no gyms avalible!')
                }
            })
        }

        init();
    }]);
*/

angular.module('views.gyms', [])
    .controller('gymsCtrl',[ '$scope','$stateParams' ,function ($scope,$stateParams){
            console.log("------- im in the gym ctrl ----------- ");
            console.log($stateParams);
            $scope.gyms = $stateParams["gyms"];


    }]);