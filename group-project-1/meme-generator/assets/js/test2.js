
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
        $("#test").append(heading);
    });
}

