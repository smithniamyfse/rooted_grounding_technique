function convertDateAndTime(dateStr, timeStr) {
    // Check for undefined values
    if (!dateStr || !timeStr) {
        return [null, null];
    }

    // Convert date format
    let dateObj = new Date(dateStr);
    let formattedDate = (dateObj.getMonth() + 1).toString().padStart(2, '0') + 
                        '-' + dateObj.getDate().toString().padStart(2, '0') +
                        '-' + dateObj.getFullYear();

    // Convert time format
    let [hour, minute] = timeStr.split(":");
    let suffix = "AM";
    hour = parseInt(hour, 10);
    if (hour >= 12) {  
        if (hour > 12) hour -= 12;
        suffix = "PM";
    } else if (hour === 0) {
        hour = 12;
    }
    let formattedTime = hour + ":" + minute + suffix;

    return [formattedDate, formattedTime];
}

export default convertDateAndTime;
