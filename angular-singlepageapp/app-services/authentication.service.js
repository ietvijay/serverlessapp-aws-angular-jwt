angular.module('mainApp')
       .factory('AuthenticationService',
                    function($http, $localStorage,$rootScope,config){
    
                            return {
                                    Login: function DoLogin( userid,pwd,callback){
                                                                var url=config.apiUrlCreateAuthToken;
                                                                var postconfig={ headers:{  'Content-Type':'application/json'}};
                                                                var data = JSON.stringify({username:userid,password:pwd});

                                                                $http.post(url,data,postconfig)
                                                                .success(function (response){
                                                                                if(response.token){
                                                                                    $rootScope.loginstatus = true;
                                                                                    var userroles= getRoles(response.token)
                                                                                    $rootScope.isAdminstatus = userroles.indexOf('canwrite') !== -1
                                                                                    $localStorage.currentUser = {
                                                                                                                username:userid,
                                                                                                                token:response.token,
                                                                                                                roles: userroles
                                                                                                                };
                                                                                    $http.defaults.headers.common.authtoken= response.token;
                                                                                    callback(true);
                                                                                }else{

                                                                                    callback(false);
                                                                                }}
                                                                            )
                                                                .error(function (error, status){
                                                                    $rootScope.loginstatus = false;
                                                                       
                                                                        callback(false);
                                                                    }); 
                                                        function getRoles(token){
                                                            var base64Url = token.split('.')[1];
                                                            var base64 = base64Url.replace('-', '+').replace('_', '/');
                                                            return JSON.parse(window.atob(base64)).roles;



                                                        }
                                                                                
                                    },
                                    Logout: function DoLogout(){
                                                                 $rootScope.isAdminstatus= false;
                                                                 $rootScope.loginstatus = false;
                                                                 delete $localStorage.isAdmin;
                                                                delete $localStorage.currentUser;
                                                                $http.defaults.headers.common.authtoken='';
                                    }
                            }
                           
         });