(function() {

    var app = angular.module('app', ['ui.router']);

    app.config(['$logProvider', '$stateProvider', '$urlRouterProvider', function ($logProvider, $stateProvider, $urlRouterProvider) {

        $logProvider.debugEnabled(true);

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/templates/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('schools', {
                url: '/schools',
                templateUrl: 'app/templates/allSchools.html',
                controller: 'AllSchoolsController',
                controllerAs: 'vm'
            })
            .state('classrooms', {
                url: '/classrooms',
                templateUrl: 'app/templates/allClassrooms.html',
                controller: 'AllClassroomsController',
                controllerAs: 'vm'
            })
            .state('classroom_parent', {
                abstract: true,
                url: '/classrooms/:id',
                templateUrl: '/app/templates/classroom_parent.html',
                controller: 'ClassroomController',
                controllerAs: 'vm'
            })
            .state('classroom_parent.classroom_summary', {
                url: '/summary',
                templateUrl: 'app/templates/classroom.html'
            })
            .state('classroom_parent.classroom_detail', {
                url: '/detail/{month}',
                templateUrl: 'app/templates/classroomDetail.html'                
            })
            .state('activities', {
                url: '/activities',
                templateUrl: 'app/templates/allActivities.html',
                controller: 'AllActivitiesController',
                controllerAs: 'vm'
            });
        
    

    }]);

    app.run(['$rootScope', '$log', function($rootScope, $log) {

        // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        //     $log.debug('successfully changed states');

        //     $log.debug('event', event);
        //     $log.debug('toState', toState);
        //     $log.debug('toParams', toParams);
        //     $log.debug('fromState', fromState);
        //     $log.debug('fromParams', fromParams);

        // });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {

            $log.debug('Error changing states: ' + error);

            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);

        });

        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {

            $log.error('requested state was not found');

            $log.debug('event', event);
            $log.debug('unfoundState', unfoundState);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);

        });



    }]);

    

}());