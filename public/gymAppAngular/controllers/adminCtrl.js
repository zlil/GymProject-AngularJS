/*angular.module('views.admin', [])
    .controller('adminCtrl',[ '$scope' ,function ($scope) {
        $scope.user = {
            name: 'Adi'
        };

        console.log('the controller fired app');
    }]);*/

angular.module('views.admin', [])
        .controller('adminCtrl',[ '$scope','admin','$state' ,function ($scope,login,$state) {
                $scope.adminfunc = function(){
                    var info;
                    $scope.data = login.login($scope.adminMail, $scope.adminPassword).then(function(data){
                        info = data;
                        console.log("data: "+data);

                        if(!data){
                            console.log("data is null");
                            alert("wrong details. please try again");
                        }
                        else $state.go('adminmenu');
                    });
                }
}]);

