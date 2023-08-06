import React, { useEffect } from "react";

function EventEntryCard({ entry }) {
    return (
        <div>
            <img src={entry.image_url} alt="Event" />
            <p>{entry.location}</p>
            <p>{entry.event_date}</p>
            <p>{entry.event_time}</p>
        </div>
    );
}

export default EventEntryCard;

