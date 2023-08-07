import React, { useState } from "react";
import { useDispatch } from "react-redux";
import convertDateAndTime from "../../utils/dateUtils";

const EventEntryCard = ({ entry }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [updatedEntry, setUpdatedEntry] = useState(entry);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    dispatch({ type: "UPDATE_DATE_TIME", payload: updatedEntry });
    dispatch({ type: "FETCH_UPDATED_ENTRY", payload: updatedEntry.id });
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    setUpdatedEntry({
      ...updatedEntry,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteClick = () => {
    dispatch({ type: "DELETE_ENTRY", payload: entry.id });
  };

  return (
    <div className="card">
      <img src={entry.image_url} alt="Event" />
      <div>{entry.location}</div>
      <div>
        {editMode ? (
          <input
            type="date"
            name="date"
            value={updatedEntry.date}
            onChange={handleInputChange}
          />
        ) : (
          <div>{convertDateAndTime(entry.date, entry.time)[0]}</div>
        )}
      </div>
      <div>
        {editMode ? (
          <input
            type="time"
            name="time"
            value={updatedEntry.time}
            onChange={handleInputChange}
          />
        ) : (
          <div>{convertDateAndTime(entry.date, entry.time)[1]}</div>
        )}
      </div>
      <div>
        {editMode ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
      <div>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default EventEntryCard;
