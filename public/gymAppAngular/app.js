// app dependncies should be injected , each controller , directive and service.

var app = angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'views.main',
    'views.advancedSearch',
    'views.admin',
    'views.gyms',
    'views.about',
    'views.home',
    'views.news',
    'views.adminmenu',
    'views.chat',
    'services.getGyms',
    'services.admin',
    'services.news',
    'ngMap',


    'services.gymAdminService'
]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/home-page',
            templateUrl: '../partials/main.html',
            controller: 'mainCtrl'
        })
        .state('advancedSearch', {
            url: '/advancedSearch',
            templateUrl: '../partials/advancedSearch.html',
            controller: 'advancedSearchCtrl'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: '../partials/admin.html',
            controller: 'adminCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: '../partials/about.html',
            controller: 'aboutCtrl'
        })
        .state('gyms', {
            url: '/gyms',
            params: {
                gyms: null
            },
            templateUrl: '../partials/gyms.html',
            controller: 'gymsCtrl'
        })
        .state('home', {
            url: 'home',
            templateUrl: '../partials/AdminHtml/temp.html',
            controller: 'homeCtrl'
        })
        .state('adminmenu', {
            url: '/adminmenu',
            templateUrl: '../partials/AdminHtml/adminmenu.html',
            controller: 'adminMenuCtrl'
        })
        .state('chat', {
            url: '/chat',
            templateUrl: '../partials/chat.html',
            controller: 'chatCtrl'
        })
        .state('news', {
            url: '/news',
            templateUrl: '../partials/news.html',
            controller: 'newsCtrl'
        });

    $urlRouterProvider.otherwise(function ($injector) {
        $injector.get('$state').go('advancedSearch');
    });
}]);

