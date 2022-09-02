async function newFormHandler(event) {
    event.preventDefault();
    const stall_name = document.querySelector('#stall_name').value;
    const description = document.querySelector('#description').value;
    const price = document.querySelector('#price').value;
    // Send fetch request to add new stall
    const response = await fetch(`/api/`, {
      method: 'POST',
      body: JSON.stringify({
        stall_name,
        description,
        price,
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