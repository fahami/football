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
        store.add(team);
        return tx.complete;
    }).then(_ => {
        M.toast({html:'Subscribed to '+ team.name})
    })
};

deleteTeam = (team) => {
    dbPromised.then(db => {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.delete(team);
        return tx.complete;
    }).then(_ => {
        M.toast({html: 'Successfully deleted'})
        getSubsList();
    })
}

getAll = _ => {
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
getById = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.get(id.toString());
        }).then((team) => {
            resolve(team);
        });
    });
}


insertTeam = _ => {
    const teamIds = document.querySelector("#clubId").value;
    getSubsId(teamIds);
}

getSubsList = _ => {
    getAll().then(teams => {
        var teamHTML = "";
        teams.forEach(team => {
            teamHTML += `
            <tr>
              <td>${team.name}</td>
              <td>${team.founded}</td>
              <td>${team.venue}</td>
              <td>
                <button id="${team.id}" onClick="deleteTeam('${team.tla}')" class="waves-effect waves-light btn btn-floating removeButton">
                  <i class="material-icons right">delete</i>
                </button>
              </td>
            </tr>`;
        });
        document.getElementById("subscriptions").innerHTML = teamHTML;
    })
};