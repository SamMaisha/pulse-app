import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Container } from "@mui/material";
import { PageLoader } from "./page-loader";

const AuthenticationGuard = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <Container>
                <PageLoader />
            </Container>
        ),
    });
    return <Component />;
};

export default AuthenticationGuard
