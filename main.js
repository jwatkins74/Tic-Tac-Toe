const board = (function() {
    let flag = false;
    let turn = "x";
    let placed = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]];
    let piece = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]];
    const currentPlaced= () =>{
        let placed1 = []
        for (let i = 0; i < 5; i++) {
            for (let j =0; j < 5; j++) {
                let spot = placed[i][j];
                if (spot) {
                    placed1.push(i.toString() + j.toString());
                }
            }
        }
        return placed1;
    }
    const current = () => {
        let placed = currentPlaced();
        if (placed.length == 0) {
            return ["22"];
        } 
        let miny = placed[0][1];
        let maxy = placed[0][1];
        let minx = placed[0][0];
        let maxx = placed[0][0];
        for (let i = 1; i < placed.length; i++ ) {
            if (placed[i][1] > maxy) {
                maxy = placed[i][1];
            } else if (placed[i][1] < miny) {
                miny = placed[i][1];
            }
            if (placed[i][0] > maxx) {
                maxx = placed[i][0];
            } else if (placed[i][0] < minx) {
                minx = placed[i][0];
            }
        }
        let yfree = maxy - miny;
        yfree = 2 - yfree;
        let xfree = maxx - minx;
        xfree = 2 - xfree;
        return [minx - xfree, +(maxx) + xfree, miny - yfree, +(maxy) + yfree];
    }
    const show = () => {
        let curr = current();
        let spot;
        let old;
        for (let i = 0; i < 5; i++) {
            for (let j =0; j < 5; j++) {
                spot = document.getElementById(i.toString() + j.toString());
                spot.style.visibility = "hidden";
                spot.parentElement.replaceChild(spot.cloneNode(true), spot);
            }
        }
        if (curr.length == 1) {
            spot = document.getElementById("22");
            spot.style.visibility = "visible";
            old = spot.textContent;
            spot.addEventListener("click", () =>{
                draw("22");
                old = spot.textContent;
            });

            spot.addEventListener("mouseenter", (event) =>{
                let str1 = "x" == turn ? "x": "o";
                let this1 = document.getElementById(event.target.id);
                if(this1.textContent == "")
                    this1.textContent = str1});

            spot.addEventListener("mouseleave", (event) =>{
                let this1 = document.getElementById(event.target.id);
                if (! placed[event.target.id[0]][event.target.id[1]])
                this1.textContent = ""; 
            });
            return;
        }
        for (let x = curr[0]; x <= curr[1]; x++) {
            for (let y =curr[2]; y <= curr[3]; y++) {
                spot = document.getElementById(x.toString() + y.toString());
                old = spot.textContent;
                spot.addEventListener("click", () => {
                    draw(x.toString() + y.toString());
                    old = spot.textContent;
                })
                
                spot.addEventListener("mouseenter", (event) =>{
                let str1 = "x" == turn ? "x":"o";
                let this1 = document.getElementById(event.target.id);
                if(this1.textContent == "")
                    this1.textContent = str1});

            spot.addEventListener("mouseleave", (event) =>{
                let this1 = document.getElementById(event.target.id);
                if (! placed[event.target.id[0]][event.target.id[1]])
                this1.textContent = ""});
                spot.style.visibility = "visible";
            }
        }

    }
    const draw = (pos) => {
        if (flag) {
            return;
        }
        spot = document.getElementById(pos);
        if (placed[pos[0][1]]) {
            return;
        }
        spot.innerHTML = turn;
        placed[pos[0]][pos[1]] = true;
        if (turn == "x") {
            piece[pos[0]][pos[1]] = 1;
        } else {
            piece[pos[0]][pos[1]] = 2;
        }
        if (turn == "x") {
            turn = "o";
        } else {
            turn = "x";
        }
        show();
        checkWin();
    }

    const checkWin= () => {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                spot = document.getElementById(x.toString() + y.toString());
                if (spot.visibility == "hidden"){
                    continue;
                }
                if (spot.innerHTML == "x") {
                    for (let dirx = -1; dirx < 2; dirx++) {
                        for (let diry = -1; diry < 2; diry++) {
                            if (dirx == diry && dirx ==0) {
                                continue;
                            }
                            checkDirection(x.toString() + y.toString(), dirx, diry, "x");
                        } 
                    }
                } else if (spot.innerHTML == "o") {
                    for (let dirx = -1; dirx < 2; dirx++) {
                        for (let diry = -1; diry < 2; diry++) {
                            if (dirx == diry && dirx ==0) {
                                continue;
                            }
                            checkDirection(x.toString() + y.toString(), dirx, diry, "o");
                        } 
                    }
                }
            }
        }
        
    }
    const checkDirection= (pos, dirx, diry, piece) => {
        if (+(pos[0]) + 2 *dirx > 4 || +(pos[0]) + 2 *dirx < 0) {
            return;
        }
        if (+(pos[1]) + 2 *diry > 4 || +(pos[1]) + 2 *diry < 0) {
            return;
        }
        let one = document.getElementById((+ pos[0] + dirx).toString() + (+pos[1] + diry).toString()).innerHTML;
        let two = document.getElementById((+ pos[0] + 2 *dirx).toString() + (+pos[1] + 2* diry).toString()).innerHTML;
        if (piece == one && piece == two) {
            console.log("win");
            flag = true;
            let wonp = document.getElementById("wonp");
            let wondiv = document.getElementById("wondiv");
            let restart = document.getElementById("restart");
            if (piece == "x") {
                wonp.textContent = "Player 1 (X) Won!"
            } else {
                wonp.textContent = "Player 2 (O) Won!"
            }
            wonp.style.display= "block";
            wondiv.style.display= "flex";
            restart.style.visibility = "visible"
            restart.addEventListener("click", () => {
                
                flag = false;
                turn = "x";
                placed = [
                    [false, false, false, false, false],
                    [false, false, false, false, false],
                    [false, false, false, false, false],
                    [false, false, false, false, false],
                    [false, false, false, false, false]];
                piece = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]];
                
                for (let i = 0; i < 5; i++) {
                    for (let j =0; j < 5; j++) {
                        let spot = document.getElementById(i.toString() + j.toString());
                        spot.textContent = "";
                    }
                }
                wondiv.style.display = "none";
                show();
            })}
        }

    return {show}
})()
board.show();
