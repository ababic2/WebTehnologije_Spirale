const fs = require('fs');

class FileContent {
    readActivitiesFromFile() {
        let result = [];
        let data = fs.readFileSync('aktivnosti.txt', 'utf8');

        let splitted = data.toString().split("\n");
        for (let i = 0; i<splitted.length -1; i++) { //dodala sam ovdje -1
            let splitLine = splitted[i].split(",");

            result.push({naziv:splitLine[0], tip:splitLine[1],pocetak:splitLine[2], kraj:splitLine[3], dan:splitLine[4]});
        }
        return result;
    }
    readSubjectsFromFile() {
        let result = [];
        let data = fs.readFileSync('predmeti.txt', 'utf8');

        let splitted = data.toString().split("\n");
        for (let i = 0; i<splitted.length -1; i++) { //dodala sam ovdje -1
            result.push(splitted[i]);
        }
        return result;
    }

    readTestsFromFile() {
        let result = [];
        let data = fs.readFileSync('testniPodaci.txt', 'utf8');

        let splitted = data.toString().split("\n");
        let join = false;
        let act = "";
        for (let i = 0; i<splitted.length; i++) { //dodala sam ovdje -1
            let splitLine = splitted[i].split(",");
            if(splitLine[1].toString().substring(1,10) === "aktivnost" && splitLine[2].toString() !== "null") {
                join = true;
                act += splitLine[2] + ",";
            }
            if(join) {
                act += splitLine[3] + ","+splitLine[4] + ","+splitLine[5] + ","+splitLine[6];
                result.push({metod:splitLine[0], path:splitLine[1], in:act, out:splitLine[7]});
                act = "";
            }
            else result.push({metod:splitLine[0], path:splitLine[1], in:splitLine[2], out:splitLine[3]});
        }
        return result;
    }

}
module.exports = {
    FileContent: FileContent
}