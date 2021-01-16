let body = document.getElementsByTagName("body");
let grupe = undefined;
let grupaId = undefined;

function setOptions() {
    let select = document.getElementsByTagName("select")[0];
    for (let i = 0; i < grupe.grupe.length; i++) {
        let opt = document.createElement("option");
        opt.value = grupe.grupe[i]['naziv'];
        opt.innerHTML = grupe.grupe[i]['naziv']; // whatever property it has
        select.appendChild(opt);
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

async function findGroupForJunctionTable(grupa) {
    await fetch("/v2/grupa/"+grupa.toString(), {
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        grupaId = data.grupa['id'];
    });
}

document.getElementById("send").addEventListener("click", async function () {
    let textarea = document.getElementById("textarea").value;
    let grupa = document.getElementById("mySelect").value;
    let newStudents = createArrayOfNewStudents(textarea, grupa);
    let messages = [];
    let newText = "";
    for(let i = 0; i < newStudents.length; i++) {
        await fetch("/v2/student", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudents[i])
        }).then(response => response.json())
            .then(data => {
            messages.push(data);
            newText += data.message + "\n";
            });
    }
    document.getElementById("textarea").value = newText;
    await findGroupForJunctionTable(grupa);
});