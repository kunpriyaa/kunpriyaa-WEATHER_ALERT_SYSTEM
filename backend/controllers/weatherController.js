const fetch = require("node-fetch");
const WeatherData = require("../models/weather_data");

exports.getWeatherData = async (req, res) => {
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ message: "API Key ไม่ถูกต้อง หรือไม่ได้ตั้งค่า" });
    }

    let url = "";
    if (req.query.city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(req.query.city)}&appid=${apiKey}&units=metric`;
    } else if (req.query.lat && req.query.lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${apiKey}&units=metric`;
    } else {
        return res.status(400).json({ message: "กรุณาระบุชื่อเมือง (city) หรือพิกัด (lat, lon)" });
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            res.json(data);
        } else {
            res.status(data.cod || 500).json({ message: data.message || "เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ" });
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ:", error);
        res.status(500).json({ message: "ไม่สามารถดึงข้อมูลสภาพอากาศได้" });
    }
};

exports.addWeatherData = async (req, res) => {
    try {
        const { location, temperature, humidity, wind_speed, weather_description, date_time } = req.body;

        if (!location || !temperature || !date_time) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }
        const newWeather = await WeatherData.create({
            location_name: location,
            temperature,
            humidity: humidity || null,
            wind_speed: wind_speed || null,
            weather_description: weather_description || "ไม่ระบุ",
            date_time
        });

        res.status(201).json({ message: "บันทึกข้อมูลสำเร็จ!", data: newWeather });
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        res.status(500).json({ message: "ไม่สามารถบันทึกข้อมูลได้" });
    }
};
