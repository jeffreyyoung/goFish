(function () {
    var computerScore = 0
    var humanScore = 0;
    var deck = [];
    var humHand = [];
    var compHand = [];

    function buildDeck() {
        for (var i = 1; i <= 13; i++) {
            addCardToDeck(i);
        }
    }

    function shuffle() {
        for (var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
    };

    function addCardToDeck(i) {
        var type;

        if (i === 1)
            type = 'ace';
        else if (i < 11)
            type = i;
        else if (i === 11)
            type = 'jack';
        else if (i === 12)
            type = 'queen';
        else if (i === 13)
            type = 'king';

        if (i === 1)
            i = 14;

        var cardC = new Object();
        cardC.type = type;
        cardC.suit = "Clubs";
        cardC.weight = i;
        deck.push(cardC);

        var cardD = new Object();
        cardD.type = type;
        cardD.suit = "Diamonds";
        cardD.weight = i;
        deck.push(cardD);

        var cardH = new Object();
        cardH.type = type;
        cardH.suit = "Hearts";
        cardH.weight = i;
        deck.push(cardH);

        var cardS = new Object();
        cardS.type = type;
        cardS.suit = "Spades";
        cardS.weight = i;
        deck.push(cardS);
    }

    function buildHands(initialSize) {
        for (var i = 0; i < initialSize; i++) {
            humHand.push(deck.pop());
            compHand.push(deck.pop());
        }
    }

    function updateScreen() {
        //humHand.sort(compare);
        var compHandHTML = "";
        for (var i = 0; i < compHand.length; i++) {
            //compHandHTML += "<div class = 'card opp' ></div>";
            compHandHTML += "<div class = 'card opp'>";
            compHandHTML += "<p>" + compHand[i].type + "</p><p>" + "of" + "</p><p>" + compHand[i].suit + "</p>";
            compHandHTML += "</div>";
        }

        var humHandHTML = "";
        for (var i = 0; i < humHand.length; i++) {
            humHandHTML += "<div class = 'card mine' id = 'card-" + i + "' > ";
            humHandHTML += "<p>" + humHand[i].type + "</p><p>" + "of" + "</p><p>" + humHand[i].suit + "</p>";
            humHandHTML += "</div>";
        }

        if (deck.length > 0) {
            var htmlDraw = "<div class = 'card draw'><p>Draw Pile</p></div>";
            $('#draw-pile').html(htmlDraw);
        }
        else {
            var htmlDraw = "<div class = 'card empty'><p>No more cards</p></div>";
            $('#draw-pile').html(htmlDraw);
        }

        $("#human-score").html(humanScore);
        $("#comp-score").html(computerScore);
        $('#hand-2').html(compHandHTML);
        $("#hand-1").html(humHandHTML);
    }

    function compare(a, b) {
        return (a.weight <= b.weight);
    }

    function askForCard(index, isComputer) { //computer is a boolean value
        var askHand;
        var givHand;
        if (isComputer) {
            askHand = compHand;
            givHand = humHand;
        }
        else {
            askHand = humHand;
            givHand = compHand;
        }

        var isInOppHand = false;
        var cardBeingAskedFor = askHand[index].type;
        if (isComputer)
            alert('computer says "Do you have a ' + cardBeingAskedFor + '?');

        console.log(cardBeingAskedFor);
        for (var i = 0; i < givHand.length; i++) {
            if (givHand[i].type === askHand[index].type) {
                askHand.push(givHand[i]);
                givHand.splice(i, 1);
                isInOppHand = true;
                break;
            }
        }

        if (inOppHand === false && deck.length > 0)
            askHand.push(deck.pop());


        checkForSets(isComputer);


        updateScreen();

        if (isComputer && isInOppHand) {
            computerTurn();
        }
        else if (isComputer && !isInOppHand) {
            humanTurn();
        }
        else if (!isComputer && isInOppHand) {
            humanTurn();
        }
        else if (!isComputer && !isInOppHand) {
			alert("Go fish!");
            computerTurn();
        }

    }

    function enableInput() {
        $('.mine').click(function () {
            var index = this.id.substring(5);
            askForCard(index, false);
        });
    }

    function disableInput() {
        $('.mine').unbind("click");
    }

    function computerTurn(deck) {
		if ( compHand.length === 0 ){
			humanTurn();
		}
		else {
			disableInput();
			$('#turn').html("Computer's turn");
			setTimeout(function () {
				var index = Math.floor((Math.random() * compHand.length));
				askForCard(index, true);
			}, 500);
		}
    }

    function humanTurn() {
		if (humHand.length === 0){
			computerTurn(deck);
		}
		else {
			enableInput();
			$('#turn').html("Your turn");
		}
    }



    function findWithAttr(array, attr, value) {

        var indexes = [];

        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                indexes.push(i);
            }
        }

        return indexes;
    }

    function checkForSets(computer) {

        if (computer)
            hand = compHand;
        else
            hand = humHand;

        var weight = hand[hand.length - 1].weight;
        var count = 0;
        var indexes = [];
        for (var h = 0; h < hand.length; h++) {
            if (weight === hand[h].weight) {
                count++;
                indexes.push(h);
            }
        }

        if (count === 4) {
            indexes.reverse();
            $.each(indexes, function (i, v) {
                hand.splice(v, 1);
            });

            if (computer)
                computerScore++;
            else
                humanScore++;
        }
    }

    function newGame() {
        buildDeck();
        shuffle();
        buildHands(7);
        updateScreen();
        humanTurn();
    }

    function main() {
        newGame();
    }

    main();
})();
