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



$(".article-notes").on("click", function () {
    // event.preventDefault();
    $("#article-note-title").empty();
    $("#notesModal").modal("show");
    // var bodyInput = $("#message-text");
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
      })
         // With that done, add the note information to the page
    .then(function(data) {
        console.log(data.title);
        // The title of the article
        $("#article-note-title").append("<h5>" + data.title + "</h5>");
        
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
    // article-note-title

})





// Submit Article Note button
$(".submit-noteBtn").on("click", function () {
    // $("#notesModal").modal("hide");

    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            body: $("message-text").val(),
            title: $("#titleinput").val()

        }
    }).done(function (data) {
        // window.location = "/saved"
        console.log("data");
         // Empty the notes section
    //   $("#notes").empty();
        location.reload();
    })
});