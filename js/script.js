function  loaded() {
    document.querySelector("form").addEventListener("submit", function(event){
        event.preventDefault()
        startgame(document.querySelector(".rps-name").value)
    })
    
    // Spawn and clean up html stucture
    function startgame(name) {
        let button = document.createElement("button")
        document.querySelector("form").remove()
        document.querySelector("main").appendChild(document.createElement("article")).classList.add("article-buttons")
        document.querySelector("main").appendChild(document.createElement("article")).classList.add("article-history")
        document.querySelector(".article-buttons").appendChild(document.createElement("h1")).innerHTML = `Hello! ${name}`;
        document.querySelector(".article-buttons").appendChild(document.createElement("button")).classList.add("rps-button","rps-rock")
        document.querySelector(".article-buttons").appendChild(document.createElement("button")).classList.add("rps-button","rps-paper")
        document.querySelector(".article-buttons").appendChild(document.createElement("button")).classList.add("rps-button","rps-scissor")
        
        for(let i = 0; i < document.querySelectorAll(".rps-button").length; i++) {
            document.querySelectorAll(".rps-button")[i].addEventListener("click", function(){gameround(this);})
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

    //
    function roundwinner(playerchoice) {
        const cpuchoice = Math.floor(Math.random() * 3);

        if(playerchoice === cpuchoice) {
            scoreboard("draw")
        }
        else if (playerchoice === 0) {
            if (cpuchoice === 1) {
                scoreboard("cpu")
            }
            else if (cpuchoice === 2) {
                scoreboard("user")
            }
        }
        else if (playerchoice === 1) {
            if (cpuchoice === 0) {
                scoreboard("user")
            }
            else if (cpuchoice === 2) {
                scoreboard("cpu")
            }
        }
        else if (playerchoice === 2) {
            if (cpuchoice === 0) {
                scoreboard("cpu")
            }
            else if (cpuchoice === 1) {
                scoreboard("user")
            }
        }
    }

    function scoreboard(winner){
        console.log(winner)
        if(winner = "user") {
            // Add scoreboard point + history

        }
        else if(winner = "cpu") {
            // do fetch to db and loop though value: score and if userpoint > scoreboard take i for array position and send Username, Userpoint and position to api.js 
        }
    }

    function reset() {
        //gaming
    }
}

loaded();