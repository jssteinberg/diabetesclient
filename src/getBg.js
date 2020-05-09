/*
 * Function for loading data from API.
 *
 * @callback: function to perform after data loads
 */
export default function getBg(callback) {
	fetch("https://diabetessimapi.herokuapp.com/")
		.then(res => res.json())
		.then(function (res) {

			// Run callback if provided
			if (typeof callback !== 'undefined')
				callback(res)
		});
}
