let assert = chai.assert;
describe('Raspored', function() {
    describe('dodajAktivnost()', function() {
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


    });
});
