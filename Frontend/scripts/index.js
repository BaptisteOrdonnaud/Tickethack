document.querySelector('#search-trip').addEventListener("click", function () {

    const departureTrip = document.querySelector('#departure').value;
    const arrivalTrip = document.querySelector('#arrival').value;
    const dateTrip = document.querySelector('#date').value;

    const body = {
        departure: departureTrip,
        arrival: arrivalTrip,
        date: dateTrip
    }

    console.log(body)

    fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(response => response.json())
        .then(dataTrip => {
            console.log(dataTrip)

            if (dataTrip.result) {

            } else {
                // ici quand ça bug
            }
        })


})