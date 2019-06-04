//Scrape button
$("#scrape").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function (data) {
        window.location = "/"
    })
});

// Save Article button
$(".saveArticle").on("click", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/article/save/" + thisId
    }).done(function (data) {
        window.location = "/"
    })
});

// Delete Article button
$(".delete-from-save").on("click", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/delete/" + thisId
    }).done(function (data) {
        window.location = "/saved"
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


            console.log(data);

            console.log("app.js @@@@@@@@@@@@@@@@@@@@@");
            // If there's a note in the article
            if (data.note) {
                // Place the body of the note in the body textarea
                $(".previous-notes").val(data.note);

                console.log(data.note);

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
        }
    }).done(function (data) {
        window.location = "/saved"
    })
});













// clear db
$(".clearDb").on("click", function () {
    $.get("article/clear").then(function (data) {
        window.location = "/"
    });
});