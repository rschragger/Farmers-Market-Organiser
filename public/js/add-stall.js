async function newFormHandler(event) {
    event.preventDefault();
    const stall_name = document.querySelector('#stall_name').value;
    const description = document.querySelector('#description').value;
    const price = document.querySelector('#price').value;
    const location_id= document.querySelector('#location_id option:checked').value;
    // Send fetch request to add new stall
    const response = await fetch(`/api/stalls/`, {
      method: 'POST',
      body: JSON.stringify({
        stall_name,
        description,
        price,
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
      alert('Failed to add stall');
    }
  }
  
  document.querySelector('.new-stall-form').addEventListener('submit', newFormHandler);