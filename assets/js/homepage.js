var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');


var getUserRepos = function (user){
        //format the github API url
    var apiUrl = "https://api.github.com/users/"+ user +"/repos";

        //make the request to the url
    fetch(apiUrl)
        .then(function(response)   {
                //request was successful
            if (response.ok) {
                response.json().then(function(data) {
                displayRepos(data, user)
                console.log(data);
            });
            } else {
                aalert("Error: GitHub User Not Found");
            }
        }) //end of .then method
        .catch(function(error) {
            // .catch method is being chained to the end of the .then method
            alert("Unable to connect to GitHub");
        }) // end of .catch method
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


var displayRepos = function (repos, searchTerm) {
        // check if API returned any repos
    if (repos.length ===0 ) {
        repoContainerEl.textContent = "No Repositories Found for this user.";
        return;
    }

    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

        //loop over repos
    for (var i = 0; i < repos.length; i++) { //repos.length is the data.length, is being fed to this function as a parameter
            // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name

            //create a container/link for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo="+repoName);    
            //create a span element to hold repository name
        var titleEl = document.createElement("sapn");
        titleEl.textContent = repoName;
            //append to container
        repoEl.appendChild(titleEl);
        
            //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

            // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
            // append to container
        repoEl.appendChild(statusEl);

            //append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
}




