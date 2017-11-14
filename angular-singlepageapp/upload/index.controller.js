'use strict';
angular.module('mainApp').controller('Upload.IndexController',
                            function(MoviesService, $http, config){
                                    var vm = this;
                                    vm.movie={};
                                    vm.isSuccess=false;
                                    vm.create = function(){

                                        MoviesService.create(vm,                                 
                                                                    function(res){
                                                                        if(res.result===true){
                                                                            vm.isSuccess=true;
                                                                            vm.error=null;
                                                                            vm.movie={};
                                                                        }else{
                                                                            vm.isSuccess=false;
                                                                            vm.error=res.data;
                                                                        }
                                                                        
                                                                    });
                                    } 

                            });