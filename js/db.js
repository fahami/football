var dbPromised = idb.open("footmatch", 1, (upgradeDb) => {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "tla"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
});

saveTeam = (team) => {
    dbPromised.then(db => {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.add(team);
        return tx.complete;
    }).then(_ => {
        console.log("Tim favorit berhasil disimpan");
    })
};

getAll = _ => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.getAll();
        }).then(teams => {
            console.log(teams);
            resolve(teams);
        })
    })
}
getById = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            console.log(id);
            return store.get(id.toString());
        }).then((team) => {
            console.log(team);
            resolve(team);
        });
    });
}