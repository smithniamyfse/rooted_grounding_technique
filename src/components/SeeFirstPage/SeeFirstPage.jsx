import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

function SeeFirstPage() {
  // useDispatch to send data to the store
  const dispatch = useDispatch();

  // useSelector for items
  const user = useSelector((store) => store.user);
  const inputs = useSelector((store) => store.inputs);
  const triggers = useSelector((store) => store.triggers);

  // useState to set item tags
  const [newSeeItem, setNewSeeItem] = useState("");

  const handleSubmit = () => {
    console.log("Dispatching add see item action with payload:", { label: newSeeItem });
    // Include triggerId in your payload. 
    dispatch({ type: "ADD_SEE_ITEM", payload: { seeInput: newSeeItem, triggerId: triggers.id } });

    // clear input fields
    setNewSeeItem("");
  };

  return (
    <>
      <main className="see-first-page-container">
        <h2>Welcome, {user.username}</h2>
        <div className="see-first-form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="see-item-1">
              <input
                value={newSeeItem}
                onChange={(event) => setNewSeeItem(event.target.value)}
                id="newSeeItem"
                placeholder="List one item you see"
              />
            </label>
            <br />
            <button type="submit">Submit What You See</button>
          </form>
        </div>
      </main>
      <footer className="see-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
} // end SeeFirstPage component

export default SeeFirstPage;

