import React from "react";
import { useDispatch } from "react-redux";
import { Container, TextField, Box, Slide } from "@mui/material";

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
        <Box mb={3}>
          <TextField
            label="Update:"
            variant="standard"
            name="see_item_1"
            value={seeItem.see_item_1}
            placeholder="See 1"
            onChange={(event) => handleChange(event, "see_item_1")}
          />
        </Box>

        <Box mb={3}>
          <TextField
            label="Update:"
            variant="standard"
            name="see_item_2"
            value={seeItem.see_item_2}
            placeholder="See 2"
            onChange={(event) => handleChange(event, "see_item_2")}
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Update:"
            variant="standard"
            name="see_item_3"
            value={seeItem.see_item_3}
            placeholder="See 3"
            onChange={(event) => handleChange(event, "see_item_3")}
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Update:"
            variant="standard"
            name="see_item_4"
            value={seeItem.see_item_4}
            placeholder="See 4"
            onChange={(event) => handleChange(event, "see_item_4")}
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Update:"
            variant="standard"
            name="see_item_5"
          value={seeItem.see_item_5}
          placeholder="See 5"
          onChange={(event) => handleChange(event, "see_item_5")}
        />
        </Box>
      </form>
    </>
  );
}

export default EditSeeItem;
