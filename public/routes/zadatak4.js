let btn = document.getElementById("submit");
let body = document.getElementsByTagName("body");
let predmeti = undefined;
let aktivnosti = undefined;

// btn.addEventListener("click", function () {
//    let nazivPredmeta = document.getElementById("nazivPredmeta").textContent;
//    //da li predmet iz aktivnosti postoji
//
// });

function loadPage() {

    fetch("/predmeti",{
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        predmeti = data;
        console.log(predmeti)
    });

    fetch("/aktivnosti",{
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        aktivnosti = data;
        console.log(aktivnosti)
    });
}

