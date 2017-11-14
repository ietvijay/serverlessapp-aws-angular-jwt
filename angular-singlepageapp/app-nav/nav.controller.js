'use strict';
angular.module('mainApp').controller('Nav.IndexController',
                                        function(AuthenticationService,$rootScope,$localStorage){
                                                    
                                                        var vm=this;
                                                        vm.isLogin=false;
                                                        vm.isAdmin=false;
                                                        if($localStorage.currentUser){
                                                            vm.isLogin=true;
                                                            vm.isAdmin=$localStorage.currentUser.roles.indexOf('canwrite') !== -1                                                        
                                                        }
                                                        $rootScope.$watch('isAdminstatus',
                                                        function(newValue, oldValue){
                                                            if(newValue!= null)
                                                            vm.isAdmin = newValue;
                                                        })    

                                                        $rootScope.$watch('loginstatus',
                                                        function(newValue, oldValue){
                                                            if(newValue!= null)
                                                            vm.isLogin = newValue;
                                                        })                                                     
                                                         
                                                        vm.logout= function(){
                                                           
                                                            AuthenticationService.Logout();
                                                        }
    
                                                    });


