async function newFormHandler(event) {
    event.preventDefault();
    const market_name = document.querySelector('#market_name').value;
    const description = document.querySelector('#description').value;
    const address = document.querySelector('#address').value;
    const website= document.querySelector('#website').value;
   // Send fetch request to add new stall
    const response = await fetch(`/api/locations/`, {
      method: 'POST',
      body: JSON.stringify({
        market_name,
        description,
        address,
        website,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //if the stall is added, the 'all' template will be rerendered
    if (response.ok) {
      document.location.replace('../stalls');
    } else {
      alert('Failed to add location');
    }
  }
document.querySelector('.new-location-form').addEventListener('submit', newFormHandler);
