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

function preload() {
    content = loadJSON("content/appContent" + id + ".json");
}

function setup() {
    noLoop();
    noCanvas();
}

function draw() {
    if (content.version > 0) {
        //----------Head----------
        $("title").html("Downloads | " + content.title);

        //----------Description----------
        $(".std-title").html(content.title);

        $(".text").html(content.descriptionText);

        $(".thumbnail-img").attr("src", content.imgPaths[0]);

        //----------Infobox----------
        let tableRows = document.getElementsByClassName("info-table")[0].getElementsByTagName("tr");

        tableRows[0].getElementsByTagName("td")[1].innerHTML = content.officialTitle;

        tableRows[1].getElementsByTagName("td")[1].innerHTML = content.appVersion;

        tableRows[2].getElementsByTagName("td")[1].innerHTML = content.operatingSystem;

        tableRows[3].getElementsByTagName("td")[1].innerHTML = content.author;

        tableRows[4].getElementsByTagName("td")[1].innerHTML = content.price;

        //----------Download button----------
        $("#download-btn").blur();

        let downloadInstruction = $(".download-instruction");

        downloadInstruction.html(downloadInstruction.html().replace("[Title]", content.title));
        downloadInstruction.html(downloadInstruction.html().replace("[OS]", content.operatingSystem));

        $("#download-btn").attr("href", content.downloadHREF);
    }
}