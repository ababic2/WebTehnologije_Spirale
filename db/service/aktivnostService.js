const db = require('./../db.js');
const Aktivnost = db.aktivnost;

// Create Activity
exports.create = async (aktivnost) => {
    // Save to MySQL database
    Aktivnost.create({
        naziv: aktivnost.naziv,
        pocetak: aktivnost.pocetak,
        kraj: aktivnost.kraj
    }).then(aktivnost => {
        return aktivnost.aktivnostId;
    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;
    });
};

// FETCH all Activities
exports.findAll = () => {
    Aktivnost.find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });
};

// Find Acivity by Id
exports.findById = (aktivnostId) => {

    Aktivnost.findById(aktivnostId).then(aktivnost => {
        return aktivnost;
    }).catch(function (err) {
        console.log("findById failed with error: " + err);
        return null;

    })
};

// Update Activity
exports.update = (activity) => {
    const id = activity.aktivnostId;
    Aktivnost.update({ naziv: activity.naziv, pocetak: activity.pocetak, kraj: activity.kraj },
        { where: { aktivnostId: id } }
    ).then(() => {
        return id;
    }).catch(function (err) {
        console.log("update failed with error: " + err);
        return 0;

    });
};

// Delete a Activity based on Id
exports.delete = (aktivnostId) => {
    const id = aktivnostId;
    Aktivnost.destroy({
        where: { aktivnostId: id }
    }).then(() => {
        return id;
    }).catch(function (err) {
        console.log("delete failed with error: " + err);
        return 0;
        // handle error;
    });
};
