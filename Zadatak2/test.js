let assert = chai.assert;
describe('Raspored', function() {
    describe('iscrtajRaspored()', function() {

        // PROVJERA ISCRTAVANJA REDOVA I KOLONA
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
    });
});
