import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Firebase from "./config/Firebase";
import { LoadingRouter, AppRouter, AuthRouter } from "./routes";

export default class App extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            authState: "loading",
        };
    }

    componentDidMount() {
        this._isMounted = true;
        Firebase.auth().onAuthStateChanged((user) => {
            if (this._isMounted) {
                if (user) {
                    this.setState({ authState: "loggedIn" });
                } else {
                    this.setState({ authState: "loggedOut" });
                }
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <NavigationContainer>
                {this.state.authState === "loggedOut" ? (
                    <AuthRouter />
                ) : this.state.authState === "loggedIn" ? (
                    <AppRouter />
                ) : (
                    <LoadingRouter />
                )}
            </NavigationContainer>
        );
    }
}
