//this js file will dynamically create buttons on the dom using the topics array.
//it will also allow users to type in an emotion to add to the topics array and thus making it a button
//when a button/keyword is clicked it will request the GIPHY API and return 10 static images with the keyword used.
//when one of the images is clicked it will animate the gif
// if it is clicked again it will stop the animated gif.

$(document).ready(function () {


    var topics = ["happy", "sad", "angry", "hype", "selfish"];

    function dispGifs() {
        $("#rating").empty();
        $("#gifsChosen").empty();
        $("#gifDisp").empty();
        var emotionClicked = $(this).attr("data-name");

        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + emotionClicked + "&api_key=CQUgOff8UZGg9g9xvy3Nzv9sr6XDp03l&limit=10");

        xhr.done(function (data) {
            $("#displayGifs").append("<div id='gifDisp'</div>")
            $("#displayGifs").append("<div id='rating'><div>");
            $("#displayGifs").append("<div id='gifsChosen'></div>");
            for (var i = 0; i < 10; i++) {
                console.log(data.data[i].images.original_still.url)
                
                
            

            
            $("#gifDisp").append($("#rating")).append(JSON.stringify(data.data[i].rating));
            $("#gifDisp").append($("#gifsChosen")).append("<img id='stillGif' src='" + data.data[i].images.original_still.url + "'>");
            

            

            makeButtons();
            }

            console.log("success got data", data);
            

        });

    }

    function makeButtons() {
        $("#gifButtons").empty();

        for (var i = 0; i < topics.length; i++) {

            var getButton = $("<button>");

            getButton.addClass("emotionButton")

            getButton.attr("data-name", topics[i]);

            getButton.append(topics[i]);

            $("#gifButtons").append(getButton);

        }


    }

    //line to add emotion to array list.
    $("#addEmotion").on("click", function (e) {

        topics.push($("#emotionInput").val())

        console.log(topics)

        e.preventDefault();

        $("#gifButtons").empty();

        makeButtons();



    })

$("gifDisp").on("click", function(){
    $(this).replaceWith("<img id='animated' src='" + data.data[i].images.original.url + "'>")
    console.log(data.data[i].images.original.url)

})
$(document).on("click", ".emotionButton", dispGifs);

makeButtons();


});