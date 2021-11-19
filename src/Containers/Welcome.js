import React from "react";
import { useRealmApp } from "../RealmApp";

const HelloWorld = () => {
    const app = useRealmApp();
    console.log(app);

    return (
        <h1>User: {app.currentUser?app.currentUser:"not logged in"}</h1>
    )
}

export default HelloWorld;