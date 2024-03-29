
function Cart() {
    fetch('http://localhost:3000/users/allTrips')
        .then(response => response.json())
        .then(data => {
            //console.log(data.allTrips[0].trip._id);
            if (data.allTrips.length) {
                document.querySelector('#container-cart-text').style.display = 'none'
                document.querySelector('#container-cart-full').style.display = 'block'
                let totalPrice = 0;


                for (let i = 0; i < data.allTrips.length; i++) {
                    const id = data.allTrips[i].trip._id;

                    const departure = data.allTrips[i].trip.departure;
                    const arrival = data.allTrips[i].trip.arrival;
                    const date = data.allTrips[i].trip.date;
                    const price = data.allTrips[i].trip.price;
                    totalPrice += price;
                    // Convertir la date en objet Date
                    const tripDate = new Date(date);

                    // Obtenir l'heure au format HH:mm
                    const tripTime = tripDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });



                    document.querySelector('#state-trip-content').innerHTML += `
                        <div class="travelContainer">
                            <div class="state-trip-cities">
                                <span class="city-A">${departure}</span>
                                <span>></span>
                                <span class="city-B">${arrival}</span>
                            </div>
                            <span class="trip-hours">${tripTime}</span>
                            <span class="trip-price">${price}€</span>
                            <button id="${id}" class="trip-book">X</button>
                        </div>
                    `;


                }
                document.querySelector("#total").textContent = totalPrice

                deleteTrip()


            }

        })
}

Cart()

function deleteTrip() {
    const tripBooks = document.querySelectorAll('.trip-book');
    for (let i = 0; i < tripBooks.length; i++) {
        tripBooks[i].addEventListener('click', () => {
            const body = {
                travelId: tripBooks[i].id
            };
            console.log(tripBooks[i].id)


            fetch(`http://localhost:3000/users/deleteTrip`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.result) {
                        tripBooks[i].parentNode.remove();
                    }
                    location.reload();
                });
        });
    }
}




const total = document.querySelector("#id");


document.querySelector('#purchase').addEventListener("click", function () {

    fetch('http://localhost:3000/users/payTrip', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
    window.location.assign('bookings.html')
})