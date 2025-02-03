module.exports = (timeObj) => {
    const dateTokenExpires = new Date(timeObj * 1000);
    // Add 1 hour (60 minutes * 60 seconds * 1000 milliseconds)
    dateTokenExpires.setHours(dateTokenExpires.getHours() + 1);
    // Format the date to ISO 8601 string
    return dateTokenExpires.toISOString();
};