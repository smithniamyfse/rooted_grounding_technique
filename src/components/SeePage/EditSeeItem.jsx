import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


function EditSeeItem({ onSave, onCancel, seeItem, setSeeItemToEdit }) {
    const dispatch = useDispatch();
  
    const handleChange = (event, propertyToChange) => {
      // Update the seeItem directly in the parent component
      setSeeItemToEdit({
        ...seeItem,
        [propertyToChange]: event.target.value,
      });
    };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // dispatch an action that is being listened for by a saga
//     dispatch({ type: "SUBMIT_EDIT_SEE_ITEM", payload: seeItemToEdit });

//     history.push("/");
//   };

//   const cancelEdit = () => {
//     history.push("/");
//   };

  return (
    <>
      <form>
      <input
          value={seeItem.see_item_1}
          placeholder="see_item_1"
          onChange={(event) => handleChange(event, "see_item_1")}
        />
        <input
          value={seeItem.see_item_2}
          placeholder="see_item_2"
          onChange={(event) => handleChange(event, "see_item_2")}
        />
        <input
          value={seeItem.see_item_3}
          placeholder="see_item_3"
          onChange={(event) => handleChange(event, "see_item_3")}
        />
        <input
          value={seeItem.see_item_4}
          placeholder="see_item_4"
          onChange={(event) => handleChange(event, "see_item_4")}
        />
        <input
          value={seeItem.see_item_5}
          placeholder="see_item_5"
          onChange={(event) => handleChange(event, "see_item_5")}
        />
      </form>
    </>
  );
}

export default EditSeeItem;
