import React from "react";
import * as Realm from "realm-web";
import styled from "@emotion/styled";
import TextInput from "@leafygreen-ui/text-input";
import Button from "@leafygreen-ui/button";
import validator from "validator";

import { useRealmApp } from "../RealmApp";
import Container from "../Components/Container";

const LoginScreen = () => {
    const app = useRealmApp();
    const [email, setEmail] = React.useState("philip@eschenbacher.ch");
    const [password, setPassword] = React.useState("Passw0rd");

    const handleLogin = async () => {
        try {
            await app.logIn(Realm.Credentials.emailPassword(email, password));
        } catch (e) {
            console.error("error loggin in");
        }
    } 

    return (
        <Container>
            <LoginFormRow>
                <LoginHeading>Please identify</LoginHeading>
            </LoginFormRow>
            <LoginFormRow>
                <TextInput 
                    type="email" 
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </LoginFormRow>
            <LoginFormRow>
                <TextInput 
                    type="password" 
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </LoginFormRow>            
            <Button variant="primary" onClick={() => handleLogin()}>Login</Button>
        </Container>
    )
}

export default LoginScreen;

const LoginHeading = styled.h1`
  margin: 0;
  font-size: 32px;
`;

const LoginFormRow = styled.div`
  margin-bottom: 16px;
`;