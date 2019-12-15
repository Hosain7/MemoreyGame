let clickedCards = [];
let icons = [];
let stars = 3;
let matchedCards = [];
let numberOfMoves = 0;
let minutes = 0;
let seconds = 0;
let timeHandler;
let myStars = document.querySelector(".stars");
const movesElement = document.querySelector('.moves');
let allCards = document.querySelectorAll('.card');
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");
let btnNo = document.querySelector('.btn-no');

startCount();
allCards.forEach(function (card) {
    card.classList.remove('match', 'open', 'show');

    //getting first child (icon) 
    let icon = card.children[0];

    //pushing icon classnames into icons array
    icons.push(icon.className);

    // click event
    card.addEventListener('click', function () {
        if (clickedCards.length < 2) {
            card.classList.add('open', 'show');
            clickedCards.push(card);
        }
        if (clickedCards.length == 2) {
            setTimeout(function () {

                let firstCard = clickedCards[0]
                let secondCard = clickedCards[1];

                //getting classNames for comparision
                let firstCardClassName = firstCard.children[0].className;
                let secondCardClassName = secondCard.children[0].className;

                if (firstCardClassName == secondCardClassName) {
                    firstCard.classList.add('match', 'open', 'show')
                    secondCard.classList.add('match', 'open', 'show')
                }

                else {
                    firstCard.className = "card";
                    secondCard.className = "card";
                }


                clickedCards = [];


                //put matched cards into array
                if (card.classList.contains('match')) {
                    matchedCards.push(card)


                    // 8 pairs of matched cards
                    if (matchedCards.length == 8) {
                        document.querySelector('#modal-moves').innerHTML = numberOfMoves;
                        document.querySelector('#modal-time').innerHTML = minutes+":"+ seconds;
                        
                        stopCount();
                        toggleModal();
                    }
                }

            }, 1000);
        }
        numberOfMoves += 1
        movesElement.innerText = numberOfMoves;
        clacStars();
    });
});

//start countup timer
function startCount() {
    if (!timeHandler)
        timeHandler = setInterval(function () {
            seconds += 1;
            if (seconds == 60) {
                seconds = 0;
                minutes = minutes + 1;
            }
            document.querySelector(".timer").innerHTML = `${zeroPading(minutes)}:${zeroPading(seconds)}`;

        }, 1000);
};
// leadzeros padding to time 
function zeroPading(digit) {

    var zeroPad = digit + '';
    if (digit < 10) {
        zeroPad = "0" + zeroPad;
    }
    return zeroPad;
}

// stop countup 
function stopCount() {
    clearInterval(timeHandler);

    timeHandler = null;
}

function clacStars() {

    if (numberOfMoves <= 16) {
        stars = 3;
    } else if (numberOfMoves < 20) {
        stars = 2;
    } else {
        stars = 1;
    }
    myStars.innerHTML = "";

    for (let i = 0; i < stars; i++) {
        let star = "<li> <i class='fa fa-star'></i> </li>";
        myStars.innerHTML += star;
    }
}


// restartbutton
let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame);



function toggleModal() {
    modal.classList.toggle("show-modal");
}

////modal buttons ===============
// close button
closeButton.addEventListener("click", toggleModal);

// NO  buttons
btnNo.addEventListener("click", toggleModal);

// Yes
let btnYes=document.querySelector(".btn-yes");
btnYes.addEventListener("click",function(){

    toggleModal();
    restartGame();
});


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function restartGame(){

        numberOfMoves = 0;
        stars = 3;
        movesElement.innerText = numberOfMoves;
    
        allCards.forEach(function (card) {
            card.className = "card";
        });
    
        shufflIcons();
        myStars.innerHTML = "";
        minutes = 0;
        seconds = -1;
        startCount();
    
    
};

function shufflIcons() {
    icons = shuffle(icons);
    let i = 0;
    allCards.forEach(function (card) {
        // icon class is first children 
        let cardIcon = card.children[0];
        cardIcon.className = icons[i];
        i++;
    });
};