function  loaded() {
    const input = document.createElement("input"),
    submit = document.createElement("input");
    let name = null;
    let dbdata = null;
    let userscore = 0;
    document.querySelector("main").appendChild(document.createElement("form"));
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Username");
    input.setAttribute("required", null);
    input.classList.add("rps-name");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Start game");
    document.querySelector("form").appendChild(input)
    document.querySelector("form").appendChild(submit)

    document.querySelector("form").addEventListener("submit", function(event){
        event.preventDefault()
        name = document.querySelector(".rps-name").value
        startgame(document.querySelector(".rps-name").value)
    })
    
    // Spawn and clean up html stucture
    function startgame(name) {
        let th = document.createElement("th")

        document.querySelector("form").remove()
        document.querySelector("main").appendChild(document.createElement("article")).classList.add("article-buttons")
        document.querySelector(".article-buttons").appendChild(document.createElement("h1")).innerHTML = `Hello ${name}!`;
        document.querySelector(".article-buttons").appendChild(document.createElement("figure")).classList.add("button-container")
        document.querySelector("main").appendChild(document.createElement("article")).classList.add("article-history")
        document.querySelector("main").appendChild(document.createElement("article")).classList.add("article-leaderboard")
        document.querySelector(".article-history").appendChild(document.createElement("h1")).innerHTML = `Game History`;
        document.querySelector(".article-leaderboard").appendChild(document.createElement("h1")).innerHTML = `Score Leaderboard`;
        document.querySelector(".button-container").appendChild(document.createElement("button")).classList.add("rps-button","rps-rock")
        document.querySelector(".button-container").appendChild(document.createElement("button")).classList.add("rps-button","rps-paper")
        document.querySelector(".button-container").appendChild(document.createElement("button")).classList.add("rps-button","rps-scissor")
        document.querySelector(".article-history").appendChild(document.createElement("table"))
        document.querySelector("table").appendChild(document.createElement("tr"))
        document.querySelector("tr").appendChild(th).innerHTML = "User:";
        th.classList.add("th-user")
        document.querySelector("tr").appendChild(document.createElement("th")).innerHTML = "Cpu:";
        for(let i = 0; i < document.querySelectorAll(".rps-button").length; i++) {
            document.querySelectorAll(".rps-button")[i].addEventListener("click", function(){gameround(this);})
        }
        fetch("https://rockpaperscissors-73f7c-default-rtdb.europe-west1.firebasedatabase.app/.json").then(r=>r.json()).then(d=>leaderboard(d));
    }

    // Callback function for fetch
    function leaderboard(data) {
        dbdata = data;
        document.querySelector(".article-leaderboard").appendChild(document.createElement("ul"));
        for(let i = 0; i < data.length; i++) {
            y = i + 1
            document.querySelector(".article-leaderboard ul").appendChild(document.createElement("li")).innerHTML = `${y} - ${data[i].name}: ${data[i].score}`
        }
    }

    // Runs after player presses button 0 = rock, 1 = paper, 2 = scissor
    function gameround(button) {
        if(button.classList.contains("rps-rock")) {roundwinner(0)}
        else if(button.classList.contains("rps-paper")) {roundwinner(1)}
        else if(button.classList.contains("rps-scissor")) {roundwinner(2)}
        else {
            alert("error")
        }
    }

    //  Compares computer and userchoices
    function roundwinner(playerchoice) {
        const cpuchoice = Math.floor(Math.random() * 3);

        if(playerchoice === cpuchoice) {
            scoreboard("draw", playerchoice, cpuchoice)
        }
        else if (playerchoice === 0) {
            if (cpuchoice === 1) {
                scoreboard("cpu", playerchoice, cpuchoice)
            }
            else if (cpuchoice === 2) {
                scoreboard("user", playerchoice, cpuchoice)
            }
        }
        else if (playerchoice === 1) {
            if (cpuchoice === 0) {
                scoreboard("user", playerchoice, cpuchoice)
            }
            else if (cpuchoice === 2) {
                scoreboard("cpu", playerchoice, cpuchoice)
            }
        }
        else if (playerchoice === 2) {
            if (cpuchoice === 0) {
                scoreboard("cpu", playerchoice, cpuchoice)
            }
            else if (cpuchoice === 1) {
                scoreboard("user", playerchoice, cpuchoice)
            }
        }
    }

    // Displays data and saves it in "History"
    function scoreboard(winner, playerchoice, cpuchoice){
        playerchoice = numberdecoder(playerchoice);
        cpuchoice = numberdecoder(cpuchoice);
        const tr = document.createElement("tr"),
        thuser = document.createElement("th"),
        thcpu = document.createElement("th")
        document.querySelector("table").appendChild(tr)
        tr.appendChild(thuser).innerHTML = `User: ${playerchoice}`;
        tr.appendChild(thcpu).innerHTML = `Cpu: ${cpuchoice}`;
        if(winner === "user") {
            thcpu.style.opacity = 0.5;
            userscore++;
            document.querySelector(".th-user").innerHTML = `User: ${userscore}`
            console.log(`Userscore: ${userscore}`)
        }
        else if(winner === "cpu") {
            thuser.style.opacity = 0.5;
            for(let i = 0; i < dbdata.length; i++){
                if(dbdata[i].score === userscore){
                    updatehighscore(i);
                    break
                }
            }
            reset()
        }
        else {
            thcpu.style.opacity = 0.5;
            thuser.style.opacity = 0.5;
        }
    }

    function updatehighscore(i) {
        fetch(`https://rockpaperscissors-73f7c-default-rtdb.europe-west1.firebasedatabase.app/${i}.json`, {
            method: 'PUT',
            body: JSON.stringify({
                'name': name,
                'score': userscore 
            }),
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        })

    }

    // Translates number into the corresponding string 
    function numberdecoder(number) {
        if(number===0){
            return "rock"
        }
        else if(number===1){
            return "paper"
        }
        else if(number===2){
            return "scissor"
        }
    }

    // Deletes all articles and calls loaded() again
    function reset() {
        document.querySelector(".article-leaderboard").remove()
        document.querySelector(".article-history").remove()
        document.querySelector(".article-buttons").remove()
        alert("You lost :(")
        loaded()
    }
}

loaded();