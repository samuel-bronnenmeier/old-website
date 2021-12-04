//Get the all parameters passed
var fullURL = window.location.href;
while (fullURL[0] != '?') {
    fullURL = fullURL.substring(1);
}
var parameters = fullURL.substring(1);

//Get the id
var id = 0;
id = parameters.substring(3, 4);

//--------------Here all the magic happens--------------
let content;

$(document).ready(function () {

    $.getJSON("content/appContent" + id + ".json", function (content) {

        if (content.version > 0) {

            //----------Head----------
            $("title").html("Downloads | " + content.title);
    
            //----------Description----------
            $(".std-title").html(content.title);
    
            $(".text").html(content.descriptionText);
    
            $(".thumbnail-img").attr("src", content.imgPaths[0]);
    
            //----------Infobox----------
            $(".info-table tr").map(function () {
                $(this).children().last().html(content[$(this).attr("info")]);
            });
    
            //----------Download button----------
            $("#download-btn").blur();
    
            let downloadInstruction = $(".download-instruction");
    
            downloadInstruction.html(downloadInstruction.html().replace("[Title]", content.title));
            downloadInstruction.html(downloadInstruction.html().replace("[OS]", content.operatingSystem));
    
            $("#download-btn").attr("href", content.downloadHREF);

        }

    });

});