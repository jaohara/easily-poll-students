import React from "react";
import {  useNavigate } from "react-router-dom";
import { useAuthenticator, View } from "@aws-amplify/ui-react";
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import '../../../styles/App.scss';
import theme from '../../../styles/theme.js';




export default function Dashboard() {
    const { route, signOut } = useAuthenticator((context) => [
        context.route,
        context.signOut,
    ]);
    const navigate = useNavigate();

    function logOut() {
        signOut();
        navigate("/");
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <nav>

                    <Button onClick={() => logOut()}>Logout</Button>
                </nav>
                <View>
                    {route === "authenticated" ? "You are logged in!" : "Not logged in!"}
                </View>

            
            </ThemeProvider>
        </>
    );
}