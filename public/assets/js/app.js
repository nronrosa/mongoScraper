//Scrape button
$("#scrape").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function (data) {
        // window.location = "/"
        location.reload();
    })
});

// Save Article button
$(".saveArticle").on("click", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/article/save/" + thisId
    }).done(function (data) {
        console.log("saved this article: " + data);
        // window.location = "/"
        location.reload();
    })
});

// Delete Article button
$(".delete-from-save").on("click", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/delete/" + thisId
    }).done(function (data) {
        // window.location = "/saved"
        location.reload();
    })
});



// NOTES
// opens modal for entering/viewing article notes
$(".article-notes").on("click", function () {
    // event.preventDefault();
    $("#article-note-title").empty();
    $("#article-note-id").empty();
    // var bodyInput = $("#message-text");
    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .then(function (data) {

            // The title of the article
            $("#article-note-title").append("<h5>" + data.title + "</h5>");
            $("#article-note-title").attr("data-id", thisId);
            $("#article-note-id").append("<small>" + thisId + "</small>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
    $("#notesModal").modal("show");
})




// Submit Article Note button
$(".submit-noteBtn").on("click", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            body: $("#message-text").val(),
            // title: $("#titleinput").val()
        }
    }).done(function (data) {
        // window.location = "/saved"
        console.log(data);
        console.log("**********data*********");

        // Empty the notes section
        //   $("#notes").empty();
        // location.reload();
    })

    $("#message-text").val("");
});




//Sets up a function for posting a new comment
function postComment() {
    //Whenever someone clicks the "Post" button...
    $(document).on("click", ".post-comment", function () {
        //Save the ID from that button
        var thisId = $(this).attr("data-id");

        //Send a POST request to the server
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                //Value taken from the Name input
                name: $("#name").val(),
                // Value taken from Comment textarea
                body: $("#comment").val()
            }
        });

        //Remove the values entered currently typed into the form
        $("#name").val("");
        $("#comment").val("");
    });
}










// clear db
$(".clearDb").on("click", function () {
    $.get("article/clear").then(function (data) {
        location.reload();
    });
});