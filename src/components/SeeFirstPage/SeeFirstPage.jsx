import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

function SeeFirstPage() {
  // useDispatch to send data to the store
  const dispatch = useDispatch();

  // useSelector for items
  const user = useSelector((store) => store.user);
  const forms = useSelector((store) => store.forms);

  // useState to set item tags
  const [labelSeeItem, setLabelSeeItem] = useState("");

  const handleSubmit = () => {
    dispatch({ type: "ADD_SEE_ITEM", payload: { label: newSeeItem } });

    // clear input fields
    setNewSeeItem("");
  };

  return (
    <>
      <main className="see-first-page-container">
        <h2>Welcome, {user.username}</h2>
        <div className="see-first-form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="see-label-1">
              <input
                value={labelSeeItem}
                onChange={(event) => setLabelSeeItem(event.target.value)}
                id="labelSeeItem"
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
