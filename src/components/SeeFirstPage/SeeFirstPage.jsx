import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';

function SeeFirstPage() {

    return (
        <main className="see-first-page-container">
            <h2>Welcome, {user.username}</h2>

            <LogOutButton className="btn" />
        </main>

    );
} // SeeFirstPage component

export default SeeFirstPage;