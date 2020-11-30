let Raspored = (function () {
    var pocetakSata;
    var krajSata;
    var cellsInitial = []
    let mapa = new Map()

    const fillArrayOfHours = function(startTime, endTime) {
        let hours = [];
        let j = 0
        for (let i = startTime; i < endTime; i++) {
            let build = "";
            let half = "";
            if (/^\d$/.test(i)) {
                build += "0";
                half += "0";
            }
            build += i.toString() + ":" + "00";
            half += i.toString() + ":" + "30";
            hours.push(build);
            hours.push(half)
            let cell = {
                start: i,
                end: i + 0.5,
                index: j + 1
            };
            cellsInitial.push(cell)
            j++;
            cell = {
                start: i + 0.5,
                end: i + 1,
                index: j + 1
            };
            cellsInitial.push(cell)
            j++;
        }

        function setMapAndDeepCopyOfArrays() {
            mapa.set(0, JSON.parse(JSON.stringify(cellsInitial)))
            mapa.set(1, JSON.parse(JSON.stringify(cellsInitial)))
            mapa.set(2, JSON.parse(JSON.stringify(cellsInitial)))
            mapa.set(3, JSON.parse(JSON.stringify(cellsInitial)))
            mapa.set(4, JSON.parse(JSON.stringify(cellsInitial)))
        }

        setMapAndDeepCopyOfArrays();
        cellsInitial = [];
        return hours;
    }

    const showHour = function (sat) {
        let result = sat.split(":");
        let i = 0;
        if ((result[i] === "00" || result[i] === "02" || result[i] === "04" || result[i] === "06" || result[i] === "08"
            || result[i] === "10" || result[i] === "12" || result[i] === "15" || result[i] === "17" || result[i] === "19"
            || result[i] === "21" || result[i] === "23") && result[1] === "00") {
            return true;
        }
        return false;
    }

    const setTimeOnTable = function(j, hours, tr) {
        let div = document.createElement("div");
        let headerCell = document.createElement("th");
        if (j !== 0) {
            headerCell.className = "leftShift";
            headerCell.appendChild(div);

            if (showHour(hours[j - 1]) && j != 26) {
                div.appendChild(document.createTextNode(hours[j - 1].toString()));
            } else {
                div.appendChild(document.createTextNode(""));
            }
        }
        tr.appendChild(headerCell);
        return {headerCell, div};
    }

    const setDaysOnTable = function(tr, i, dani) {
        let td = tr.insertCell();
        td.className = "days";
        if (i === 1) {
            td.innerHTML = dani[i - 1].bold();
        } else {
            td.innerHTML = dani[i - 1];
        }
        return td;
    }

    const numberOfCells = function(startTime, endTime) {
        let count = 0
        for (let i = startTime; i <= endTime; i += 0.5) {
            count++;
        }
        return count;
    }

    const iscrtajRaspored = function(okvir, dani, satPocetak, satKraj) {
        function timeValidation() {
            if (satPocetak >= satKraj ||
                (satPocetak < 0 || satPocetak > 24) ||
                (satKraj < 0 || satKraj > 24) ||
                !Number.isInteger(satKraj) ||
                !Number.isInteger(satPocetak)) {
                return false;
            }
            return true;
        }

        if (timeValidation()) {
            let td;
            pocetakSata = satPocetak;
            krajSata = satKraj;
            var body = document.body;
            let tbl = document.createElement("table");
            okvir.appendChild(tbl);
            tbl.className = "table";

            let sati = fillArrayOfHours(satPocetak, satKraj);
            showHour(sati[0]);
            for (let i = 0; i <= dani.length; i++) {
                let tr = tbl.insertRow();
                for (let j = 0; j < numberOfCells(satPocetak, satKraj); j++) {
                    if (i === 0) {
                        let {headerCell, div} = setTimeOnTable(j, sati, tr);
                    } else if (i !== 0 && j === 0) {
                        td = setDaysOnTable(tr, i, dani);
                    } else {
                        td = tr.insertCell();
                        if (j % 2 !== 0) {
                            td.className = "rightDashed";
                        } else {
                            td.className = "leftDashed";
                        }
                    }
                }
            }
            body.appendChild(okvir);
        } else {
            okvir.appendChild(document.createTextNode("Greška"));
        }
    }

    const defineBorders = function(timeStart, timeEnd) {
        let s = "";
        if (!Number.isInteger(timeStart) && !Number.isInteger(timeEnd)) {
            s = "rightLeftDashed";
        } else if (Number.isInteger(timeStart) && Number.isInteger(timeEnd)) {
            s = "allSolid";
        } else if (!Number.isInteger(timeStart) && Number.isInteger(timeEnd)) {
            s = "leftDashed";
        } else if (Number.isInteger(timeStart) && !Number.isInteger(timeEnd)) {
            s = "rightDashed";
        }
        return s;
    }

    const setSpanAndDeleteNeedlessCells = function(raspored, x, startCell, buildName, endCell, row, count) {
        x[startCell].innerHTML = buildName;
        x[startCell].colSpan = count;

        let cells = raspored.getElementsByTagName("table")[0].rows[row].cells;
        let specificRow = raspored.getElementsByTagName("table")[0].rows[row];
        for (let i = 1; i < count; i++) {
            specificRow.deleteCell(cells.length - i);
        }
    }

    const findMatchingRowForDay = function(dan) {
        let row = 0;
        for (let i = 1; i <= 5; i++) {
            let x = document.getElementsByTagName("table")[0].rows[i].cells;
            if (i === 1) {
                if (x[0].children[0].innerHTML === dan.toString()) {
                    row = i;
                    break;
                }
            } else {
                if (x[0].innerHTML === dan.toString()) {
                    row = i;
                    break;
                }
            }
        }
        return row;
    }

    const clearAllBordersInRow = function(raspored, row, cells) {
        let tableRows = raspored.getElementsByTagName("table")[0].getElementsByTagName("tr");
        for (let i = 1; i < tableRows.length; i++) {
            let y = tableRows[i].getElementsByTagName("td");
            for (let j = 1; j < y.length; j++) {
                if (i === row) {
                    for (let k = 0; k < cells.length; k++)
                        if (j === cells[k].index) {
                            y[j].className = "clearAll";
                            break;
                        }
                }
            }
        }
        return tableRows;
    }

    const dodajAktivnost = function (raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
        if (raspored.getElementsByTagName("table").length === 0) {
            window.alert("Greška-raspored nije kreiran")
        } else {
            if ((vrijemePocetak > 0 && vrijemePocetak < 24) &&
                (vrijemeKraj > 0 && vrijemeKraj < 24) &&
                (vrijemeKraj > vrijemePocetak) &&
                (Number.isInteger(vrijemePocetak) || ((vrijemePocetak * 10) % 10 === 5)) &&
                (Number.isInteger(vrijemeKraj) || ((vrijemeKraj * 10) % 10 === 5))) {
                let buildName = naziv.bold() + "<br />" + tip.toString();
                let startCell = -1;
                let endCell = -1;
                let exist = false;
                let deleteFrom = 0;
                let deleteTo = 0;
                let count = 0;

                let row = findMatchingRowForDay(dan);
                let cells = mapa.get(row);

                function findStartEndIndexForCell() {
                    for (let i = 0; i < cells.length; i++) {
                        if (cells[i].start === vrijemePocetak) {
                            startCell = cells[i].index;
                            for (let j = i; j < cells.length; j++) {
                                if (cells[j].end === vrijemeKraj) {
                                    endCell = cells[j].index;
                                    deleteTo = j;
                                    exist = true;
                                    break;
                                }
                            }
                            //if(!exist) alert
                            if (exist) {
                                deleteFrom = i;
                                break;
                            }
                        }
                    }
                }

                findStartEndIndexForCell();

                if (startCell === -1 || endCell === -1) {
                    window.alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin")
                } else {
                    let tableRows = clearAllBordersInRow(raspored, row, cells);

                    function findSpan() {
                        let found = false;
                        for (let i = 0; i < cells.length; i++) {
                            if (cells[i].index === startCell) {
                                count++;
                                for (let j = i; j < cells.length; j++) {
                                    if (cells[j].index === endCell) {
                                        found = true;
                                        break;
                                    }
                                    count++;
                                }
                            }
                            if (found === true) break;
                        }
                    }

                    findSpan();

                    function updateInnerIndexOfArrayObjects() {
                        let step = 1;
                        for (let i = deleteTo + 1; i < cells.length; i++) {
                            cells[i].index = startCell + step;
                            step++;
                        }
                    }

                    updateInnerIndexOfArrayObjects();

                    //obrisi u nizu iskoristene celije
                    cells.splice(deleteFrom, count)

                    let x = raspored.getElementsByTagName("table")[0].rows[row].cells;
                    setSpanAndDeleteNeedlessCells(raspored, x, startCell, buildName, endCell, row, count);

                    function updateBorders() {
                        //skip from cells array
                        for (let i = 1; i < tableRows.length; i++) {
                            var y = tableRows[i].getElementsByTagName("td")
                            for (let j = 1; j < y.length; j++) {
                                if (j % 2 !== 0) {
                                    if (i === row) {
                                        for (let k = 0; k < cells.length; k++)
                                            if (j === cells[k].index) {
                                                y[j].className = defineBorders(cells[k].start, cells[k].end);
                                                break;
                                            }
                                    }
                                } else {
                                    if (i === row) {
                                        for (let k = 0; k < cells.length; k++)
                                            if (j === cells[k].index) {
                                                y[j].className = defineBorders(cells[k].start, cells[k].end);
                                                break;
                                            }
                                    }
                                }
                            }
                        }
                    }

                    updateBorders();
                    let s = defineBorders(vrijemePocetak, vrijemeKraj);
                    x[startCell].className = s;
                    x[startCell].style.backgroundColor = "#dee6ef";
                }
            } else {
                window.alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin")
            }
        }
    }
    return {
        iscrtajRaspored : iscrtajRaspored,
        dodajAktivnost : dodajAktivnost
    }
} ());

