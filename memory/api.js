let API  = (function() {

	let hits = new Array(0);

	let imageUrl = new String();
	let images = [{}];

	function _get(url) {
	  return new Promise(function(resolve, reject) {
	    var req = new XMLHttpRequest();
	    req.open('GET', url);
	    req.onload = function() {
	      if (req.status == 200) {
	        resolve(req.response);
	      }
	      else {
	        reject(Error(req.statusText));
	      }
	    };
	    req.onerror = function() {
	      reject(Error("Network Error"));
	    };
	    req.send();
	  });
	}

	function request(url) {
		//Promisifying XMLHttpRequest
		_get(url).then(function(response) {
		  return JSON.parse(response);
		}).then(function(response) {
			_parseData(response);
		}).catch(function(error) {
		  console.error("Failed!", error);
		})
	}

	function _parseData(response) {
		_fetchResults(response.hits)
	}

	function _fetchResults(results) {
		hits = results.slice(0, 10);
		for(const [index, hit] of hits.entries()){
			images[index] = {id: index, url: hit.previewURL, hidden: false, versions: 2};
		}
		Main.appendImages(images)
	}



	return {
		request :  request
	}
})()

