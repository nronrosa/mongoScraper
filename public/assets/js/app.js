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
    $("#article-note-title").empty();
    $("#article-note-id").empty();
    $(".previous-notes").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .then(function (data) {
            $("#article-note-title").append("<h5>" + data.title + "</h5>");
            $("#article-note-title").attr("data-id", thisId);
            $("#article-note-id").append("<small>" + thisId + "</small>");
            $(".submit-noteBtn").attr("data-id", thisId);

            // If there's a note in the article
            if (data.note) {
                // Place the body of the note in the body textarea
                for (var i = 0; i < data.note.length; i++) {
                    var noteCard = $("<div class='card'>");
                    var noteCardBody = $("<div class=card-body>")
                    var noteCardyBodyText = $("<p>").text(data.note[i].body);
                    $(".previous-notes").append(noteCard);
                    $(noteCard).append(noteCardBody);
                    $(noteCardBody).append(noteCardyBodyText);
                    $(noteCardyBodyText).append("<button class='btn btn-danger delete-note-btn' data-id=" + data.note[i]._id + ">x</button>");
                }

                // Delete Article Note button
                $(".delete-note-btn").on("click", function () {
                    var thisId = $(this).attr("data-id");
                    $.ajax({
                        method: "DELETE",
                        url: "/note/delete/" + thisId
                    }).done(function (data) {
                        window.location = "/saved"
                    })
                });
            };
        });
    $("#notesModal").modal("show");
});

// Submit Article Note button
$(".submit-noteBtn").on("click", function () {
    var textSubmission = $("#message-text").val()
    if (textSubmission == "") {
        $("notesModalSubmissionMsg").modal("show");
    } else {

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
    }
});

// clear db
$(".clearDb").on("click", function () {
    $.get("article/clear").then(function (data) {
        window.location = "/"
    });
});