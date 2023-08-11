import { useSelector } from "react-redux";
import SeeItem from "./SeeItem";

function SeeList() {
    // Access the seeData from the seeReducer
    const seeData = useSelector((store) => store.seeReducer.seeData);
  
    return (
      <ul>
        {seeData.map((seeItem, index) => (
          <SeeItem key={index} seeItem={seeItem} />
        ))}
      </ul>
    );
  }
  
  export default SeeList;
  



// ** VERSION 1: INSPIRED BY LECTURE ** 
// import { useSelector } from "react-redux";
// import SeeDetail from "../StudentDetail/StudentDetail";

// function SeeList(props) {
//   const seeItems = useSelector((store) => store.seeItemsReducer);

//   return (
//     <li>
//       {seeItems.map((seeItem) => {
//         return <SeeDetail key={seeItem.id} seeItem={seeItem} />;
//       })}
//     </li>
//   );
// }

// export default SeeList;

/*
import { useSelector } from "react-redux";
import SeeDetail from "../StudentDetail/StudentDetail";

function SeeList(props) {
  const seeItems = useSelector((store) => store.seeItemsReducer);

  return (
    <li>
      {seeItems.map((seeItem) => {
        return <SeeDetail key={seeItem.id} seeItem={seeItem} />;
      })}
    </li>
  );
}

export default SeeList;

*/
