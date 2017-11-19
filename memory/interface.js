let Interface = (function() {
	//GLOBALS
	const APIkey = "7005195-08cac95cbd7fdd9bbccae5003"; // MY API KEY FROM pixabay.com
	let keywordsArray = new Array(0);
		keywordsArray = [
							'fractals', 'beautiful+women', 'funny', 'fruits',
							'geometry', 'psychedelic', 'cats', 
							'power', 'netherlands', 'art', 'colors'
						];

	const topic = Math.floor(Math.random()*11);
	let url = `https://pixabay.com/api/?key=${APIkey}&q=${keywordsArray[topic]}&image_type=photo`;

	let status = new String(null);
	let userName1 = new String(null);
	let userName2 = new String(null);
	let busy = false;

	//CACHE DOM
	$inputUser1 = $('#user1-input');
	$inputUser2 = $('#user2-input');
	$gridNumber = $('#gridNum');
	$submit = $('.ok');
	$exitIcon = $(".fa-times");
	$shine = $('.shine');
	$panel = $('.input-panel')

	//BIND EVENTS
	$submit.on("mouseenter", ()=> _shine($shine))


	//METHODS
	function _injectData(user_1, user_2) {
		Game.players()[0].name = user_1;
		Game.players()[1].name = user_2;
	}

	function initializeInputs() {
		setTimeout(() => {
			showInputPanel($panel);
		}, 500)
		
	}

	function showInputPanel(elem) {
		$("body").css("display", "grid"); //Enable the display property from body - main container
		$(elem).parent().css("display", "block") 
		elem.css("display", "grid");
		centerPanel(elem);

		$submit.on("click", (e)=> {
			getInputs(e);
		})
		$exitIcon.on("click", (e)=> {
			getInputs(e);
		})

	}

	function hideInputPanel(elem) {
		$(elem).parent().css("display", "none")
	}

	function getInputs(inputs) {
		if($inputUser1.val() !=="" && $inputUser2.val() !== "") {
			Game.players()[0].name = $inputUser1.val();
			Game.players()[1].name = $inputUser2.val();

			if(Game.players()[0].name.length> 20) {
				$(".player").css("font-size", "5px");
			}
		}
		hideInputPanel($panel);
		API.request(url);
	}

	function centerPanel(elem) {
		let horizAlign = (window.innerWidth - $(elem).css("width").replace(/[^-\d\.]/g, ''))/2;
		let vertAlign = (window.innerHeight - $(elem).css("height").replace(/[^-\d\.]/g, ''))/2;

		$(elem).css("left", horizAlign);
		$(elem).css("top", vertAlign);
	}

	function _shine(elem) {

	}

	return {
		init: initializeInputs
	}
})()