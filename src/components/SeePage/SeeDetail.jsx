import React from "react";

function SeeDetail(props) {
  return (
    <>
      <ol>
        <li>{props.seeItem.see_item_1}</li>
        <li>{props.seeItem.see_item_2}</li>
        <li>{props.seeItem.see_item_3}</li>
        <li>{props.seeItem.see_item_4}</li>
        <li>{props.seeItem.see_item_5}</li>
      </ol>
    </>
  );
}

export default SeeDetail;




// ** VERSION 2 **
// import React from "react";
// import { Button } from "@mui/material";

// function SeeDetail(props) {
//   return (
//     <>
//       <ul>
//         <li>{props.seeItem.see_item_1}</li>
//         <li>{props.seeItem.see_item_2}</li>
//         <li>{props.seeItem.see_item_3}</li>
//         <li>{props.seeItem.see_item_4}</li>
//         <li>{props.seeItem.see_item_5}</li>
//       </ul>
//       <div className="edit-si-button-container">
//         <Button variant="contained" onClick={() => props.onEdit(props.seeItem)}>
//           Edit
//         </Button>
//       </div>
//     </>
//   );
// }

// export default SeeDetail;


// ** OG
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// function SeeDetail(props) {

//   const dispatch = useDispatch();
//   const history = useHistory();

//   function handleEditClick() {
//     // go to /edit-see-item
//     // /edit-see-item will need access to the current see_inputs
//     dispatch({
//       type: "EDIT_SEE_ITEM",
//       payload: props.seeItem
//     });
//     history.push('/edit-see-item');
//   }

//   return (
//     <>
//     <ul>
//       <li>{props.seeItem.see_item_1}</li>
//       <li>{props.seeItem.see_item_2}</li>
//       <li>{props.seeItem.see_item_3}</li>
//       <li>{props.seeItem.see_item_4}</li>
//       <li>{props.seeItem.see_item_5}</li>
//       </ul>
//       <div className="edit-si-button-container">
//       <button onClick={handleEditClick}>Edit</button>
//       </div>
//       </>
//   );
// }

// export default SeeDetail;
