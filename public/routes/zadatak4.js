let body = document.getElementsByTagName("body");
let predmeti = undefined;
let aktivnosti = undefined;

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

function loadPage() {
    fetch("/predmeti",{
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        predmeti = data;
    });

    fetch("/aktivnosti",{
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        aktivnosti = data;
    });
}

document.getElementById("submit").addEventListener("click", async function () {
   let nazivPredmeta = document.getElementById("nazivPredmeta").value;
   let tip = document.getElementById("tip").value;
   let dan = document.getElementById("dan").value;
   let addedSubject = false;
   let findSubject = predmeti.find(element => element["naziv"] === nazivPredmeta.toString());
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

   let akt = {naziv: nazivPredmeta, tip: tip, pocetak: pocetak, kraj: kraj, dan: dan};
   async function sendPostRequestForSubject() {
        await fetch("/predmet", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });
    }

   if(findSubject === undefined) {
       //ako nema predmeta vec, dodaj ga
       await sendPostRequestForSubject();
       addedSubject = true;
       predmeti.push({naziv:nazivPredmeta.toString()});
   }else {
       addedSubject = false;
   }

   async function sendPostRequestForActivity() {
       await fetch("/aktivnost", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(akt)
        });
    }

   await sendPostRequestForActivity();

   if ((pocetak > 0 && pocetak < 24) &&
       (kraj > 0 && kraj < 24) &&
       (kraj > pocetak)) {
       aktivnosti.push(akt);
   }

   let findActivity = aktivnosti.find(element =>
       element["naziv"] === nazivPredmeta.toString() && element["tip"] === tip.toString()
       && element["pocetak"].toString() === pocetak.toString() && element["kraj"].toString() === kraj.toString()
       && element["dan"] === dan.toString()
   );


     async function sendDeleteRequest(nazivPredmeta) {
         let url = "/predmet/"+nazivPredmeta.toString();
         await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });
    }
    if(findActivity === undefined && addedSubject === true) {
         await sendDeleteRequest(nazivPredmeta);
    }
});