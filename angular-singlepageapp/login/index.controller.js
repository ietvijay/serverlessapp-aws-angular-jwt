'use strict';
angular.module('mainApp').controller('Login.IndexController',
                                        function($location,$localStorage,$rootScope,$state,AuthenticationService){
                                                    
                                                        var vm=this;
                                                      
                                                        vm.error='';
                                                        vm.loading=false;
                                                     
                                                        

                                                         vm.login = function(){
                                                            vm.loading=true;
                                                         AuthenticationService.Login(vm.userId,vm.password,
                                                                                    function(result){
                                                                                        vm.loading=false;
                                                                                                if(result===true){
                                                                                                  
                                                                                                    $state.go("login");
                                                                                                    $location.path('/');  
                                                                                                   
                                                                                                }
                                                                                                else{
                                                                                                    vm.error ='Username or password is incorrect.';
                                                                                                }
                                                                                        });
                                                            }

    
                                                    });


