/**
 * Created by Zlil on 13/02/2016.
 */

angular.module('views.adminmenu', [])
    .controller('adminMenuCtrl',[ '$scope','gymAdminService','$state' ,function ($scope,adminGyms,$state ) {
        $scope.tabs = [{
            url: './partials/AdminHtml/gymsAdmin.html'
        }, {
            url: './partials/AdminHtml/productsAdmin.html'
        }, {
            url: './partials/AdminHtml/courseAdmin.html'
        },
        {
            url: './partials/AdminHtml/createGym.html'
        },
        {
            url: './partials/AdminHtml/editGym.html'
        },
        {
            url: './partials/AdminHtml/gymsByCity.html'
        }
        ];

        $scope.activeTab = $scope.tabs[0];
        $scope.gymTab= $scope.tabs[0];
        $scope.productTab= $scope.tabs[1];
        $scope.CourseTab= $scope.tabs[2];
        $scope.CreateGymTab= $scope.tabs[3];
        $scope.editGymTab= $scope.tabs[4];
        $scope.groupByCityTab= $scope.tabs[5];




        var init = function () {
            $scope.models = [];
            $scope.courseModels = [];
            /*
            $scope.models.push("amino");
            $scope.models.push("bcaa");
            $scope.models.push("watch");
            */

            $scope.data = adminGyms.getAllgyms().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var gymsObjects = JSON.parse(data);
                $scope.gymsObj = gymsObjects;
                console.log($scope.gymsObj);
               // return $scope.gymsObj;
            });

            $scope.initializePro = adminGyms.getProducts().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var gymsPRO = JSON.parse(data);
                $scope.gymsPRO = gymsPRO;
                console.log($scope.gymsPRO);
                // return $scope.gymsObj;
            });

            $scope.initializeCousr = adminGyms.getCourse().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var gymsCourse = JSON.parse(data);
                $scope.gymsCourse = gymsCourse;
                console.log($scope.gymsCourse);
                // return $scope.gymsObj;
            });
        }
        init();
        $scope.gyms= function(){
            $scope.activeTab = $scope.tabs[0];
        }

        $scope.products = function(){
            $scope.activeTab = $scope.tabs[1];
            $scope.data = adminGyms.getAllProducts().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var gymsProducts = JSON.parse(data);
                $scope.gymsProducts = gymsProducts;
                console.log(gymsProducts);
                // return $scope.gymsObj;
            });

        }

        $scope.course = function(){
            $scope.activeTab = $scope.tabs[2];
            $scope.data = adminGyms.getAllCourse().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var gymsCourse = JSON.parse(data);
                $scope.gymsCourse = gymsCourse;
                console.log(gymsCourse);
                // return $scope.gymsObj;
            });

        }

        $scope.CreateGym = function(){
            $scope.gymname = "";
            $scope.gymcity = "";
            $scope.gymstreet ="";
            $scope.gymhouseNum = "";
            $scope.gymprice = "";
            $scope.gymwebsite = "";
            $scope.activeTab = $scope.tabs[3];

        }

        $scope.editGym = function(gym){
            $scope.activeTab = $scope.tabs[4];
            $scope.gymname = gym.name;
            $scope.gymcity = gym.city;
            $scope.gymstreet =gym.street;
            $scope.gymhouseNum = gym.houseNumber;
            $scope.gymprice = gym.price;
            $scope.gymwebsite = gym.website;
            //$scope.Amino = true;




            var a = adminGyms.getAllProAndCourse(gym.name).then(function(data) {
                if (!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }

                $scope.ProArray =[];
                $scope.LessonsArray =[];

                $scope.ProArrayID =[];
                $scope.LessonsArrayID =[];

                var arrays = JSON.parse(data);
               // console.log(arrays["0"]);
                // console.log(arrays["0"]["gymLessons"]);
               // console.log(arrays["0"]["gymProducts"]);

                var products = arrays["0"]["gymProducts"];
                var Lessons = arrays["0"]["gymLessons"];
                for(pro in arrays["0"]["gymProducts"]){
                    $scope.ProArray.push(products[pro]["name"]);
                    $scope.ProArrayID.push(products[pro]["_id"]);
                    $scope[$scope.ProArray[pro]] = true;
                    //alert( $scope.ProArrayID[pro]);
                }
                for(pro in arrays["0"]["gymLessons"]){
                    $scope.LessonsArray.push(Lessons[pro]["name"]);
                    $scope.LessonsArrayID.push(Lessons[pro]["_id"]);
                    $scope[$scope.LessonsArray[pro]] = true;
                    //alert( $scope.LessonsArray[pro]);
                }
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log(gym["_id"]);
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

                $scope.NEWgymname           = gym.name;
                $scope.NEWgymcity           = gym.city;
                $scope.NEWgymstreet         =gym.street;
                $scope.NEWgymhouseNum       = gym.houseNumber;
                $scope.NEWgymprice          = gym.price;
                $scope.NEWgymwebsite        = gym.website;
                $scope.gymLessons           =$scope.LessonsArrayID
                $scope.gymProducts          =$scope.ProArrayID;
                $scope.gymID = gym["_id"];


               // var  array= JSON.parse(data);
               // var test = JSON.stringify(array);
               // console.log("working!"+test );
                // return $scope.gymsObj;
            });
        }


        $scope.SaveEditwGym =  function(){
            $scope.LessonsToSend = [];
            $scope.ProductsToSend = [];
             var proARRAY =["Amino","SwimmingGlasses","Shaker","BCCA","BodyOil","CardioWatch","HeartMonitor"];
             var CoursARRAY =["TRX","Yoga","Pilatis","KickBoxExercise","Dance","StepClasses","Cardio","Zumba"];
            for(var i=0;i<7;i++) {
                if ($scope[proARRAY[i]] == true) {
                    console.log($scope.gymsPRO[i]["_id"]);
                    $scope.ProductsToSend.push($scope.gymsPRO[i]["_id"]);
                }
            }
            for(var i=0;i<8;i++) {
                if ($scope[CoursARRAY[i]] == true) {
                    console.log($scope.gymsCourse[i]["_id"]);
                    $scope.LessonsToSend.push($scope.gymsCourse[i]["_id"]);
                }
            }
            console.log($scope.ProductsToSend);
            console.log($scope.LessonsToSend);


            var data = {
                gymid:$scope.gymID,
                name: $scope.NEWgymname,
                city: $scope.NEWgymcity ,
                street:$scope.NEWgymstreet,
                houseNumber:$scope.NEWgymhouseNum,
                price:$scope.NEWgymprice,
                website:$scope.NEWgymwebsite,
                gymLessons:$scope.LessonsToSend,
                gymProducts:$scope.ProductsToSend
            };

            $scope.dataToSend = data;
            console.log($scope.dataToSend);
            var data = $scope.dataToSend;
            $scope.reSave = adminGyms.reSaveGym(data);
            location.reload();
        }

        $scope.addGym =  function(){
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
            $scope.ProIDarray = [];
            $scope.CourseIDarray = [];

            for (var i in $scope.models){
                if($scope.models[i] == true){
                    console.log($scope.gymsPRO[i]["_id"]);
                    $scope.ProIDarray.push($scope.gymsPRO[i]["_id"]);
                }
            }
            for (var i in $scope.courseModels){
                if($scope.courseModels[i] == true){
                    console.log($scope.gymsCourse[i]["_id"]);
                    $scope.CourseIDarray.push($scope.gymsCourse[i]["_id"]);
                }
            }
            console.log($scope.gymsCourse);
            console.log($scope.gymsPRO);
            console.log($scope.models);

            var data = {
                name: $scope.gymname,
                city: $scope.gymcity,
                street:$scope.gymstreet,
                houseNumber:$scope.gymhouseNum,
                coordinates: $scope.gymcoor,
                price:$scope.gymprice,
                website:$scope.gymwebsite,
                gymLessons:$scope.CourseIDarray,
                gymProducts:$scope.ProIDarray
            };

            $scope.data = adminGyms.CreateNewGym(data);
            location.reload();
        }


        $scope.deleteGym =  function(delGym){
            var data = {name: delGym};
            $scope.data = adminGyms.DeleteGym(data);
            location.reload();
        }

        $scope.groupByCity = function(){
            $scope.activeTab = $scope.tabs[5];
            $scope.data = adminGyms.getGymsGroupByCity().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var gyms = JSON.parse(data);
                console.log("In the Controller ::::" + gyms);
                $scope.gymsGroupByCity = gyms;
            });
        }


}]);
