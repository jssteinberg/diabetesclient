/*
 * Function for loading data from API.
 *
 * @callback: function to perform after data loads
 */
export default function getBg(callback) {
	console.log('getBg()')
	fetch('https://diabetessimapi.herokuapp.com/')
		.then(d => d.json())
		.then(function (d) {
			console.log(d)

			// Run callback if provided
			if (typeof callback !== 'undefined') callback()

			return d
		})
}
