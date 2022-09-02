async function editFormHandler(event) {
    event.preventDefault();
    const stall_name = document.querySelector('#stall_name').value;
    const description = document.querySelector('#description').value;
    const price = document.querySelector('#price').value;
    
    // get the id of the stall to be edited
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/stalls/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        stall_name,
        description,
        price
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //check if the response was successful
    if (response.ok) {
      document.location.replace(`/stalls`);
    } else {
      alert('Failed to edit stall');
    }
  }
  
  document.querySelector('.edit-stall-form').addEventListener('submit', editFormHandler);
  