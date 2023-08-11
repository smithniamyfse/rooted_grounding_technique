import React from "react";

function SeeItem({ seeItem }) {
  return (
    <>
      <li>{seeItem.see_item_1}</li>
      <li>{seeItem.see_item_2}</li>
      <li>{seeItem.see_item_3}</li>
      <li>{seeItem.see_item_4}</li>
      <li>{seeItem.see_item_5}</li>
    </>
  );
}

export default SeeItem;
