//Get the all parameters passed
var fullURL = window.location.href;
while (fullURL[0] != '?') {
    fullURL = fullURL.substring(1);
}
var parameters = fullURL.substring(1);

//Get the id
var id = 0;
id = parameters.substring(3);

//--------------The actual app--------------
let content;

function preload() {
    content = loadJSON("content/appContent" + id + ".json");
}

function setup() {
    noLoop();
}

function draw() {
    if (content.version > 0) {
        document.getElementsByTagName("title")[0].innerHTML = "Downloads | " + content.title;

        document.getElementsByClassName("title")[0].innerHTML = content.title;

        document.getElementsByClassName("text")[0].innerHTML = content.descriptionText;
    }
}