/*
 * Function for loading data from API.
 *
 * @callback: function to perform after data loads
 */
export default function getBg(callback) {
	// fetch("https://diabetessimapi.herokuapp.com/")
	// fetch("http://127.0.0.1:4500/")
	fetch("http://127.0.0.1:4500/diabetes?m1=30&m2=30&m3=30&m4=30")
		.then(res => res.json())
		.then(function (res) {

			// Run callback if provided
			if (typeof callback !== 'undefined')
				callback(res)
		});
}
