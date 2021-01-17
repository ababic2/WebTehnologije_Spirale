let body = document.getElementsByTagName("body");
let predmeti = undefined;
let aktivnosti = undefined;
let tipovi = undefined;
let dani = undefined;
let grupe = undefined;

$('.timepicker-24-hr').wickedpicker({
    now: "08:00", //hh:mm 24 hour format only, defaults to current time
    twentyFour: true,  //Display 24 hour format, defaults to false
    upArrow: 'wickedpicker__controls__control-up',  //The up arrow class selector to use, for custom CSS
    downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS
    close: 'wickedpicker__close', //The close class selector to use, for custom CSS
    hoverState: 'hover-state', //The hover state class to use, for custom CSS
    title: 'Odaberite vrijeme', //The Wickedpicker's title,
    showSeconds: false, //Whether or not to show seconds,
    timeSeparator: ' : ', // The string to put in between hours and minutes (and seconds)
    secondsInterval: 1, //Change interval for seconds, defaults to 1,
    minutesInterval: 30, //Change interval for minutes, defaults to 1
    beforeShow: null, //A function to be called before the Wickedpicker is shown
    afterShow: null, //A function to be called after the Wickedpicker is closed/hidden
    show: null, //A function to be called when the Wickedpicker is shown
    clearable: false, //Make the picker's input clearable (has clickable "x")
});

function setTypes() {
    let tip = document.getElementById("tip");
    for (let i = 0; i < tipovi.tipovi.length; i++) {
        let opt = document.createElement("option");
            opt.value = tipovi.tipovi[i]['naziv'];
            opt.innerHTML = tipovi.tipovi[i]['naziv'];
            tip.appendChild(opt);
    }
}

function setDays() {
    let dan = document.getElementById("dan");
    for (let i = 0; i < dani.dani.length; i++) {
        let opt = document.createElement("option");
        opt.value = dani.dani[i]['naziv'];
        opt.innerHTML = dani.dani[i]['naziv'];
        dan.appendChild(opt);
    }
}

async function getSubjectsRequest() {
    await fetch("/v2/predmet", {
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        predmeti = data;
    });
}

async function getGroupsRequest() {
    await fetch("/v2/grupa", {
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        grupe = data;
    });
}

function loadPage() {
    getSubjectsRequest();

    fetch("/v2/aktivnost",{
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        aktivnosti = data;
    });

    fetch("/v2/tip",{
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        tipovi = data;
        setTypes();
    });

    fetch("/v2/dan",{
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        dani = data;
        setDays();
    });
    getGroupsRequest();
}

function findIdOfDayType(dan, tip) {
    let danId = dani.dani.filter(s => s['naziv'] === dan.toString())[0]['id'];
    let tipId = tipovi.tipovi.filter(s => s['naziv'] === tip.toString())[0]['id'];
    return {danId, tipId};
}

async function createSubjectRequest(nazivPredmeta) {
    let obj = {naziv: nazivPredmeta};
    await fetch("/v2/predmet", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    });
}

async function createGroupRequest(nazivGrupe, predmetId) {
    let obj = {naziv: nazivGrupe, predmet: predmetId};
    await fetch("/v2/grupa", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    });
}

async function sendRequestForSubjectDelete(nazivPredmeta, predmetId) {
    let obj = {naziv: nazivPredmeta}
    await fetch("/v2/predmet/" + predmetId, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    });
}

async function sendRequestForGroupDelete(nazivPredmeta, predmetId) {
    let obj = {naziv: nazivPredmeta}
    await fetch("/v2/grupa/" + predmetId, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    });
}

async function sendPostRequestForActivity(akt, nazivGrupe, nazivPredmeta, predmetId) {
    await fetch("/v2/aktivnost", {
         method: "POST",
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(akt)
     }).then(response => response.json())
        .then(data => {
            console.log(data.message)
           if(data.message === "Aktivnost nije validna!") {
               sendRequestForGroupDelete(nazivGrupe, predmetId);
               sendRequestForSubjectDelete(nazivPredmeta, predmetId)
           } else {
               console.log("Dodavanje aktivnosti uspješno!");
           }
        });
 }

// async function sendPostRequestForActivity(akt, nazivPredmeta, addedSubject, predmetId) {
//     await fetch("/v2/aktivnost", {
//          method: "POST",
//          headers: {
//              'Content-Type': 'application/json',
//          },
//          body: JSON.stringify(akt)
//      }).then(response => response.json())
//         .then(data => {
//             console.log(data.message)
//             console.log(addedSubject)
//            if(data.message === "Aktivnost nije validna!" && addedSubject === true) {
//                sendRequestForSubjectDelete(nazivPredmeta);
//            } else {
//                console.log("Dodavanje aktivnosti uspješno!");
//            }
//         });
//  }
document.getElementById("submit").addEventListener("click", async function () {
   let nazivPredmeta = document.getElementById("nazivPredmeta").value;
   let nazivGrupe = document.getElementById("nazivGrupe").value;
   let tip = document.getElementById("tip").value;
   let dan = document.getElementById("dan").value;

   let addedSubject = false;
   let addedGroup = false;
   // let findSubject = predmeti.predmeti.find(element => element["naziv"] === nazivPredmeta.toString());
   let predmetId = predmeti.predmeti.filter(s=> s['naziv'] === nazivGrupe.toString());
   if(predmetId.length !== 0) {
       predmetId = predmeti.predmeti.filter(s=> s['naziv'] === nazivGrupe.toString())[0]['id'];
   } else {
       //kreiraj predmet
       addedSubject = true;
       await createSubjectRequest(nazivPredmeta);
       //nadji mu sad id
       await getSubjectsRequest();
       console.log(predmeti)
       predmetId = predmeti.predmeti[predmeti.predmeti.length - 1]['id'];
       console.log(predmetId);
   }
   let grupaId = grupe.grupe.filter(s => s['naziv'] === nazivGrupe.toString() && s['predmet'] === predmetId);
   if(grupaId.length !== 0) {
       grupaId = grupe.grupe.filter(s => s['naziv'] === nazivGrupe.toString() && s['predmet'] === predmetId)[0]['id'];
   } else {
       //kreiraj grupu s nazivom i predmetId
       addedGroup = true;
       await createGroupRequest(nazivGrupe, predmetId);
       await getGroupsRequest();
       console.log(grupe)
       grupaId = grupe.grupe[grupe.grupe.length - 1]['id'];
   }
   let obj = {naziv: nazivPredmeta};

   function setTime() {
        let splittedStart = document.getElementById("pocetak").value.toString().split(":");
        let pocetak = Number(splittedStart[0]);

        if (Number(splittedStart[1]) !== 0)
            pocetak += 0.5;

        let splittedEnd = document.getElementById("kraj").value.toString().split(":");
        let kraj = Number(splittedEnd[0]);
        if (Number(splittedEnd[1]) !== 0)
            kraj += 0.5;
        return {pocetak, kraj};
   }
   let {pocetak, kraj} = setTime();

   //naci cu id tipa, dana, grupe i send request za kreiranje aktivnosti
    let {danId, tipId} = findIdOfDayType(dan, tip);

   let akt = {naziv: nazivPredmeta, pocetak: pocetak, kraj: kraj, predmet: predmetId, dan: danId, grupa: grupaId, tip: tipId};

   // await sendPostRequestForActivity(akt, nazivPredmeta, addedSubject, predmetId);
    await sendPostRequestForActivity(akt, nazivGrupe, nazivPredmeta, predmetId);

    //ukoliko je vratio poruku da nije uspjeno dodavanje, onda obrisi grupu i ocekivano kaskadno predmet
    //inace ispisi poruku da je sve oke

   //
   // if ((pocetak > 0 && pocetak < 24) &&
   //     (kraj > 0 && kraj < 24) &&
   //     (kraj > pocetak)) {
   //     aktivnosti.push(akt);
   // }
   //
   // let findActivity = aktivnosti.find(element =>
   //     element["naziv"] === nazivPredmeta.toString() && element["tip"] === tip.toString()
   //     && element["pocetak"].toString() === pocetak.toString() && element["kraj"].toString() === kraj.toString()
   //     && element["dan"] === dan.toString()
   // );
   //
   //
   //   async function sendDeleteRequest(nazivPredmeta) {
   //       let url = "/v1/predmet/"+nazivPredmeta.toString();
   //       await fetch(url, {
   //          method: "DELETE",
   //          headers: {
   //              'Content-Type': 'application/json',
   //          },
   //          body: JSON.stringify(obj)
   //      });
   //  }
   //  if(findActivity === undefined && addedSubject === true) {
   //       await sendDeleteRequest(nazivPredmeta);
   //  }
});