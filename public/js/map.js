mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
container: 'map', // container ID
center:listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
 zoom: 9 // starting zoom
});



const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h4>${listing.title}</h4><p>Location details will be provided after your booking is confirmed!</p>`)
    .setMaxWidth("200px"); 
     
const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates) 
    .setPopup(popup) 
    .addTo(map);
