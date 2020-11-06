var dbPromised = idb.open("footmatch", 1, (upgradeDb) => {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
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
    }).then(() => {
        console.log("Tim favorit berhasil disimpan");
    })
};
getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.getAll();
        }).then(teams => {
            resolve(teams);
        })
    })
}