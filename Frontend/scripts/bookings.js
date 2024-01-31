function tripsBooked() {
    fetch('http://localhost:3000/users/tripBooked')
        .then(response => response.json())
        .then(data => {
            console.log(data.cartPayed);

            if (data.cartPayed && data.cartPayed.length > 0) {
                document.querySelector('#container-books-text').style.display = 'none';
                document.querySelector('#container-books-full').style.display = 'block';



                for (let i = 0; i < data.cartPayed.length; i++) {
                    const departure = data.cartPayed[i].trip.departure;
                    const arrival = data.cartPayed[i].trip.arrival;
                    const date = data.cartPayed[i].trip.date;
                    const price = data.cartPayed[i].trip.price;

                    // Convertir la date en objet Date
                    const tripDate = new Date(date);

                    // Obtenir l'heure au format HH:mm
                    const tripTime = tripDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

                    const tripContent = `
                        <div class="travelContainer">
                            <div class="state-trip-cities">
                                <span class="city-A">${departure}</span>
                                <span>></span>
                                <span class="city-B">${arrival}</span>
                            </div>
                            <span class="trip-hours">${tripTime}</span>
                            <span class="trip-price">${price}€</span>
                            <span>Departure in <span id="book-hour"></span> hours</span>
                        </div>
                    `;
                    document.querySelector('#state-trip-content').innerHTML += tripContent;
                }

            } else {
                document.querySelector('#container-books-text').style.display = 'block';
                document.querySelector('#container-books-full').style.display = 'none';
            }
        });
}


tripsBooked();