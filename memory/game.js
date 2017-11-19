let Game =  (function() {

	$score = $('.score');
	$player = $('.player');
	$container = $('#app');
	$box = $('.box');
	$cards = $('.card');

	let players =  new Array(); let player; let state; 
	let card_1 = new Object(); let card_2 = new Object();
	let active = new Boolean(true);
	let status = new Object({ busy:false });
	let coupleCards = new Array(0);
	let counter = 0;
	let color = new String();

	players = [
		{id:0, name: "Harvey Weinstein", score:0, color: "green", active: true, unique:""},
		{id:1, name: "Louis C.K.", score:0, color: "red", active: false, unique:""}
	];

	function init() {
		TweenMax.from($("#game"), 0.35, {rotation:-5, scale:0.75, opacity:0, ease:Power2.easeOut})
		$player.html(players[0].name);
		$player.css("color", players[0].color);
		$score.html(players[0].score);
		TweenMax.from([$player, $score], .25, {opacity:0});
	}

	function checkCoupleCards(indexes) {
			status.busy = true; // Block upcoming click triggers
			card_1 = $container.children().get(indexes[0]);
			card_2 = $container.children().get(indexes[1]);
			const id_1 = $(card_1).children().first().get(0).id;
			const id_2 = $(card_2).children().first().get(0).id;

			if(id_1 === id_2) {
				_keepScore();
				$(card_1).children().first().off("click");
				$(card_2).children().first().off("click");

				TweenMax.to([$(card_1), $(card_2)], .2, {delay:0.35, css: { '-webkit-filter': 'brightness(1.5)'}, ease:Power2.easeOut, onComplete:function() {
					TweenMax.to([$(card_1), $(card_2)], .1, {css: { '-webkit-filter': 'brightness(1)'}, ease:Power2.easeOut, onComplete:function() {
						TweenMax.to([$(card_1), $(card_2)], .2, {css: { '-webkit-filter': 'brightness(1.5)'}, ease:Power2.easeOut, onComplete:function() {
							TweenMax.to([$(card_1), $(card_2)], .1, {css: { '-webkit-filter': 'brightness(1)'}, ease:Power2.easeOut, onComplete: function() {
								status.busy = false;
							}})
						}})
					}})
				}})
			}
			else {
				_revertCards();
			}
			_displayStats();
	}

	function busy(bool) {
		return status;
	}

	function getPlayers() {
		return players;
	}

	function _revertCards() {
		setTimeout( function() { //Give some space for the transitions
			let card1 = $(card_1).children().first();
			let card2 = $(card_2).children().first();

			TweenMax.to(card1, 0.75, {rotation:Math.random()*180, scaleY:0, opacity:0, ease: Expo.easeOut});
			TweenMax.to(card2, 0.50, {delay:0.025, rotation:Math.random()*180, scaleY:0, opacity:0, ease: Expo.easeOut, onComplete:makeInactive});

			function makeInactive() {
				$(card_1).children().first().addClass("inactive");
				$(card_2).children().first().addClass("inactive");
				TweenMax.set([card1, card2], {scale:1, opacity:1, rotation:0});
				status.busy = false;
			}
			_togglePlayers();
		},150)
	}

	function _keepScore() {
		for([index, player] of players.entries()) {
			if(player.active) {
				_increaseScore(player.id);
			}
		}
		_victoryStatus();
	}

	function _victoryStatus() {
		for([index, player] of players.entries()){
			if(player.score > 5) {
				alert(player.name+" Won!!!!")
			}
		}
	}

	function _increaseScore(number) {
		color = (number === 0) ? "green" : "red";
		players[number].score += 1;

		TweenMax.to($score, 0.25, {css:{color:color}, ease:Power2.easeOut, onComplete:function(){
			TweenMax.to($score, 0.5, {delay:0.5, css:{color:"rgba(255, 255, 255, 1)"}, ease:Power2.easeOut});
		}});
		
	}

	function _decreaseScore(number) {
		if(players[number].score > 0){
			players[number].score -= 1;
		}else{
			return
		}
	}

	function _displayStats(number) {
		for([index, player] of players.entries()){
			if(player.active){
				$score.html(player.score)
				$player.html(player.name)
				$player.css("color", player.color)
			}
		}
	}

	function _togglePlayers(player) {
		player = (active) ? 0 : 1;
		active = !active;
		players[0].active = active;
		players[1].active = !active;
		_displayStats()
	}

	return {
		initialize : init,
		players : getPlayers,
		check : checkCoupleCards, 
		status : busy
	}
})()