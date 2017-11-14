angular.module('mainApp')
        .factory('MoviesService',
        function($http,config){

            /*  var services={};
             services.getAllMovies = GetAllMovies;
             services.create = CreateMovie; */
             return {
                getAllMovies:GetAllMovies,
                create:CreateMovie,
                getNewRelease:GetNewRelease
             };

             function GetNewRelease(){
               return $http.get(config.apiUrlMovies+'/newrelease');
             }

            function CreateMovie (vm, callback){
                var successReponse = function(response){
                    callback({result:true,data:response} );
                 }
                 var errorReponse = function(response){
                    callback({result:false,data:response.statusText || 'Request failed'} );
                 }

                $http.post(config.apiUrlMovies, JSON.stringify({movie:vm.movie}),{headers:{'Content-Type':'application/json'}})
                             .then(function(response){
                                callback({result:true,data:response} );
                               },function(response){ 
                                    callback({result:false,data:response.statusText || 'Request failed'} );
                                })  
                         
            }

             function GetAllMovies (callback){

                $http.get(config.apiUrlMovies)
                .success(function(response){
                            
                    callback({result:true,data:response} );
                  
                }).error(function(reason,status){
                    
                    callback({result:false,data:reason} );
                });

             }


});