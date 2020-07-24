var memeDisplay = $("#meme-display");
var generatorButton = $("#generator-button");
var searchTopic = "testing";
var results = [];

function fetchGIF(topic){
        
       //================================== API KEY ======================= 
       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
         topic + "&api_key=Sg4YQq4nInHRFLJvmZtJXGfmzceE6X39&limit=10"; 
  
        // AJax GET request
        $.ajax({
        url: queryURL,
        method: "GET"
        })       

        // After the data from API comes back
        .then(function(response) {
  
            // Storing in results Variables
            var results = response.data;  

            var selection = Math.floor(Math.random()*results.length);
            var url = results[selection].images.fixed_height.url;
            var giphyDiv = $("<div>");
            var giphyImage = $("<img>");
            giphyImage.attr("src", url);
            giphyDiv.append(giphyImage);
            $("#test").append(giphyDiv);

      });          

    /* TO DO
    get gif from giphy using topic
    create HTML <img> element with JQuery using gif as src. 
    flip a coin (random # between 0 and 1) to determine if gif or still frame? **MAYBE!!! 
    return <img> element
    */
}

//==========================================================================================================
//==========================================================================================================
async function getCaption(topic){
    var results = [];
    var heading = $("<h4>");

    function getListOfPromisesFromReddit(topic){
        return new Promise((resolve, reject)=>{
            var queryURL = "http://www.reddit.com/search.json?q=" + topic + "&sort=comments&limit=10";
            var posts = [];
            var urls = [];
            var promises = [];
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) { 
                posts = response.data.children;
            }).then(function(response){
                for(var i = 0; i < posts.length; i++){
                    var id = posts[i].data.id;
                    var sub = posts[i].data.subreddit;
                    queryURL = "http://www.reddit.com/r/" + sub + "/comments/" + id + ".json?";
                    urls.push(queryURL);
                }
                for(var i = 0; i < urls.length; i++){
                    promises.push(retrieveComments(urls[i]));
                }
                resolve(promises);
            });
        })
    
    }
    
    function retrieveComments(queryURL){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var item = response[1].data.children;
                for(var i = 0; i < item.length; i++){
                    if(item[i].data.body){
                        var text = item[i].data.body;
                        if(text.length < 60){
                            if(text != "[removed]" && text != "[deleted]"){
                                results.push(item[i].data.body);
                            }
                        }
                    }
                }
                resolve("true");
            });
        })
    }

    return new Promise((resolve, reject)=>{
        getListOfPromisesFromReddit(topic).then(response =>{
            Promise.all(response).then(()=>{
                var selection = Math.floor(Math.random() * results.length);
                var caption = results[selection].trim();
                heading.text(caption);
                resolve(heading);
            }).catch((e)=>{
                reject("error");
            });
        });
    })
}

async function fetchCaption(){
    await getCaption("your mom").then((heading)=>{
        var caption = heading;
        return (caption);
    });
}
//==========================================================================================================
//==========================================================================================================



function generateMeme(topic){
    $("#meme-display").empty();
    //var gif = fetchGIF(topic);
    var caption = fetchCaption(topic);
    
    var gif = $("<img>").attr("src", "assets/images/test.gif");
    //var caption = $("<h3>").text(topic);

    var newCard = $("<div>").addClass("card card-default");

    var newHeader = $("<div>").addClass("card-header");
    newHeader.append(caption);

    var newBody = $("<div>").addClass("card-body");
    newBody.append(gif);


    newCard.append(newHeader).append(newBody);
    $("#meme-display").append(newCard);

}

function validateForm(){
    searchTopic = $("#topic").val().trim();
    if(searchTopic == ""){
        alert("Enter Search Query");
    } else {
        generateMeme(searchTopic);
    }
}

fetchGIF("your mom");