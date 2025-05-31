const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "conneciton error:"));
db.once("open", () => {
    console.log("Database connected");
})

// get random elements from an array of length array.length
const sample = array => array[Math.floor(Math.random() * array.length)];

// delete the database and remake randomly
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '681be8fa1dfafa6a6782182c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam inventore nam assumenda facilis blanditiis vel commodi non ab aliquam, velit modi. Amet sint est expedita! Repellat deserunt numquam corporis doloribus!',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                 ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmjrwfslp/image/upload/v1746786012/YelpCamp/qkajc7xtis36t0n8ori7.avif',
                    filename: 'YelpCamp/qkajc7xtis36t0n8ori7'                  
                },
                {
                    url: 'https://res.cloudinary.com/dmjrwfslp/image/upload/v1746786012/YelpCamp/wwr1rejeedoosohaz0o6.avif',
                    filename: 'YelpCamp/wwr1rejeedoosohaz0o6'                  
                }
              ]
        });
        await camp.save();
    };
    
}

seedDB().then(() => {
    mongoose.connection.close();
});