function checkOver(){}

const board = (function() {
    let turn = "x";
    let placed = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]];
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
        console.log(placed);
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
        yfree = 3 - yfree;
        let xfree = maxx - minx;
        xfree = 3 - xfree;
        return [minx - xfree, maxx + xfree, miny - yfree, maxy + yfree];
    }
    const show = () => {
        let curr = current();
        let spot;
        for (let i = 0; i < 5; i++) {
            for (let j =0; j < 5; j++) {
                spot = document.getElementById(i.toString() + j.toString());
                spot.style.visibility = "hidden";
                spot.addEventListener("click", () =>{});
            }
        }
        if (curr.length == 1) {
            spot = document.getElementById("22");
            spot.style.visibility = "visible";
            console.log(spot);
            spot.addEventListener("click", () =>{draw("22")});
            return;
        }
        for (let x = curr[0]; x < curr[1]; x++) {
            for (let y =curr[2]; y < curr[3]; y++) {
                console.log(x.toString() + y.toString());
                spot = document.getElementById(x.toString() + y.toString());
                spot.style.visibility = "visible";
            }
        }

    }
    const draw = (pos) => {
        spot = document.getElementById(pos);
        spot.innerHTML = turn;
        placed[pos[0]][pos[1]] = true;
        if (turn == "x") {
            turn = "o";
        } else {
            turn = "x";
        }
        show()
    }
    return {show}
})()
board.show();
