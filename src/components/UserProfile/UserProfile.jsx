import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const topTriggers = useSelector((state) => state.topTriggers) || [];
  const seeItems = useSelector((state) => state.seeItems) || [];

  useEffect(() => {
    dispatch({ type: "FETCH_TOP_TRIGGERS" });
    dispatch({ type: "FETCH_SEE_ITEMS" });
  }, [dispatch]);

  return (
    <>
      <main className="user-profile-container">
        <h1>Hello, {user.username}, your skies are clearing up.</h1>

        <section className="top-triggers-container">
          <h1>Your Top 3 Triggers Locations:</h1>
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Average Distress</th>
                {/* <th>Score</th> */}
              </tr>
            </thead>
            <tbody>
              {[...topTriggers]
                .sort(
                  (a, b) =>
                    parseFloat(b.avg_distress) - parseFloat(a.avg_distress)
                )
                .map((trigger, index) => (
                  <tr key={index}>
                    <td>{trigger.location}</td>
                    <td>{parseFloat(trigger.avg_distress).toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <section className="see-items-container">
          <h1>3 Items You're Most Likely to See:</h1>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Count</th>
                {/* <th>Average Distress</th> */}
              </tr>
            </thead>
            {/* <tbody> */}
            <tbody>
              {seeItems
                .sort((a, b) => parseFloat(b.count) - parseFloat(a.count))
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.item}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </main>
      <footer className="location-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default UserProfile;

// {/* <tbody>
//   {topTriggers.map((trigger, index) => (
//     <tr key={index}>
//       <td>{trigger.location}</td>
//       <td>{parseFloat(trigger.avg_distress).toFixed(2)}</td>
//     </tr>
//   ))}
// </tbody> */}

// {/* <tbody>
//   {topTriggers.map((trigger, index) => (
//     <tr key={index}>
//       <td>{trigger.location}</td>
//       <td>
//         {typeof trigger.avg_distress === "number"
//           ? trigger.avg_distress.toFixed(3)
//           : trigger.avg_distress}
//       </td>
//       {/* <td>{trigger.score}</td> */}
// {/* </tr>
//   ))}
// </tbody> */}
