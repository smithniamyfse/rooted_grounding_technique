import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const topTriggers = useSelector((state) => state.topTriggers) || [];
  const seeItems = useSelector((state) => state.seeItems) || [];

  useEffect(() => {
    dispatch({ type: 'FETCH_TOP_TRIGGERS' });
    dispatch({ type: 'FETCH_SEE_ITEMS' });
  }, [dispatch]);

  return (
    <>
      <main className="user-profile-container">
        <h1>Hello, {user.username}, your skies are clearing up.</h1>

        <section className="top-triggers-container">
          <h1>Your Top Triggers:</h1>
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Average Distress</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {topTriggers.map((trigger, index) => (
                <tr key={index}>
                  <td>{trigger.location}</td>
                  <td>
                    {typeof trigger.avg_distress === "number"
                      ? trigger.avg_distress.toFixed(1)
                      : trigger.avg_distress}
                  </td>
                  <td>{trigger.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="see-items-container">
          <h1>Your Most Common See Items:</h1>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Count</th>
                <th>Average Distress</th>
              </tr>
            </thead>
            <tbody>
              {seeItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td>{item.count}</td>
                  <td>
                    {typeof item.avg_distress === "number"
                      ? item.avg_distress.toFixed(1)
                      : item.avg_distress}
                  </td>
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



