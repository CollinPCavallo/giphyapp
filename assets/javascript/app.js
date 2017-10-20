//this js file will dynamically create buttons on the dom using the topics array.
//it will also allow users to type in an emotion to add to the topics array and thus making it a button
//when a button/keyword is clicked it will request the GIPHY API and return 10 static images with the keyword used.
//when one of the images is clicked it will animate the gif
// if it is clicked again it will stop the animated gif.

$(document).ready(function () {


    var topics = ["happy", "sad", "angry", "hype", "selfish"];

    function dispGifs() {
        $("#displayGifs").empty();

        var emotionClicked = $(this).attr("data-name");

        var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + emotionClicked + "&api_key=CQUgOff8UZGg9g9xvy3Nzv9sr6XDp03l&limit=10");

        xhr.done(function (data) {

            for (var i = 0; i < 10; i++) {
                console.log(data)

                //this creates a div to hold the rating and gif together
                var createDiv = $("<div>")

                createDiv.addClass("gifWrap")

                //this creates an h4 tag that we will append the rating too
                var addRating = $("<h4>")

                addRating.append(data.data[i].rating);

                //this creates the img tag and stores 2 data values into the gif, one is a still one is the animated so we can switch between the two(*MAD PROPS TO FERENC)*
                var gif = $("<img>")

                gif.attr("data-gif1", data.data[i].images.fixed_height_still.url)

                gif.attr("data-gif2", data.data[i].images.fixed_height.url)

                gif.attr("src", data.data[i].images.fixed_height_still.url)
            
                //This puts everything in the first div we made(gif and rating) for easier and cleaner css
                

                createDiv.append(gif)
                
                createDiv.append(addRating)

                $("#displayGifs").append(createDiv)

                makeButtons();
            }
            $("img").click(function () {

                //this will check the src of whatever is clicked to the still version of the img and if it matches it switches it to the animated version
                if ($(this).attr("src") === $(this).attr("data-gif1")) {

                    $(this).attr("src", $(this).attr("data-gif2"))


                } else {
                    //this swtiches the image back on click if its anything other than the still image
                    $(this).attr("src", $(this).attr("data-gif1"))

                }

            })


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

        $("#emotionInput").empty()

        makeButtons();



    });

    $(document).on("click", ".emotionButton", dispGifs);



    makeButtons();


});