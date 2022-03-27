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


var userFormEl = document.querySelector("#user-form");
var nameInput = document.querySelector("#username");

    //to be executed upon a form submission browser event
var formSubmitHandler = function(event) {
    event.preventDefault();

        //get the name of the user form the input value
    var username = nameInput.value.trim();

    if(username){
        getUserRepos(username); //if there is a username, it runs the function to fetch data using that username as parameter
        nameInput.value = ""    //resets the value of the input area
    } else {
        alert("Please enter a GitHub username")
    }
    console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);