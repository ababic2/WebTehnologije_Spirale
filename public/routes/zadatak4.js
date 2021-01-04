let body = document.getElementsByTagName("body");
let predmeti = undefined;
let aktivnosti = undefined;

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

document.getElementById("submit").addEventListener("click", function () {
   let nazivPredmeta = document.getElementById("nazivPredmeta").value;
   //da li predmet iz aktivnosti postoji??
    let found = predmeti.find(element => element["naziv"] === nazivPredmeta.toString());
    if(found === undefined) {
        let obj = {naziv: nazivPredmeta};
        fetch("/predmeti",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log('Success:', data);
        });
    }
});