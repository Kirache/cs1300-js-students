var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=U4f9NEGGtYZ2u44OJMVPbp-RI3Oa-c6ZWUz16kekuwM";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      //console.log(request)
      handleResponse(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
const handleResponse = (requestResponse) => {
    const jsonified = JSON.parse(requestResponse);
    const plantsArray = jsonified.data;
    const grasses1753 = plantsArray.filter((arrayItem) => {
        return (arrayItem.year == 1753 & arrayItem.family == "Poaceae");
    });
    displayInfo(grasses1753);
}

const imageSource = (url) => { url == null ? console.log("Is null") : console.log("Is not null") };

const displayInfo = (info) => {
    const plantDiv = document.createElement("div");
    plantDiv.style.display = "none";

    for (i = 0;  i<info.length; i++){
        const header = document.createElement("h2");
        header.innerText = info[i].common_name;
        plantDiv.appendChild(header);

        const image = document.createElement("img");
        const source = info[i].image_url == null ? "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg" : info[i].image_url;
        image.src = source;
        plantDiv.appendChild(image);

        document.getElementById("plants").appendChild(plantDiv);
    }

    document.getElementById("loading").style.display = "none";
    plantDiv.style.display = "block";
}
