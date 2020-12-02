let assert = chai.assert;
describe('Raspored', function() {
    describe('dodajAktivnost()', function() {
        it('table not created', function() {
            let okvir = document.getElementById("okvir4");
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, 25, "Ponedjeljak");
            let tabele = okvir.getElementsByTagName("table").length;
            let result = false;
            if(tabele === 0) result = true;
            assert.equal(result, true,"cannot add lecture if there is no schedule");
        });

        it('table not created-message', function() {
            let okvir = document.getElementById("okvir4");
            let poruka =
                Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, 25, "Ponedjeljak");
            let ocekivano = "Greška - raspored nije kreiran";
            let result = false;
            if(poruka === ocekivano) result = true;
            assert.equal(result, true,"cannot add lecture if there is no schedule");
        });

        it('should add lecture starting at 10, ending at 12', function() {
            let okvir = document.getElementById("okvir");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, 12, "Ponedjeljak");
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[1].getElementsByTagName("td");
            let result = false;
            for(let i = 0; i < kolone.length; i++){
                if(i === 5) {
                    if(kolone[i].textContent === "WTpredavanje")
                        result = true;
                }
            }
            assert.equal(result, true,"should add lecture starting at 10, ending at 12");
        });

        it('should add lecture starting at 14.5, ending at 17', function() {
            let okvir = document.getElementById("okvir2");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, 12, "Srijeda");
            Raspored.dodajAktivnost(okvir, "RMA", "predavanje", 14.5, 17, "Ponedjeljak");
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[1].getElementsByTagName("td");
            let result = false;
            for(let i = 0; i < kolone.length; i++){
                if(i === 14) {
                    if(kolone[i].textContent === "RMApredavanje")
                        result = true;
                }
            }
            assert.equal(result, true,"should add lecture starting at 10, ending at 12");
        });

        it('validation of start time - decimal type', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10.6, 12, "Ponedjeljak");
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[1].getElementsByTagName("td");
            let result = true;
            for(let i = 0; i < kolone.length; i++){
                if(i === 1) {
                    if(kolone[i].textContent === "WTpredavanje")
                        result = false;
                }
            }
            assert.equal(result, true,"time is integer or has format x.5");
        });

        it('validation of start time - decimal type - message', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            let poruka =
                Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10.6, 12, "Ponedjeljak");
            let ocekivano = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
            let result = false;
            if(poruka === ocekivano) result = true;
            assert.equal(result, true,"time is integer or has format x.5");
        });

        it('validation of start time - negative', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", -10, 12, "Ponedjeljak");
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[1].getElementsByTagName("td");
            let result = true;
            for(let i = 0; i < kolone.length; i++){
                if(i === 1) {
                    if(kolone[i].textContent === "WTpredavanje")
                        result = false;
                }
            }
            assert.equal(result, true,"time cannot be negative");
        });

        it('validation of start time - negative - message', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            let poruka =
                Raspored.dodajAktivnost(okvir, "WT", "predavanje", -10, 12, "Ponedjeljak");
            let ocekivano = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin"
            let result = false;
            if(poruka === ocekivano) result = true;
            assert.equal(result, true,"time cannot be negative");
        });


        it('validation of start time - bigger than 24', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 25, 12, "Ponedjeljak");
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[1].getElementsByTagName("td");
            let result = true;
            for(let i = 0; i < kolone.length; i++){
                if(i === 1) {
                    if(kolone[i].textContent === "WTpredavanje")
                        result = false;
                }
            }
            assert.equal(result, true,"time out of range");
        });

        it('validation of start time - bigger than 24 - message', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            let poruka =
                Raspored.dodajAktivnost(okvir, "WT", "predavanje", 25, 12, "Ponedjeljak");
            let ocekivano = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
            let result = false;
            if(ocekivano === poruka) result = true;
            assert.equal(result, true,"time out of range");
        });

        it('validation of start time - bigger than end time', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 15, 12, "Ponedjeljak");
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[1].getElementsByTagName("td");
            let result = true;
            for(let i = 0; i < kolone.length; i++){
                if(i === 1) {
                    if(kolone[i].textContent === "WTpredavanje")
                        result = false;
                }
            }
            assert.equal(result, true,"time cannot be negative");
        });

        it('validation of start time - bigger than end time - message', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            let poruka =
                Raspored.dodajAktivnost(okvir, "WT", "predavanje", 15, 12, "Ponedjeljak");
            let ocekivano = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
            let result = false;
            if(poruka === ocekivano) result = true;
            assert.equal(result, true,"time cannot be negative");
        });

        it('validation of end time - negative', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, -12, "Ponedjeljak");
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[1].getElementsByTagName("td");
            let result = true;
            for(let i = 0; i < kolone.length; i++){
                if(i === 1) {
                    if(kolone[i].textContent === "WTpredavanje")
                        result = false;
                }
            }
            assert.equal(result, true,"time cannot be negative");
        });

        it('validation of end time - negative - message', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            let poruka =
                Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, -12, "Ponedjeljak");
            let ocekivano = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
            let result = false;
            if(poruka === ocekivano) result = true;
            assert.equal(result, true,"time cannot be negative");
        });

        it('validation of end time - decimal type', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, 12.8, "Ponedjeljak");
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[1].getElementsByTagName("td");
            let result = true;
            for(let i = 0; i < kolone.length; i++){
                if(i === 1) {
                    if(kolone[i].textContent === "WTpredavanje")
                        result = false;
                }
            }
            assert.equal(result, true,"time is integer or has format x.5");
        });

        it('validation of end time - decimal type - message', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            let poruka =
                Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, 12.8, "Ponedjeljak");
            let ocekivano = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
            let result = false;
            if(poruka === ocekivano) result = true;
            assert.equal(result, true,"time is integer or has format x.5");
        });

        it('validation of end time - bigger than 24', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, 25, "Ponedjeljak");
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[1].getElementsByTagName("td");
            let result = true;
            for(let i = 0; i < kolone.length; i++){
                if(i === 1) {
                    if(kolone[i].textContent === "WTpredavanje")
                        result = false;
                }
            }
            assert.equal(result, true,"time out of range");
        });

        it('matching terms', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, 25, "Ponedjeljak");
            Raspored.dodajAktivnost(okvir, "RG", "predavanje", 10, 25, "Ponedjeljak");
            let tabele = document.getElementsByTagName("table");
            let tabela = tabele[tabele.length-1]
            let redovi = tabela.getElementsByTagName("tr");
            let kolone = redovi[1].getElementsByTagName("td");
            let result = true;
            for(let i = 0; i < kolone.length; i++){
                if(i === 1) {
                    if(kolone[i].textContent === "RGpredavanje")
                        result = false;
                }
            }
            assert.equal(result, true,"lectures cannot match by terms");
        });

        it('matching terms - message', function() {
            let okvir = document.getElementById("okvir3");
            Raspored.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
            Raspored.dodajAktivnost(okvir, "WT", "predavanje", 10, 25, "Ponedjeljak");
            let poruka =
                Raspored.dodajAktivnost(okvir, "RG", "predavanje", 10, 25, "Ponedjeljak");
            let ocekivano = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
            let result = false;
            if(poruka === ocekivano) result = true;
            assert.equal(result, true,"lectures cannot match by terms");
        });
    });
});
