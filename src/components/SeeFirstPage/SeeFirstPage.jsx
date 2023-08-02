import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

function SeeFirstPage() {
  // useDispatch to send data to the store
  const dispatch = useDispatch();

  // useSelector for items
  const user = useSelector((store) => store.user);
  const seeInputs = useSelector((store) => store.seeInputs);
  const eventEntries = useSelector((store) => store.eventEntries[0]);

  const initialSeeValues = {
    see_item_1: "",
    see_item_2: "",
    see_item_3: "",
    see_item_4: "",
    see_item_5: "",
  };



  const [seeLog, setSeeLog] = useState(initialSeeValues);


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSeeLog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addSeeLog = (event) => {
    event.preventDefault();
    // Include eventId in your payload.
    if (eventEntries && eventEntries.id) {
      dispatch({
        type: "ADD_SEE_DATA",
        payload: { ...seeLog, eventId: eventEntries.id },
      });
    } else {
      console.log("No event entry selected.");
    }
    // Reset the form after submitting
    // setSeeLog(initialSeeValues);
    setSeeLog("");
  };

  // Dispatch action to fetch event entries when component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_ENTRIES" });
  }, [dispatch]);



  return (
    <>
      <main className="see-first-page-container">
        <h2>Welcome, {user.username}</h2>
        <div className="see-first-form-container">
          <form onSubmit={addSeeLog}>
            <label htmlFor="see-item-1">Item 1:
              <input
                type="text"
                name="see_item_1"
                onChange={handleInputChange}
                id="see_item_1"
                // placeholder="List one item you see"
              />
            </label>
            <br />
            <label htmlFor="see-item-2">Item 2:
                <input
                type="text"
                name="see_item_2"
                onChange={handleInputChange}
                id="see_item_2"
                // placeholder="List second item"
                />
            </label>
            <br />
            <label htmlFor="see-item-3">Item 3:
            <input
            type="text"
            name="see_item_3"
            onChange={handleInputChange}
            id="see_item_3"
            />
            </label>
            <br />
            <label htmlFor="see-item-4">Item 4:
            <input
            type="text"
            name="see_item_4"
            onChange={handleInputChange}
            id="see_item_4"
            />
            </label>
            <br />
            <label htmlFor="see-item-5">Item 5:
            <input
            type="text"
            name="see_item_5"
            onChange={handleInputChange}
            id="see_item_5"
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
}

export default SeeFirstPage;

// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import LogOutButton from "../LogOutButton/LogOutButton";

// function SeeFirstPage() {
//   // useDispatch to send data to the store
//   const dispatch = useDispatch();

//   // useSelector for items
//   const user = useSelector((store) => store.user);
//   const seeInputs = useSelector((store) => store.seeInputs);
//   const eventEntries = useSelector((store) => store.eventEntries);

//   // useState to set item tags
//   const [newSeeInput, setNewSeeInput] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log({ seeInput: newSeeInput, eventId: eventEntries?.id }); // added optional chaining
//     dispatch({ type: "ADD_SEE_ITEM", payload: { seeInput: newSeeInput, eventId: eventEntries?.id } }); // added optional chaining
//     setNewSeeInput("");
//   };

//   return (
//     <>
//       <main className="see-first-page-container">
//         <h2>Welcome, {user.username}</h2>
//         <div className="see-first-form-container">
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="see-item-1">
//               <input
//                 value={newSeeInput}
//                 onChange={(event) => setNewSeeInput(event.target.value)}
//                 id="newSeeInput"
//                 placeholder="List one item you see"
//               />
//             </label>
//             <br />
//             <button type="submit">Submit What You See</button>
//           </form>
//         </div>
//       </main>
//       <footer className="see-footer-container">
//         <LogOutButton className="btn" />
//       </footer>
//     </>
//   );
// }

// export default SeeFirstPage;

/*
An import for useDispatch and useSelector from react-redux to dispatch actions and select parts of the state.
A functional component SeeFirstPage that returns a form for the user to submit what they see.
The useDispatch hook is called to get the dispatch function for dispatching actions to the store.
The useSelector hook is used to select the user, seeInputs, and eventEntries slices of state from the Redux store.
A state variable newSeeInput is declared with useState, and set to an empty string to start. This will hold the value of the new see input.
A handleSubmit function is declared that dispatches an action to add a see input when the form is submitted. This function prevents the default form submission behavior, logs the action being dispatched, dispatches the ADD_SEE_INPUT action with the new see input and the event entry's id as the payload, and then clears the newSeeInput state.
In the render method, a form is returned that includes an input field and a submit button. The input's value is set to newSeeInput, and when the input changes, setNewSeeInput is called with the new value. When the form is submitted, handleSubmit is called.
Please note, in the real application you need to handle the eventEntries selection carefully as it's an array of objects. You need to find out the exact event you are working on. For the simplicity, I am just using eventEntries.id in this code snippet. Please replace it with the correct id you want to associate the see input with.
*/

/*
import React, { useState } from 'react';

function SeeFirstPage() {
  const [seeInputs, setSeeInputs] = useState({
    see_item_1: '',
    see_item_2: '',
    see_item_3: '',
    see_item_4: '',
    see_item_5: '',
  });

  const handleInputChange = (e) => {
    setSeeInputs({
      ...seeInputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to your backend service
    console.log(seeInputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item 1:
        <input type="text" name="see_item_1" onChange={handleInputChange} />
      </label>
      <label>
        Item 2:
        <input type="text" name="see_item_2" onChange={handleInputChange} />
      </label>
      <label>
        Item 3:
        <input type="text" name="see_item_3" onChange={handleInputChange} />
      </label>
      <label>
        Item 4:
        <input type="text" name="see_item_4" onChange={handleInputChange} />
      </label>
      <label>
        Item 5:
        <input type="text" name="see_item_5" onChange={handleInputChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SeeFirstPage;

*/
