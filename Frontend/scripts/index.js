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


    const tripCrafter = (departure, arrival, date, price) => {

        // Convertir la date en objet Date
        const tripDate = new Date(date);

        // Obtenir l'heure au format HH:mm
        const tripTime = tripDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });


        return (
            `
        <div class="state-trip-content">
                                <div class="state-trip-cities">
                                    <span class="city-A">${departure}</span>
                                    <span>></span>
                                    <span class="city-B">${arrival}</span>
                                </div>
                                <span class="trip-hours">${tripTime}</span>
                                <span class="trip-price">${price}€</span>
                                <button class="trip-book">Book</button>
                            </div>
                            `
        )
    }

    fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(response => response.json())
        .then(dataTrip => {
            console.log(dataTrip)
            const trips = dataTrip.result
            if (trips.length) {
                document.querySelector('#state-search').style.display = 'none'
                document.querySelector('#state-trip').style.display = 'block'


                for (let i = 0; i < trips.length; i++) {

                    document.querySelector('#state-trip').innerHTML += tripCrafter(
                        trips[i].departure, trips[i].arrival, trips[i].date, trips[i].price
                    )

                }

            } else {
                document.querySelector('#state-search').style.display = 'none'
                document.querySelector('#state-error').style.display = 'block'
            }


            const elements = document.querySelectorAll('.trip-book')

            elements.forEach(element => {
                element.addEventListener('click', function () {
                    console.log('Élément cliqué :', this)

                    fetch('http://localhost:3000/users/addToCart', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(this)
                    }).then(response => response.json())
                })


            })
        })


})





