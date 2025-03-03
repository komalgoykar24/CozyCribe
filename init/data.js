const sampleListings = [
  {
    title: "Mountain Escape",
    description: "A beautiful retreat in the mountains with breathtaking views.",
    image: { url: "https://res.cloudinary.com/dpov5icyj/image/upload/v1740651161/blue-camping-tent-in-the-mountains-in-a-sunny-day-for-a-naturalistic-screen-saver-solitude_gnodms.webp", filename: "Mountain Escape" },
    price: 120,
    location: "Manali",
    country: "India",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [77.1892, 32.2396] }
},
{
    title: "Luxury Boathouse",
    description: "Stay on the water with modern amenities and a scenic view.",
    image: { url: "https://example.com/boathouse.jpg", filename: "boathouse1" },
    price: 200,
    location: "Kashmir",
    country: "India",
    category: "Boathouses",
    geometry: { type: "Point", coordinates: [74.7973, 34.0837] }
},
{
    title: "Farm Stay Retreat",
    description: "Enjoy a peaceful farm stay with fresh air and organic food.",
    image: { url: "https://example.com/farm.jpg", filename: "farm1" },
    price: 90,
    location: "Punjab",
    country: "India",
    category: "Farms",
    geometry: { type: "Point", coordinates: [75.3412, 31.1471] }
},
{
    title: "Royal Castle",
    description: "Live like royalty in this stunning castle stay.",
    image: { url: "https://example.com/castle.jpg", filename: "castle1" },
    price: 300,
    location: "Rajasthan",
    country: "India",
    category: "Castles",
    geometry: { type: "Point", coordinates: [74.6399, 26.9124] }
},
{
    title: "Lakeside Bliss",
    description: "A beautiful stay by the lake with stunning sunset views.",
    image: { url: "https://example.com/lake.jpg", filename: "lake1" },
    price: 150,
    location: "Udaipur",
    country: "India",
    category: "Lakes",
    geometry: { type: "Point", coordinates: [73.6846, 24.5713] }
},
{
    title: "Jungle Safari Lodge",
    description: "Adventure and nature combined in this jungle lodge.",
    image: { url: "https://example.com/jungle.jpg", filename: "jungle1" },
    price: 180,
    location: "Jim Corbett",
    country: "India",
    category: "Jungle",
    geometry: { type: "Point", coordinates: [79.1333, 29.5300] }
},
{
    title: "Beachfront Island Villa",
    description: "A private villa on a tropical island with beach access.",
    image: { url: "https://example.com/island.jpg", filename: "island1" },
    price: 350,
    location: "Andaman",
    country: "India",
    category: "Islands",
    geometry: { type: "Point", coordinates: [92.7455, 11.7401] }
},
{
    title: "Infinity Pool Paradise",
    description: "Stay in luxury with an infinity pool overlooking the city.",
    image: { url: "https://example.com/pool.jpg", filename: "pool1" },
    price: 250,
    location: "Goa",
    country: "India",
    category: "Pools",
    geometry: { type: "Point", coordinates: [73.8567, 15.2993] }
},
{
    title: "Glamping in the Hills",
    description: "Experience luxury camping with nature all around.",
    image: { url: "https://example.com/camping.jpg", filename: "camping1" },
    price: 100,
    location: "Himachal Pradesh",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [77.1734, 31.1048] }
},
{
    title: "Trending City Loft",
    description: "A modern loft in the heart of the city's nightlife district.",
    image: { url: "https://example.com/city.jpg", filename: "city1" },
    price: 220,
    location: "Mumbai",
    country: "India",
    category: "Trending",
    geometry: { type: "Point", coordinates: [72.8777, 19.0760] }
}
];

module.exports = { data: sampleListings };