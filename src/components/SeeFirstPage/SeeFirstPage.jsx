import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

function SeeFirstPage() {
  const user = useSelector((store) => store.user);
  const [newSeeItem, setNewSeeItem] = useState("");

  const handleSubmit = () => {
    dispatch({type: "ADD_SEE_ITEM", payload: {label: newSeeItem}});
  }

  return (
    <>
      <main className="see-first-page-container">
        <h2>Welcome, {user.username}</h2>
        <div className="see-first-form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="see-label-1">
                    <input 
                    value={newSeeItem}
                    onChange={(e) => setNewSeeItem(e.target.value)}
                    id="newSeeLabel"
                    placeholder="List one item you see"
                    />
                </label>
            </form>
        </div>
      </main>
      <footer className="see-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
} // SeeFirstPage component

export default SeeFirstPage;
