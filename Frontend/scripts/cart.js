function addToCart() {
    fetch('http://localhost:3000/users/cart')
        .then(response => response.json())
        .then(data => {
            console.log(data.users)
            // if (data.users) {
            //     //     for (let i = 0; i < data.users.length; i++) {
            //     //         document.querySelector('#state-trip-content').innerHTML += `
            //     //         <div id="state-trip-cities">
            //     //         <span id="city-A">${}</span>
            //     //         <span>></span>
            //     //         <span id="city-B">${}</span>
            //     //     </div>
            //     //     <span id="trip-hours">${}</span>
            //     //     <span id="trip-price">${}</span>
            //     //     <button id="trip-book">X</button>
            //     // </div>
            //     //     `;
            // }
            //updateDeleteCityEventListener();
        })
};


addToCart();