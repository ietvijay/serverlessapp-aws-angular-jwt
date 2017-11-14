
angular.module('mainApp').controller('Home.IndexController',function(MoviesService,$state,$location){
     vm= this;
     vm.loading=true;
      MoviesService.getAllMovies(function(result){
        vm.loading=false;
         if(result.data){
            vm.movies =result.data;
         }else{

            $state.go("login");
            $location.path('/');  
         }
     });
        
                
    });
