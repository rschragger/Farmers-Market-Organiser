async function ebFormHandler(event) {
  event.preventDefault();
  // const stall_name = document.querySelector('#stall_name').value;
  // const description = document.querySelector('#description').value;
  // const price = document.querySelector('#price').value;
  // const location_id = document.querySelector('#location_id option:checked').value;

  const events_id = document.getElementById('events-id').getAttribute("data-eventsId");
  const stall_id = document.getElementById('stall-id').getAttribute("data-stallId")
  const stallholder_id = document.getElementById('stallholder-id').getAttribute("data-stallholderId")

  const lease_start = document.getElementById('events-id').getAttribute("data-start");
  const lease_expiry = document.getElementById('events-id').getAttribute("data-end");
  
  const cost = document.getElementById('stall-id').getAttribute("data-stallId");
const description = `Stall ${stall_id} booked to ${document.getElementById('stallholder-id').textContent} for ${document.getElementById('events-id').textContent}`;

    // we need to make a booking and then an eventbooking
    const bookingResponse = await fetch(`/api/booking/`, {
      method: 'POST',
      body: JSON.stringify({
        stall_id,
        stallholder_id,
        lease_start,
        lease_expiry
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .catch(err => console.error(err));
    //   .then((response)=> {return response.json(); })
    //  .then((data) => {bookingResponse.booking_id = data.id});
  
    //if the booking is added, the booking id will be passed to the 
    // if (bookingResponse.ok) {
    //   //Fetch the id
    //   const bookingGet = await fetch(`/api/booking/${stall_id}/${stallholder_id}}/${lease_start}`, {
    //     method: 'GET',
    //     // body: JSON.stringify({
    //     // }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //     const booking_id = bookingGet.id
    //   } else {
    //     alert('Failed to add Booking');
    //   document.location.replace(`../${events_id}/${stall_id}`);
  
    //   }

  // const booking_id = bookingRepsonse.id
  const booking_id = bookingResponse.bookingId;
  // Send fetch request to add new eventbooking
  const response = await fetch(`/api/eventsbooking/`, {
    method: 'POST',
    body: JSON.stringify({
      events_id,
      stall_id,
      booking_id,
      description,
      cost
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(response => 1
      // console.log(response)
      )
    .catch(err => console.error(err));


  //if the stall is added, the 'all' template will be re-rendered
  if (response.ok) {
    document.location.replace(`../${events_id}/${stall_id+1}`);
    document.location.replace(`../${events_id}/${stall_id}`);
  } else {

  }
  document.location.replace
  document.location.replace(`../${events_id}/${stall_id}`);

}
document.querySelector('.new-eventbooking-form').addEventListener('submit', ebFormHandler);