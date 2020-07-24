var topics = ["delete", "shook", "disgusted", "surprised", "excited",
              "unsee", "oof"];

function addTopic(){
    var topicToAdd = $("#addTopicInput").val();
    var newButton = $("<button>").text(topicToAdd);
    newButton.addClass("btn btn-secondary btn-topic");
    newButton.attr("topic", topicToAdd);
    $("#buttons").append(newButton);
    addEventToButton();
}

function createButtons(){
    for(var i = 0; i < topics.length; i++){
        var newButton = $("<button>").text(topics[i]);
        newButton.addClass("btn btn-secondary btn-topic");
        newButton.attr("topic", topics[i]);
        $("#buttons").append(newButton);
    }

    addEventToButton();
}

function populatePage(topic){
    $("#pics").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        for(var i = 0; i < response.data.length; i++){

            var newDiv = $("<div>");
            var newImg = $("<img>");
            var newText = $("<p>");

            newImg.addClass("img");
            newImg.attr('src', response.data[i].images.original_still.url);
            newImg.attr('frameBorder', "0");
            newImg.attr('height', "200");
            newImg.attr('width', "200");
            newImg.attr('allowFullScreen');
            newImg.attr('index', i);

            newText.text("Rating: " + response.data[i].rating);

            newDiv.attr("rating", response.data[i].rating);
            newDiv.attr("stillURL", response.data[i].images.original_still.url);
            newDiv.attr("animatedURL", response.data[i].images.fixed_height.url);
            newDiv.addClass("gif");
            newImg.attr('index', i)
            newDiv.append(newImg);
            newDiv.append(newText);

            $('#pics').append(newDiv);
        }

        $(".gif").click(function(){
            //switch still url with animated url

            if ($(this).children(".img").attr("src") == $(this).attr("stillURL")){
                $(this).empty();
                newURL = $(this).attr("animatedURL");
                var replaceImg = $("<img>");
                var replaceText = $("<p>");
                replaceText.text("Rating: " + $(this).attr("rating"));
                replaceImg.addClass("img");
                replaceImg.attr('src', newURL);
                replaceImg.attr('frameBorder', "0");
                replaceImg.attr('height', "200");
                replaceImg.attr('width', "200");
                replaceImg.attr('allowFullScreen');
                $(this).append(replaceImg);
                $(this).append(replaceText);
            } else {
                $(this).empty();
                newURL = $(this).attr("stillURL");
                var replaceImg = $("<img>");
                var replaceText = $("<p>");
                replaceText.text("Rating: " + $(this).attr("rating"));
                replaceImg.addClass("img");
                replaceImg.attr('src', newURL);
                replaceImg.attr('frameBorder', "0");
                replaceImg.attr('height', "200");
                replaceImg.attr('width', "200");
                replaceImg.attr('allowFullScreen');
                $(this).append(replaceImg);
                $(this).append(replaceText);
            }
        })

    });
}

function addEventToButton(){
    $(".btn-topic").click(function(){
        populatePage($(this).attr("topic"));
    });
}

createButtons();
