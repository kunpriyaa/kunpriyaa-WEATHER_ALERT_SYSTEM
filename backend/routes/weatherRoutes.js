const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const router = express.Router();

async function sendEmailNotification(subject, message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',  
        },
    });

    const mailOptions = {
        from: '"Weather Alert System" <your-email@gmail.com>',
        to: 'recipient-email@example.com',
        subject: subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Weather alert sent!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

router.get('/', async (req, res) => {
    const location = req.query.location || 'Bangkok';

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);

        const temp = weatherData.data.main.temp;
        const description = weatherData.data.weather[0].description;
        const rain = weatherData.data.rain ? weatherData.data.rain['1h'] : 0;

        console.log(weatherData.data);
        let notificationMessage = `Weather Alert for ${location}: Temperature is ${temp}°C. Weather: ${description}.`;

        if (temp > 30) {
            notificationMessage += ` It's very hot! Temperature is above the threshold of 30°C.`;
        }

        if (rain > 0) {
            notificationMessage += ` Heavy rain detected! Rainfall: ${rain} mm.`;
        }
        if (temp > 30 || rain > 0) {
            await sendEmailNotification('Weather Alert', notificationMessage);
        }

        res.json(weatherData.data);
    } catch (error) {
        console.error('Error fetching weather data', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

module.exports = router;

