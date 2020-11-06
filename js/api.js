var base_url = "https://api.football-data.org/v2/";
status = (res) => {
  if (res.status != 200) {
    console.error("Error : " + res.status);
    return Promise.reject(new Error(res.statusText));
  } else {
    return Promise.resolve(res);
  }
}
json = (res) => {
  return res.json();
}
error = (err) => {
  console.error(`Error : ${err}`);
}
getTeams = () => {
  var teams = [];
  fetch(base_url + "competitions/2021/teams", { headers: { "X-Auth-Token": "126082a1d2054f8fb241c26d07386da3" } })
    .then(status)
    .then(json)
    .then(data => {
      data.teams.forEach(team => {
        teams.push(team);
      });
      return teams;
    })
    .then(_ => {
      fetch(base_url + "competitions/2021/matches", { headers: { "X-Auth-Token": "126082a1d2054f8fb241c26d07386da3" } })
        .then(status)
        .then(json)
        .then(data => {
          var champLeagueHTML = "";
          data.matches.forEach(match => {
            teams.forEach((tim) => {
              if ((match.homeTeam.id == tim.id) && (tim.crestUrl != null)) {
                champLeagueHTML += `
                                    <div class="card-panel center-align">
                                        <p class="card-title">Premiere League</p>
                                        <div class="row">
                                        <div class="col s4 m5">
                                            <img class="materialboxed club-logo" src="https://crests.football-data.org/${match.homeTeam.id}.svg">
                                            <a href="team.html?id=${match.homeTeam.id}"><h6 class="flow-text">${match.homeTeam.name}</h6></a>
                                            <small>Home</small>
                                        </div>
                                        <div class="col s4 m2">
                                        <h4>${match.score.fullTime.homeTeam ?? "0"} : ${match.score.fullTime.awayTeam ?? "0"}</h4>
                                        <span>${match.status}</span>
                                        </div>
                                        <div class="col s4 m5">
                                            <img class="materialboxed club-logo" src="https://crests.football-data.org/${match.awayTeam.id}.svg">
                                            <a href="team.html?id=${match.awayTeam.id}"><h6 class="flow-text">${match.awayTeam.name}</h6></a>
                                            <small>Away</small>
                                        </div>
                                        </div>
                                    </div>`;
              }
            });
          });
          document.getElementById("body-content").innerHTML = champLeagueHTML;
        })
        .catch(error);
    })
    .catch(error);

}

getTeamById = () => {
  return new Promise((resolve, reject) => {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ('caches' in window) {
      console.log("getTeamById dari caches");
      caches.match(base_url + 'team/' + idParam)
        .then(res => {
          if (res) {
            res.json()
              .then(data => {
                console.log(data);
                var teamHTML = "", competitionsHTML = "";
                teamHTML = `
                  <div class="card">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${data.crestUrl}" class="club-logo"/>
                      </div>
                      <div class="card-content">
                        <span class="card-title">${data.name}</span>
                        <span class="valign-wrapper"><i class="material-icons">location_city</i>${data.address}</span>
                        <span class="valign-wrapper"><i class="material-icons">email</i>${data.email ?? "Doesn't Exist"}</span>
                        <span class="valign-wrapper"><i class="material-icons">language</i>${data.website}</span>
                        <hr>
                        <div id="${data.id}"></div>
                      </div>
                    </div>
                  `;
                data.activeCompetitions.forEach(comp => {
                  competitionsHTML += `<div class="chip">${comp.name}</div>`;
                })
                document.getElementById("body-content").innerHTML = teamHTML;
                document.getElementById(`${data.id}`).innerHTML = competitionsHTML;
                return data;
              })
              .then(player => {
                var playerHTML = `
                <table>
                  <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>`;
                player.squad.forEach(player => {
                  playerHTML += `
                  <tr>
                      <td>${player.name}</td>
                      <td>${player.position ?? "Official"}</td>
                      <td>${player.role}</td>
                    </tr>`;
                })
                document.getElementById("body-content").innerHTML += playerHTML + "</tbody></table>";
                resolve(player);
              })
          }
        })
    };
    console.log("getTeamById dari network");
    fetch(base_url + "teams/" + idParam, { headers: { "X-Auth-Token": "126082a1d2054f8fb241c26d07386da3" } })
      .then(status)
      .then(json)
      .then(data => {
        var teamHTML = "", competitionsHTML = "";
        teamHTML = `
      <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${data.crestUrl}" class="club-logo"/>
          </div>
          <div class="card-content">
            <span class="card-title">${data.name}</span>
            <span class="valign-wrapper"><i class="material-icons">location_city</i>${data.address}</span>
            <span class="valign-wrapper"><i class="material-icons">email</i>${data.email ?? "Doesn't Exist"}</span>
            <span class="valign-wrapper"><i class="material-icons">language</i>${data.website}</span>
            <hr>
            <div id="${data.id}"></div>
          </div>
        </div>
      `;
        data.activeCompetitions.forEach(comp => {
          competitionsHTML += `<div class="chip">${comp.name}</div>`;
        })
        document.getElementById("body-content").innerHTML = teamHTML;
        document.getElementById(`${data.id}`).innerHTML = competitionsHTML;
        console.log(data);
        return data;
      })
      .then(player => {
        var playerHTML = `
          <table>
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Role</th>
              </tr>
            </thead>
            <tbody>`;
        player.squad.forEach(player => {
          playerHTML += `
        <tr>
            <td>${player.name}</td>
            <td>${player.position ?? "Official"}</td>
            <td>${player.role}</td>
          </tr>`;
        })
        document.getElementById("body-content").innerHTML += playerHTML + "</tbody></table>";
        resolve(player);
      })
  })
}
getSavedTeams = () => {
  getAll().then(teams => {
    console.log(teams);
    var savedTeams = "";
    savedTeams += "<h1>Apalah</h1>";
    document.getElementById("body-content").innerHTML = savedTeams;
  })
}

getSavedTeamById = () => {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  getById(idParam).then(data => {
    var teamHTML = "", competitionsHTML = "";
    teamHTML = `
  <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${data.crestUrl}" class="club-logo"/>
      </div>
      <div class="card-content">
        <span class="card-title">${data.name}</span>
        <span class="valign-wrapper"><i class="material-icons">location_city</i>${data.address}</span>
        <span class="valign-wrapper"><i class="material-icons">email</i>${data.email ?? "Doesn't Exist"}</span>
        <span class="valign-wrapper"><i class="material-icons">language</i>${data.website}</span>
        <hr>
        <div id="${data.id}"></div>
      </div>
    </div>
  `;
    data.activeCompetitions.forEach(comp => {
      competitionsHTML += `<div class="chip">${comp.name}</div>`;
    })
    document.getElementById("body-content").innerHTML = teamHTML;
    document.getElementById(`${data.id}`).innerHTML = competitionsHTML;
    console.log(data);
    return data;
  })
    .then(player => {
      var playerHTML = `
      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Role</th>
          </tr>
        </thead>
        <tbody>`;
      player.squad.forEach(player => {
        playerHTML += `
    <tr>
        <td>${player.name}</td>
        <td>${player.position ?? "Official"}</td>
        <td>${player.role}</td>
      </tr>`;
      })
      document.getElementById("body-content").innerHTML += playerHTML + "</tbody></table>";
    })
}

getById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromised.then((db) => {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      return store.get(id);
    }).then((article) => {
      resolve(article);
    });
  });
}