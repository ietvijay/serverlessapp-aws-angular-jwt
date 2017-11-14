(function(window){

    window.__env = window.__env || {};

    // API
        // create jwt token
        window.__env.apiUrlCreateAuthToken = 'https://lqv46fdgol.execute-api.us-east-1.amazonaws.com/Dev/JWT_Create_Token';
        
                // get movies
                window.__env.apiUrlMovies = 'https://lqv46fdgol.execute-api.us-east-1.amazonaws.com/Dev/movies';
                // get users
                window.__env.apiUrlUsers = 'https://lqv46fdgol.execute-api.us-east-1.amazonaws.com/Dev/users';

}(this));