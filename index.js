/**
 * General func for getting random number
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

/**
 * Func for getting 1 or 0
 * @returns {number}
 */
function getCoin() {
    return randomInteger(0, 1);
}

/**
 * Func for deleting users which loose
 * @param arr{Array}
 * @returns {Array}
 */
function checkZero(arr) {
    return arr.filter((player) => {
        return player.score !== 0;
    });
}

/**
 * Func for DOM showing result
 * @param resultObject
 */
function textFulling(resultObject) {
    document.getElementById('results').innerText = '';
    for (let f = 0; f < resultObject.winners.length; ++f) {
        let p = document.createElement('p');
        p.innerText = `Game ${f + 1} : Winner player id: ${resultObject.winners[f]}. Number of iterations: ${resultObject.iterations[f]}`
        document.getElementById('results').appendChild(p)
    }
}

/**
 * Main function
 * @param numberOfPeople
 * @param numberOfIteration
 */
function flipCoin(numberOfPeople, numberOfIteration) {
    let resObj = {
        winners: [],
        iterations: []
    }
    for (let a = 0; a < numberOfIteration; ++a) {
        let allPeople = [];

        for (let i = 0; i < numberOfPeople; ++i) {
            allPeople.push({
                score: 1,
                id: i
            });
        }

        let counter = 0;

        while (allPeople.length > 1) {
            counter += 1;
            for (let num = 0; num < allPeople.length; num += 2) {
                if (num + 1 < allPeople.length) {
                    const player1 = allPeople[num];
                    const player2 = allPeople[num + 1];
                    const coinValue = getCoin();

                    player1.score += coinValue ? 1 : -1;
                    player2.score += coinValue ? -1 : 1;
                }
            }
            allPeople = checkZero(allPeople);
        }

        resObj.iterations.push(counter);
        resObj.winners.push(allPeople[0].id);
        console.log(allPeople, counter);
    }

    textFulling(resObj);
}

/**
 * Start estimation
 */
document.getElementById('start').onclick = () => {
    let numberOfPlayers = document.getElementById('numberOfPlayers').value;
    let numberOfIteration = document.getElementById('numberOfIteration').value;
    flipCoin(numberOfPlayers, numberOfIteration);
}