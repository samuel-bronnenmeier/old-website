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
        document.getElementsByTagName("title")[0].innerHTML = "Downloads | " + content.title;

        //----------Description----------
        document.getElementsByClassName("title")[0].innerHTML = content.title;

        document.getElementsByClassName("text")[0].innerHTML = content.descriptionText;

        document.getElementsByClassName("thumbnail-img")[0].setAttribute("src", content.imgPaths[0]);

        //----------Infobox----------
        let tableRows = document.getElementsByClassName("info-table")[0].getElementsByTagName("tr");

        tableRows[0].getElementsByTagName("td")[1].innerHTML = content.officialTitle;

        tableRows[1].getElementsByTagName("td")[1].innerHTML = content.appVersion;

        tableRows[2].getElementsByTagName("td")[1].innerHTML = content.operatingSystem;

        tableRows[3].getElementsByTagName("td")[1].innerHTML = content.author;

        tableRows[4].getElementsByTagName("td")[1].innerHTML = content.price;

        //----------Download button----------
        document.getElementById("download-btn").blur();

        let downloadInstruction = document.getElementsByClassName("download-instruction")[0];

        downloadInstruction.innerHTML = downloadInstruction.innerHTML.replace("[Title]", content.title);
        downloadInstruction.innerHTML = downloadInstruction.innerHTML.replace("[OS]", content.operatingSystem);
    }
}