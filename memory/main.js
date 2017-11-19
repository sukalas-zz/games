let Main = (function(){

	//CACHE DOM
	$app = $('#app');
	$boxes = $('.box');
	$cards = $('.card');
	$button = $('#start');
	$donkeyButton = $('#setKey');

	//BIND EVENTS
	$button.on("click", (e)=> hideCards())
	$donkeyButton.on("click", (e)=> API.setSubject(e))

	//GLOBALS
	let counter = 0;
	let magic = ['0','1','2','3','4','5','6','7','8','9'];
		magic = magic.concat(magic); //Double the Array

	shuffle(magic); // Suffle the array

	let indexes = new Array(0);
	let parentIndex = new Number(0);

	function appendImages(data) {
		for (const card of $cards) {
			if(data[magic[counter]].versions>=1){
				$(card).css("background", `url(${data[magic[counter]].url})`);
				card.id = data[magic[counter]].id = magic[counter];
			}
			if(data[magic[counter]].versions > 0) {data[magic[counter]].versions -= 1};
		counter++
		}

		Game.initialize();
	}
	
	function toggle(card) {
		parentIndex = $(card).parent().index(); // Index of the parent element -box
		indexes.push(parentIndex); //Store the index
		if(typeof indexes[1] !== "undefined" && indexes[0] !== indexes[1]){ // Check if the clicked box is not the same one
			Game.check(indexes)
			indexes = [];
		}else if(indexes[0] === indexes[1]) {
			indexes = [];
		}
		$(card).toggleClass("inactive").toggleClass("selected");
	}

	function hideCards(cards) {
		$button.off("click"); //Remore inital click handler
		$button.html("reset");
		$button.on("click", (e)=> resetCards()) //Add new click handler
		$cards.on("click", (e)=> {
		if(!Game.status().busy) {
			toggle(e.target)}
	  })
		for (const card of $cards){
			$(card).toggleClass("inactive");
			counter++;
		}

		function resetCards() {
			window.location = window.location.href;
		}
	}

	/**
	 * Shuffles array in place.
	 * @param {Array} a items An array containing the items.
	 */
	function shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
	}

	return {
		appendImages : appendImages
	}

})()