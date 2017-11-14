angular.module('mainApp')
        .controller('NewRelease.IndexController',function(MoviesService,$state,$location){
                                                        var vm= this;
                                                        vm.loading=true;
                                                        MoviesService.getNewRelease().then(result=>{
                                                            vm.loading=false;
                                                            if(result){
                                                                vm.movies =result.data;
                                                                }
                                                        },(err,statusCode)=>{
                                                            vm.loading=false;
                                                            console.log(JSON.stringify(err));
                                                            $state.go("login");
                                                            $location.path('/'); 
                                                        });
 
 

});