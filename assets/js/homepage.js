var getUserRepos = function (user){
        //format the github API url
    var apiUrl = "https://api.github.com/users/"+ user +"/repos";

        //make the request to the url
    fetch(apiUrl).then(function(response)   {
        response.json().then(function(data) {
            console.log(data)
        });
    });
};        
getUserRepos("isaiasqb")

