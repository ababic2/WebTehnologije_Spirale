function poziv1() {
    let okvir = document.getElementById("okvir");
    iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
    dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
    dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
    dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
    dodajAktivnost(okvir, "LD", "tutorijal", 17.5, 19.5, "Ponedjeljak");
    dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
    dodajAktivnost(okvir, "DM", "tutorijal", 14, 16, "Utorak");
    dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
}
poziv1();

function poziv2() {
    let okver = document.getElementById("okviir");
    iscrtajRaspored(okver, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 9, 21);
    dodajAktivnost(okver, "WT", "predavanje", 10, 12, "Ponedjeljak");
    dodajAktivnost(okver, "WT", "vježbe", 13, 14, "Ponedjeljak");
    dodajAktivnost(okver, "RMA", "predavanje", 14.5, 17, "Ponedjeljak");
    dodajAktivnost(okver, "LD", "tutorijal", 17, 19.5, "Ponedjeljak");
    dodajAktivnost(okver, "RMA", "vježbe", 12.5, 14, "Utorak");
    dodajAktivnost(okver, "DM", "tutorijal", 14, 16, "Utorak");
    dodajAktivnost(okver, "DM", "predavanje", 16, 19, "Utorak");
}
poziv2()