import React from "react";

function SeeItem({ seeItem }) {
  return (
    <>
    <ol>
      <li>{seeItem.see_item_1}</li>
      <li>{seeItem.see_item_2}</li>
      <li>{seeItem.see_item_3}</li>
      <li>{seeItem.see_item_4}</li>
      <li>{seeItem.see_item_5}</li>
      </ol>
    </>
  );
}

export default SeeItem;
