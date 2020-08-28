import React from "react";
import Page from "./Page";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <Page title="not Found">
            <div className="text-center">
                <h2>whoops, we cannot find that page</h2>
                <p className="lead text-muted">
                    you can visit <Link to="/">homepage</Link> to see posts
                </p>
            </div>
        </Page>
    );
}

export default NotFound;
