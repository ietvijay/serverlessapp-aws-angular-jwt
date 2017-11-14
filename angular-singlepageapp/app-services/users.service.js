
'use strict';
angular.module('mainApp')
    .factory('UsersService', function($http,config){

                                            return {
                                                getUserRoles: GetUserRoles
                                            }


                                            function GetUserRoles(email){
                                              return  $http.get(config.apiUrlUsers+"?userid="+email);
                                            }



  })