async function newFormHandler(event) {
    event.preventDefault();
    const event_name = document.querySelector('#event_name').value;
    const timestamp_start = document.querySelector('#timestamp_start').value;
    const timestamp_end = document.querySelector('#timestamp_end').value;
    const location_id = document.querySelector('#location_id').value;
    // Send fetch request to add new stall
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        event_name,
        timestamp_start,
        timestamp_end,
        location_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //if the stall is added, the 'all' template will be rerendered
    if (response.ok) {
      document.location.replace('../stalls');
    } else {
      alert('Failed to add event');
    }
  }
  
  document.querySelector('.new-event-form').addEventListener('submit', newFormHandler);