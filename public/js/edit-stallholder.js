async function editFormHandler(event){
    event.preventDefault();

    const company_name = document.querySelector('#company_name').value;
    const description = document.querySelector('#description').value;
    const website = document.querySelector('#website').value;
    const mobile = document.querySelector('#mobile').value;
    const image = document.querySelector('#image').value;
    
    //Think we can get the data more cleanly???
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];


const response = await fetch(`/stallholder/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      company_name,
      description,
      website,
      mobile,
      image
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

document.querySelector('.edit-stallholder-form').addEventListener('submit', editFormHandler);
