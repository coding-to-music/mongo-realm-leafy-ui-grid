import React from "react";
import * as Realm from "realm-web";
import Button from "@leafygreen-ui/button";
import { useRealmApp } from "../RealmApp";
import Container from "../Components/Container";

const LoginScreen = () => {
    const app = useRealmApp();
    const handleLogin = async () => {
        try {
            await app.logIn(Realm.Credentials.anonymous());
        } catch (e) {
            console.error("error loggin in");
        }
    } 

    return (
        <Container>
            <h1>Please identify</h1>
            <Button variant="primary" onClick={() => handleLogin()}>Login</Button>
        </Container>
    )
}

export default LoginScreen;

