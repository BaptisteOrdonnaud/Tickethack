// function Cart() {
//     fetch('http://localhost:3000/users/cart')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data.cart)
//             if (data.users) {
//                 for (let i = 0; i < data.cart.length; i++) {
//                     document.querySelector('#state-trip-content').innerHTML += `
//                         <div id="state-trip-cities">
//                         <span id="city-A"></span>
//                         <span>></span>
//                         <span id="city-B"></span>
//                     </div>
//                     <span id="trip-hours"></span>
//                     <span id="trip-price"></span>
//                     <button id="trip-book">X</button>
//                 </div>
//                     `;
//                 }
//             } //updateDeleteCityEventListener();
//         })
// }

function Cart() {
    fetch('http://localhost:3000/users/allTrips')
        .then(response => response.json())
        .then(data => {
            console.log(data.allTrips[0].trip.departure);
            if (data.allTrips.length) {
                document.querySelector('#container-cart-text').style.display = 'none'
                document.querySelector('#container-cart-full').style.display = 'block'

                for (let i = 0; i < data.allTrips.length; i++) {
                    const departure = data.allTrips[i].trip.departure;
                    const arrival = data.allTrips[i].trip.arrival;
                    const date = data.allTrips[i].trip.date;
                    const price = data.allTrips[i].trip.price;

                    document.querySelector('#state-trip-content').innerHTML += `
                        <div class="state-trip-item">
                            <div id="state-trip-cities">
                                <span id="city-A">${departure}</span>
                                <span>></span>
                                <span id="city-B">${arrival}</span>
                            </div>
                            <span id="trip-hours">${date}</span>
                            <span id="trip-price">${price}</span>
                            <button class="trip-book">X</button>
                        </div>
                    `;
                }
            }
            // Ajoutez ici l'appel à une fonction pour mettre à jour les gestionnaires d'événements pour les boutons "trip-book"
        })
}
Cart();