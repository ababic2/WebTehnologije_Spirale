let assert = chai.assert;
describe('Raspored', function() {
    describe('iscrtajRaspored()', function() {

        it('start time cannot be negative', function() {
            let okvir2 = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir2, ["Ponedjeljak", "Utorak", "Srijeda"], -1, 21);
            let result = false;
            if(okvir2.children[0].textContent === "Greška") {
                result = true;
            } else {
                result = false;
            }
            assert.equal(result, true,"vrijeme ne smije biti negativno");
        });
        it('end time cannot be negative', function() {
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda"], 8, -21);
            let result = false;
            if(okvir.children[0].textContent === "Greška") {
                result = true;
            } else {
                result = false;
            }
            assert.equal(result, true,"krajnje vrijeme ne smije biti negativno");
        });

        it('start time should be integer', function() {
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda"], 8.5, 21);
            let result = false;
            if(okvir.children[0].textContent === "Greška") {
                result = true;
            } else {
                result = false;
            }
            assert.equal(result, true,"vrijeme treba biti integer");
        });
        it('end time should be integer', function() {
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda"], 8, -21);
            let result = false;
            if(okvir.children[0].textContent === "Greška") {
                result = true;
            } else {
                result = false;
            }
            assert.equal(result, true,"krajnje vrijeme treba biti integer");
        });
        it('start time should be less than end time', function() {
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda"], 12, 8);
            let result = false;
            if(okvir.children[0].textContent === "Greška") {
                result = true;
            } else {
                result = false;
            }
            assert.equal(result, true,"pocetno vrijeme treba biti manje od krajnjeg");
        });

        it('should draw 6(days + time) rows when there are 5 days', function() {
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            assert.equal(redovi.length, 6,"Broj redova treba biti 6");
        });
        it('should draw 1(days + time) rows when array of days is empty', function() {
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, [], 8, 21);
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            assert.equal(redovi.length, 1,"Broj redova treba biti 1");
        });
        it('should draw 9 columns when is set 5 days and time from 8 to 12', function() {
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 12);
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[2].getElementsByTagName("td");
            let brojPrikazanih = 0;
            for(let i=0;i<kolone.length;i++){
                let stil = window.getComputedStyle(kolone[i])
                if(stil.display!=='none') brojPrikazanih++;
            }
            assert.equal(brojPrikazanih, 9,"Broj kolona treba biti 9");
        });
        it('should draw 23 columns when is set 3 days and time from 9 to 20', function() {
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda"], 9, 20);
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[2].getElementsByTagName("td");
            let brojPrikazanih = 0;
            for(let i=0;i<kolone.length;i++){
                let stil = window.getComputedStyle(kolone[i])
                if(stil.display!=='none') brojPrikazanih++;
            }
            assert.equal(brojPrikazanih, 23,"Broj kolona treba biti 23");
        });
        it('display time only for values 8, 10, 12', function() {
            // prikazuju se vremena ako je vrijednost jedna od sljedecih
            // 0,2,4,6,8,10,12,15,17,19,21,23
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda"], 8, 21);
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[0].getElementsByTagName("td");
            let result = true;
            for(let i = 0;i < kolone.length; i++){
                result = kolone[i].children[0].textContent === "08:00" ||
                    kolone[i].children[0].textContent === "10:00" ||
                    kolone[i].children[0].textContent === "12:00" ||
                    kolone[i].children[0].textContent === "";
                if(result === false) break;
            }
            assert.equal(result, true,"Trebaju  biti prikazana vremena samo za vrijednosti 8,10,12");
        });
        it('do not display time only for value 21', function() {
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda"], 8, 21);
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[0].getElementsByTagName("td");
            let result = true;
                for(let i = 0;i < kolone.length; i++) {
                if (i === kolone.length - 1) {
                    if (kolone[i].children[0].textContent === "") {
                        result = true;
                    } else {
                        result = false;
                        break;
                    }
                }
            }
            assert.equal(result, true,"Ne treba biti prikazano vrijeme za vrijednost 21 jer je zadnja");
        });
    });
});
