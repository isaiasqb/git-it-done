var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");


var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/"+ repo + "/issues?direction=asc"

    fetch(apiUrl).then(function(response){
            //request was successful
        if(response.ok) {
            response.json().then(function(data){
                    //pass response data to DOM (displayIssues) function
                displayIssues(data);
                    //check if api has paginated issues and send the user/repo parameters
                if(response.headers.get("Link")){
                    displayWarning(repo)
                }
            });//end of inner .then
        }
        else {
            alert("There was a problem with your request!");
            }
        }); //end of .then
} 

getRepoIssues("facebook/react")

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
      }
 
    for(var i = 0; i < issues.length; i++){
            //loop over the response data and create an link for each issue
        var issueEl = document.createElement("a");
            issueEl.classList = "list-item flex-row justify-space-between align-center";
            issueEl.setAttribute("href", issues[i].html_url);
            issueEl.setAttribute("target", "_blank");
        

            //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
            //append to container
        issueEl.appendChild(titleEl);

            //create a type element
        var typeEl = document.createElement("span");
            //check if issue is an actual issue or pull request
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
            //append to container
        issueEl.appendChild(typeEl);

            //append the created elements to the actual page
        issueContainerEl.appendChild(issueEl);
    }
}; //end of display issues


var displayWarning = function(repo) {
        //add text to warning container
    limitWarningEl.textcontent = "To see more than 30 issues, visit ";

    var linkEL = document.createElement("a");
    linkEL.textContent = "See More Issues on GitHub.com";
    linkEL.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEL.setAttribute("target", "_blank");
        //appen to warning container
    limitWarningEl.appendChild(linkEL);
};