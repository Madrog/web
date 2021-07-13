import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUp = props => {
    // set the default state of the form
    const [values, setValues] = useState();

    useEffect(() => {
        // update the document title
        document.title = 'Sign Up - Notedly';
    });

    // Apollo client 
    const client = useApolloClient();

    // Mutation hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // store the JWT in localStorage
            localStorage.setItem('token', data.signUp);
            // update the local cache
            client.writeData({ data: { isLoggedIn: true} });
            // redirect the user to the homepage
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/* if the data is laoding, display a loading message */}
            {loading && <p>Loading...</p>}
            {/* if there is an error, display a error message */}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
};


export default SignUp;