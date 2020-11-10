var base_url = "https://api.football-data.org/v2/";
var preloader = document.getElementById("preloader");
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
getMatches = _ => {
  var teams = [];
  preloader.removeAttribute("hidden");
  if ('caches' in window) {
    caches.match(base_url + "competitions/2021/teams").then(res => {
      console.log("getMatches dari cache");
      if (res) {
        res.json().then(data => {
          data.teams.forEach(team => {
            teams.push(team);
          });
          return teams;
        }).then(teams => {
          caches.match(base_url + "competitions/2021/matches").then(res => {
            if (res) {
              res.json().then(data => {
                var champLeagueHTML = "";
                data.matches.forEach(match => {
                  teams.forEach((tim) => {
                    if ((match.homeTeam.id == tim.id) && (tim.crestUrl != null)) {
                      champLeagueHTML += `
                        <div class="card-panel center-align">
                        <p class="card-title">Premiere League</p>
                        <div class="row">
                          <div class="col s4 m5">
                            <img class="materialboxed club-logo" src="https://crests.football-data.org/${match.homeTeam.id}.svg" loading="lazy">
                            <a href="team.html?id=${match.homeTeam.id}">
                              <h6 class="flow-text">${match.homeTeam.name}</h6>
                            </a>
                            <small>Home</small>
                          </div>
                          <div class="col s4 m2">
                            <h4>${match.score.fullTime.homeTeam ?? "0"} : ${match.score.fullTime.awayTeam ?? "0"}</h4>
                            <span>${match.status}</span>
                          </div>
                          <div class="col s4 m5">
                            <img class="materialboxed club-logo" src="https://crests.football-data.org/${match.awayTeam.id}.svg" loading="lazy">
                            <a href="team.html?id=${match.awayTeam.id}">
                              <h6 class="flow-text">${match.awayTeam.name}</h6>
                            </a>
                            <small>Away</small>
                          </div>
                        </div>
                        <p class="chip">${new Date(match.utcDate).toLocaleString("id", { year: 'numeric', month: 'short', day: 'numeric' }) + " Pukul " + new Date(match.utcDate).toLocaleString("id", { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</p>
                      </div>`;
                    }
                  });
                });
                preloader.setAttribute("hidden", "");
                document.getElementById("matches").innerHTML = champLeagueHTML;
              })
            }
          })
        })
      }
    })
  };
  fetch(base_url + "competitions/2021/teams", { headers: { "X-Auth-Token": "126082a1d2054f8fb241c26d07386da3" } }).then(status).then(json).then(data => {
    var teams = [];
    data.teams.forEach(team => {
      teams.push(team);
    });
    return teams;
  }).then(teams => {
    fetch(base_url + "competitions/2021/matches", { headers: { "X-Auth-Token": "126082a1d2054f8fb241c26d07386da3" } }).then(status).then(json).then(data => {
      var champLeagueHTML = "";
      data.matches.forEach(match => {
        teams.forEach(tim => {
          if ((match.homeTeam.id == tim.id) && (tim.crestUrl != null)) {
            champLeagueHTML += `
            <div class="card-panel center-align">
            <p class="card-title">Premiere League</p>
            <div class="row">
              <div class="col s4 m5">
                <img class="materialboxed club-logo" src="https://crests.football-data.org/${match.homeTeam.id}.svg" loading="lazy">
                <a href="team.html?id=${match.homeTeam.id}">
                  <h6 class="flow-text">${match.homeTeam.name}</h6>
                </a>
                <small>Home</small>
              </div>
              <div class="col s4 m2">
                <h4>${match.score.fullTime.homeTeam ?? "0"} : ${match.score.fullTime.awayTeam ?? "0"}</h4>
                <span>${match.status}</span>
              </div>
              <div class="col s4 m5">
                <img class="materialboxed club-logo" src="https://crests.football-data.org/${match.awayTeam.id}.svg" loading="lazy">
                <a href="team.html?id=${match.awayTeam.id}">
                  <h6 class="flow-text">${match.awayTeam.name}</h6>
                </a>
                <small>Away</small>
              </div>
            </div>
            <p class="chip">${new Date(match.utcDate).toLocaleString("id", { year: 'numeric', month: 'short', day: 'numeric' }) + " Pukul " + new Date(match.utcDate).toLocaleString("id", { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</p>
          </div>`;
          }
        });
      });
      preloader.setAttribute("hidden", "");
      document.getElementById("matches").innerHTML = champLeagueHTML;
    }).catch(error);
  }).catch(error);
  console.log(teams);
}

getTeams = () => {
  preloader.removeAttribute("hidden");
  if ('caches' in window) {
    caches.match(base_url + "competitions/2021/teams").then(res => {
      if (res) {
        res.json()
          .then(data => {
            var teamsHTML = "";
            data.teams.forEach(data => {
              teamsHTML += `<option value="${data.id}" data-icon="${data.crestUrl}">${data.name}</option>`;
            });

            preloader.setAttribute("hidden", "");
            document.getElementById("clubId").innerHTML = teamsHTML;
          }).then(() => {
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
          })
      }
    })
  };
  fetch(base_url + "competitions/2021/teams", { headers: { "X-Auth-Token": "126082a1d2054f8fb241c26d07386da3" } })
    .then(status)
    .then(json)
    .then(data => {
      var teamsHTML = "";
      data.teams.forEach(data => {
        teamsHTML += `<option value="${data.id}" data-icon="${data.crestUrl}">${data.name}</option>`;
      });
      preloader.setAttribute("hidden", "");
      document.getElementById("clubId").innerHTML = teamsHTML;
    })
    .then(() => {
      var elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);
    });
}

getTeamById = () => {
  preloader.removeAttribute("hidden");

  return new Promise((resolve, reject) => {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ('caches' in window) {
      caches.match(base_url + 'teams/' + idParam)
        .then(res => {
          if (res) {
            res.json()
              .then(data => {
                var teamHTML = "", competitionsHTML = "";
                teamHTML = `
                  <div class="card">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${data.crestUrl}" class="club-logo" loading="lazy"/>
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
                      <td class="truncate">${player.role}</td>
                    </tr>`;
                });
                preloader.setAttribute("hidden", "");
                document.getElementById("body-content").innerHTML += playerHTML + "</tbody></table>";
                resolve(player);
              })
          }
        })
    };

    fetch(base_url + "teams/" + idParam, { headers: { "X-Auth-Token": "126082a1d2054f8fb241c26d07386da3" } })
      .then(status)
      .then(json)
      .then(data => {
        var teamHTML = "", competitionsHTML = "";
        teamHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" class="club-logo" loading="lazy"/>
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <span class="valign-wrapper"><i class="material-icons">location_city</i>${data.address}</span>
              <span class="valign-wrapper"><i class="material-icons">email</i>${data.email ?? "Doesn't Exist"}</span>
              <span class="valign-wrapper"><i class="material-icons">language</i>${data.website}</span>
              <hr>
              <div id="${data.id}"></div>
            </div>
          </div>`;
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
              <td class="truncate">${player.role}</td>
            </tr>`;
        });
        preloader.setAttribute("hidden", "");
        document.getElementById("body-content").innerHTML += playerHTML + "</tbody></table>";
        resolve(player);
      })
  })
}
getSavedTeams = () => {
  preloader.removeAttribute("hidden");
  getAll().then(teams => {
    var savedTeams = `<div class="row">`;
    teams.forEach(data => {
      savedTeams += `
      <div class="col s12 m6">
        <div class="card">
          <div class="card-image">
            <a href="team.html?id=${data.tla}&saved=true">
              <img src="${data.crestUrl}" class="club-logo" loading="lazy">
            </a>
          </div>
          <div class="card-content">
            <span class="card-title truncate">${data.name}</span>
            <span class="valign-wrapper"><i class="material-icons">location_city</i>${data.address}</span>
            <span class="valign-wrapper"><i class="material-icons">email</i>${data.email ?? "Doesn't Exist"}</span>
            <span class="valign-wrapper"><i class="material-icons">language</i>${data.website}</span>
          </div>
        </div>
      </div>`;
    })
    preloader.setAttribute("hidden", "");
    document.getElementById("saved").innerHTML = savedTeams + "</div>";
  })
}

getSavedTeamById = () => {
  preloader.removeAttribute("hidden");
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  getById(idParam).then(data => {
    var teamHTML = "", competitionsHTML = "";
    teamHTML = `
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${data.crestUrl}" class="club-logo" loading="lazy"/>
        </div>
        <div class="card-content">
          <span class="card-title">${data.name}</span>
          <span class="valign-wrapper"><i class="material-icons">location_city</i>${data.address}</span>
          <span class="valign-wrapper"><i class="material-icons">email</i>${data.email ?? "Doesn't Exist"}</span>
          <span class="valign-wrapper"><i class="material-icons">language</i>${data.website}</span>
          <hr>
          <div id="${data.id}"></div>
        </div>
      </div>`;
    data.activeCompetitions.forEach(comp => {
      competitionsHTML += `<div class="chip">${comp.name}</div>`;
    })
    document.getElementById("body-content").innerHTML = teamHTML;
    document.getElementById(`${data.id}`).innerHTML = competitionsHTML;
    return data;
  }).then(player => {
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
            <td class="truncate">${player.role}</td>
          </tr>`;
    })
    preloader.setAttribute("hidden", "");
    document.getElementById("body-content").innerHTML += playerHTML + "</tbody></table>";
  })
}

getSubsId = (id) => {
  preloader.removeAttribute("hidden");
  if ('caches' in window) {
    caches.match(base_url + "teams/" + id).then(res => {
      if (res) {
        res.json().then(res => {
          saveTeam(res)
          getSubsList()
          preloader.setAttribute("hidden", "");
        })
          .catch("getSubs tidak dijalankan")
      }
    })
  };
  fetch(base_url + "teams/" + id, { headers: { "X-Auth-Token": "126082a1d2054f8fb241c26d07386da3" } })
    .then(status)
    .then(json)
    .then(res => {
      saveTeam(res)
      getSubsList()
      preloader.setAttribute("hidden", "");
    })
    .catch("getSubs tidak dijalankan")
}