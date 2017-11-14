
var env = {};
    // Import variables if present (from env.js)
    if(window){  
        Object.assign(env, window.__env);
    }
    
    var routerApp = angular.module('mainApp',['ui.router','ngStorage'])
                           .config(appconfig)
                           .run(apprun)
                           .constant('config',env);


     function appconfig($stateProvider, $urlRouterProvider){
                    //default route
                    $urlRouterProvider.otherwise('/');
                    


                        //app routes
                        $stateProvider
                        .state('home',{
                            url: '/',
                            templateUrl: 'shared/index.view.html',
                            controller: 'Home.IndexController',
                            controllerAs: 'vm'
                        })
                        .state('upload',{
                            url: '/movies/upload',
                            templateUrl: 'upload/index.view.html',
                            controller: 'Upload.IndexController',
                            controllerAs: 'vm'
                        })
                        .state('new-release',{
                            url: '/movies/new-release',
                            templateUrl: 'shared/index.view.html',
                            controller: 'NewRelease.IndexController',
                            controllerAs: 'vm'
                        })
                        .state('login',{
                            url: '/login',
                            templateUrl: 'login/index.view.html',
                            controller: 'Login.IndexController',
                            controllerAs: 'vm'
                        }).state('logout',{
                            url: '/logout',
                            templateUrl: 'login/index.view.html',
                            controller: 'Login.IndexController',
                            controllerAs: 'vm'
                        });
     }                       
      
function apprun($rootScope,$http,$location,$localStorage,$state){
    // keep user logged in after page refresh
    if($localStorage.currentUser){
        $http.defaults.headers.common.authtoken = $localStorage.currentUser.token;
    }

    $rootScope.$on('$locationChangeStart',function(event,next,current){
            var publicPages = ['/login'];
            var isRestrictedPage = publicPages.indexOf($location.path())=== -1;
            if(isRestrictedPage && !$localStorage.currentUser){
                $state.go("login");
                $location.path('/login');
            }
            if($localStorage.currentUser){
                 $http.defaults.headers.common.authtoken = $localStorage.currentUser.token;
            }

    });
    
}
                       


