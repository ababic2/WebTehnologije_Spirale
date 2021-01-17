let body = document.getElementsByTagName("body");
let grupe = undefined;

function setOptions() {
    let select = document.getElementsByTagName("select")[0];
    for (let i = 0; i < grupe.grupe.length; i++) {
        let opt = document.createElement("option");
        fetch("/v2/predmet/"+grupe.grupe[i]['predmet'], {
            method: "GET"
        }).then(response => {
            return response.json();
        }).then(data => {
            opt.value = data.predmet['id'] + "," + grupe.grupe[i]['naziv'];
            opt.innerHTML = data.predmet['id'] + "," + grupe.grupe[i]['naziv']; // whatever property it has
            select.appendChild(opt);
        });
    }
}
//prilikom učitavanja stranice neka pokupi sve grupe i postavi u select tag
function loadPage() {
    fetch("/v2/grupa", {
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        grupe = data;
        setOptions();
    });
}

function createArrayOfNewStudents(textarea, grupa) {
    let result = [];
    let splitted = textarea.toString().split("\n");
    for (let i = 0; i < splitted.length; i++) {
        let splitLine = splitted[i].split(",");
        if(splitLine[0] !== "") {
            let student = {"ime":splitLine[0], "indeks":splitLine[1]}
            result.push(student);
        }
    }
    return result;
}

function findIdOfGroupForJunctionTable(grupa, predmet) {
    for(let i = 0; i < grupe.grupe.length; i++) {
        if(grupe.grupe[i]['naziv'] === grupa && grupe.grupe[i]['predmet'] === predmet) {
            return grupe.grupe[i]['id'];
        }
    }
}

async function findAddedSIdForJunctionTable(students, dodani) {
    let indeksi = [];
    for (let i = 0; i < dodani.length; i++) {
        indeksi.push(students[dodani[i]]['indeks']);
    }
    let result = [];
    for (let i = 0; i < indeksi.length; i++) {
        await fetch("/v2/student/" + indeksi[i], {
            method: "GET"
        }).then(response => {
            return response.json();
        }).then(data => {
            result.push(data.student['id']);
        });
    }
    return result;
}

function createInJunctionTable(junctionGroup, addedStudents) {
    for(let i = 0; i < addedStudents.length; i++) {
        let obj = {StudentId: addedStudents[i], GrupaId: junctionGroup}
        fetch("/v2/junction/" + addedStudents[i] + "/" + junctionGroup, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });
    }
}

function compareNewAndOldPredmetId(studentAndGroup, predmetId, junctionGroup) {
    let result = undefined;
    for(let i = 0; i < studentAndGroup.length; i++) {
        result = grupe.grupe.filter(s => s['id'] === studentAndGroup[i]['GrupaId'] && s['predmet'] === Number(predmetId));
        // result = studentAndGroup.filter(s => s['predmet'] === Number(predmetId));
        console.log("EHEHEHEHE " )
        if (result !== null && result !== undefined) {
            //promijeni predmet u junction tabeli
            let obj = {StudentId: studentAndGroup[i]['StudentId'], GrupaId: junctionGroup};
            fetch("/v2/junction/" + studentAndGroup[i]['StudentId'] + "/" + studentAndGroup[i]['GrupaId'], {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            });
            break;
        }
    }
}

async function findStudentsForGroupChange(students, postojeci, junctionGroup, predmetId) {
    let studentAndGroup = [];
    let studenti = await findAddedSIdForJunctionTable(students, postojeci);
    console.log("EVVVVVVVVVVVVVV")
    console.log(studenti)
    for (let i = 0; i < postojeci.length; i++) {
         fetch("/v2/junction", {
            method: "GET"
        }).then(response => {
            return response.json();
        }).then(data => {
            studentAndGroup = data.tipovi.filter(s =>
                s['StudentId'] === studenti[i]
            );
                //.filter(s => (s['GrupaId'] === junctionGroup));
            console.log("hih")
            console.log(studentAndGroup)
            compareNewAndOldPredmetId(studentAndGroup, predmetId, junctionGroup);
        });
    }
    return studentAndGroup;
}

document.getElementById("send").addEventListener("click", async function () {
    let textarea = document.getElementById("textarea").value;
    let text = document.getElementById("mySelect").value;
    let grupaName = text.toString().split(",")[1];
    let predmetId = text.toString().split(",")[0];
    let newStudents = createArrayOfNewStudents(textarea, grupaName);
    console.log(newStudents)
    let postojeci = [];
    let dodani = [];
    let newText = "";
    // for(let i = 0; i < newStudents.length; i++) {
        // await fetch("/v2/student", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(newStudents[i])
        // }).then(response => response.json())
        //     .then(data => {
        //         console.log(data.message)
        //         if(data.message === "Student uspješno dodan!")
        //             dodani.push(i);
        //         else if(data.message === "Student već postoji!")
        //             postojeci.push(i);
        //     newText += data.message + "\n";
        //     });
    await fetch("/v2/nizStudent", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudents)
    }).then(response => response.json())
        .then(data => {
            console.log(data.result)
            for(let i = 0; i < data.result.length; i++) {
                    if(data.result[i] === "Student uspješno dodan!")
                        dodani.push(i);
                    else if(data.result[i] === "Student već postoji!")
                        postojeci.push(i);
                newText += data.result[i] + "\n";
            }
        });

    document.getElementById("textarea").value = newText;
    let junctionGroup = findIdOfGroupForJunctionTable(grupaName.toString(), Number(predmetId));
    let addedStudents = await findAddedSIdForJunctionTable(newStudents, dodani);
    console.log("JUNCTION GROUP")
    console.log(junctionGroup)
    console.log(addedStudents)
    createInJunctionTable(junctionGroup, addedStudents);

    let changeStudents = await findStudentsForGroupChange(newStudents, postojeci, junctionGroup, predmetId);
    console.log(changeStudents)
});