import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { isLoggedIn } from "../auth/authSelectors";
import { RootState } from "./appStore";

interface LogInButtonsProps {
    loggedIn: boolean;
}

const LogInButtons = ({ loggedIn }: LogInButtonsProps) =>
    !loggedIn ? (
        <React.Fragment>
            <Link className="button is-primary" to="/signup">
                Sign Up
            </Link>
            <Link className="button is-primary s-light" to="/login">
                Log In
            </Link>
        </React.Fragment>
    ) : (
        <Link className="button is-primary" to="/logout">
            Log Out
        </Link>
    );

interface NavProps {
    loggedIn: boolean;
}

const Nav = ({ loggedIn }: NavProps) => (
    <nav
        className="navbar has-shadow is-spaced"
        role="navigation"
        aria-label="main navigation"
    >
        <div id="navbar" className="navbar-menu">
            <div className="navbar-start">
                <Link className="navbar-item" to="/tourney/">
                    Tourneys
                </Link>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <LogInButtons loggedIn={loggedIn} />
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

const mapStateToProps = (state: RootState) => ({
    loggedIn: isLoggedIn(state),
});

export default connect(mapStateToProps)(Nav);
