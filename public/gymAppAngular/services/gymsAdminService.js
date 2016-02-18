angular.module('services.gymAdminService', [])
    .service('gymAdminService',['$http',
        function ($http) {
            'use strict';

            var getAllgyms = function () {
                return $http.get('/adminMenu').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            };

            var getAllProducts = function () {
                return $http.get('/adminMenuProducts').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            };
            var getAllCourse = function () {
                return $http.get('/adminMenuCourse').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            };

            var CreateNewGym = function (data) {
                $http.post('/addGym',data).success(function(){
                        console.log('ok!');
                    })
                    .error(function(err) {
                        console.log('Error: ' + err);
                    });
            }
            var DeleteGym = function (data) {
                $http.post('/deleteGym',data).success(function(){
                        console.log('gym has been deleted!');
                    })
                    .error(function(err) {
                        console.log('Error: ' + err);
                    });
            }
            var getProducts = function (data) {
                return $http.get('/getProducts').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            }

            var getCourse = function (data) {
                return $http.get('/getCourse').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            }

           /* var getAllProAndCourse = function (data) {
                return $http.get('/getAllProAndCourse').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            }*/

            var getAllProAndCourse = function (gymName) {
                return $http.get('/getAllProAndCourse/'+gymName+'').then(function(gymName){
                        return  JSON.stringify(gymName["data"]);
                });
            };

            var reSaveGym = function (data) {
                console.log("SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE ")
                $http.post('/reSaveGym',data).success(function(){
                        console.log('ok!');
                    })
                    .error(function(err) {
                        console.log('Error: ' + err);
                    });
            }

            var getGymsGroupByCity = function () {
                return $http.get('/adminMenuGymsByCity').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else {
                        console.log("############### "+ data["data"]);
                        return JSON.stringify(data["data"]);
                    }
                });
            };



            return {
                getAllgyms: getAllgyms,
                getAllProducts:getAllProducts,
                getAllCourse:getAllCourse,
                CreateNewGym:CreateNewGym,
                DeleteGym:DeleteGym,
                getProducts:getProducts,
                getCourse:getCourse,
                getAllProAndCourse:getAllProAndCourse,
                reSaveGym:reSaveGym,
                getGymsGroupByCity:getGymsGroupByCity
            }
        }]);
/**
 * Created by Eli on 14/02/2016.
 */


/*
 // when submitting the add form, send the item to the node API
 $scope.createItem = function(){
 $http.post('/addNewItems', $scope.formData)
 .success(function() {
 $location.path('#/');
 })
 .error(function(err) {
 console.log('Error: ' + err);
 });
 };*/
