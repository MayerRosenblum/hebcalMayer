// weekZmanim.js
const { Zmanim, Location } = require('@hebcal/core');


// Helper function to get Sof Zman Krias Shma and Sof Zman Tefilla
const getZmanim = (location, date) => {
    const zmanim = new Zmanim(Location.lookup(location), date);
    const sunset = zmanim.sunset();
    const sofZmanTfila = new Date(sunset);
    // Calculate Sof Zman Tefilla (based on standard opinion, you can adjust this as needed)
    sofZmanTfila.setMinutes(sunset.getMinutes() + 30); // 30 minutes after sunset
    return {
        shma: zmanim.sunset().toLocaleTimeString(),
        tefilla: sofZmanTfila.toLocaleTimeString()
    };
};

// Helper function to calculate the dates for the days of the week
const getWeekDates = (today) => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        weekDates.push(nextDay);
    }
    return weekDates;
};

// Helper function to get Hebrew date
const getHebrewDate = (date) => {
    return date.toLocaleDateString('he-IL-u-ca-hebrew');
};

// Function to print the days of the current week with Zmanim
const printWeekZmanim = (location) => {
    const today = new Date();
    const weekDates = getWeekDates(today);
    const tableData = [];

    weekDates.forEach((date, index) => {
        const zmanim = getZmanim(location, date);
        tableData.push({
            day: getHebrewDate(date),
            shma: zmanim.shma,
            tefilla: zmanim.tefilla
        });
    });

    console.table(tableData);
};

printWeekZmanim("New York");