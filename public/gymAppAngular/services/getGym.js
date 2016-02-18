angular.module('services.getGyms', [])
    .service('getGyms', ['$http',
        function ($http) {
            'use strict';

            var getGyms = function (gymName, City) {
                return $http.get('/SearchGym/'+gymName+'/'+City).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var getGymsByCity = function (city){
                return $http.get('/SearchGym/'+city).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var getGymsByName = function (name){
                return $http.get('/SearchGymByName/'+name).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var getGymsByLesson = function (lesson){
                return $http.get('/SearchGymByLesson/'+lesson).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var getGymByNameCityLesson = function (name, city, lesson){
                return $http.get('/SearchGymByNameCityLesson/'+name+"/"+city+"/"+lesson).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var getGymByNameLesson = function (name, lesson){
                return $http.get('/SearchGymByNameLesson/'+name+"/"+lesson).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var getGymByCityLesson = function (city, lesson){
                return $http.get('/SearchGymByCityLesson/'+city+"/"+lesson).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var addGym = function () {
                return $http.post('/your POST req goes here...');
            };



            return {
                getGyms: getGyms,
                getGymsByCity: getGymsByCity,
                getGymsByName: getGymsByName,
                getGymByNameCityLesson: getGymByNameCityLesson,
                getGymByCityLesson: getGymByCityLesson,
                getGymByNameLesson: getGymByNameLesson,
                getGymsByLesson: getGymsByLesson,
                addGym: addGym
            }
        }]);
