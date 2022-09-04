const updateMarketDate = (e) => {
	const values = e.target.value.split('_');
	const marketId = values[0]
	const date = moment(values[1]).format('DD-MMMM-YYYY');
	
	// Not the most elegant way but since this is a MVP, it will do for now
	window.location = `/market/${marketId}?currDate=${date}`;
};


document.getElementById("market-date-select")?.addEventListener("change", updateMarketDate);