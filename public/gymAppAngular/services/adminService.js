angular.module('services.admin', [])
    .service('admin', ['$http',
        function ($http) {
            'use strict';

            var login = function (email, password) {
                return $http.get('/login/'+email+'/'+password).then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            };

            return {
                login: login,
            }
        }]);
