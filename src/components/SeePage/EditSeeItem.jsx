import React from "react";
import { useDispatch } from "react-redux";

function EditSeeItem({ seeItem: originalSeeItem, setSeeItemToEdit }) {
    const seeItem = {
      see_item_1: originalSeeItem?.see_item_1 || "",
      see_item_2: originalSeeItem?.see_item_2 || "",
      see_item_3: originalSeeItem?.see_item_3 || "",
      see_item_4: originalSeeItem?.see_item_4 || "",
      see_item_5: originalSeeItem?.see_item_5 || "",
    };
  const dispatch = useDispatch();

  const handleChange = (event, propertyToChange) => {
    // Update the seeItem directly in the parent component
    setSeeItemToEdit({
      ...seeItem,
      [propertyToChange]: event.target.value,
    });
  };

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
