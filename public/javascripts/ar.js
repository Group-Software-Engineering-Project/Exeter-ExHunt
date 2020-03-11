const loadPlaces = function (coords) {
    // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY

    const PLACE =
        {
            name: "Your place name",
            location: {
                lat: 50.737404, // add here latitude if using static data
                lng: -3.532505, // add here longitude if using static data
            }
        };
    
    return Promise.resolve(PLACE);
};


window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((place) => {
                    console.log(place);
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place name
                    const text = document.createElement('a-image');
                    text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    text.setAttribute('title', place.name);
                    text.setAttribute('scale', '20 20 20');
                    text.setAttribute('src','../images/exerterbanner.jpg')
                    console.log('set');
                    
                    text.addEventListener('loaded',()=>window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')))

                    text.addEventListener('click', () => {
                        console.log('clicked');

                    scene.appendChild(text);

                    });
                    
                    
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};

function confirm_coord(position) {
    var lat3=position.coords.latitude;
    var lon3=position.coords.longitude;

    var lat4= parseFloat($("#lat").text());
    var lon4= parseFloat($("#lon").text());

    var R = 6371e3; // metres
    var φ1 = lat3.toRadians();
    var φ2 = lat4.toRadians();
    var Δφ = (lat4-lat3).toRadians();
    var Δλ = (lon4-lon3).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    if (d>150) {
        alert("You are still "+d+" metres away")
        document.getElementById("AR").style.display="inline-block";
    }
    else {
        window.location.href='/track_loop/loop';
    }

}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(confirm_coord);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }


Number.prototype.toRadians = function() { return this * Math.PI / 180; };