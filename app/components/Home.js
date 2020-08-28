import React, { useEffect, useContext } from "react";
import Page from "./Page";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Axios from "axios";
import { Link } from "react-router-dom";
import Post from "./Post";

function Home() {
    const appState = useContext(StateContext);
    const [state, setState] = useImmer({
        isLoading: true,
        feed: [],
    });

    useEffect(() => {
        const ourRequest = Axios.CancelToken.source();
        async function fetchData() {
            try {
                const response = await Axios.post("/getHomeFeed", { token: appState.user.token }, { cancelToken: ourRequest.token });
                setState((draft) => {
                    draft.isLoading = false;
                    draft.feed = response.data;
                });
            } catch (e) {
                console.log("there was an error or the request was cancelled");
            }
        }
        fetchData();
        return () => {
            ourRequest.cancel();
        };
    }, []);

    if (state.isLoading) {
        return <LoadingDotsIcon />;
    }

    return (
        <Page title="Your Feed">
            {state.feed.length > 0 && (
                <>
                    <h2 className="text-center mb-4">The Latest Those You Follow</h2>
                    <div className="list-group"></div>
                    {state.feed.map((post) => {
                        return <Post post={post} key={post._id} />;
                    })}
                </>
            )}
            {state.feed.length == 0 && (
                <>
                    <h2 className="text-center">
                        Hello <strong>{appState.user.username}</strong>, your feed is empty.
                    </h2>
                    <p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
                </>
            )}
        </Page>
    );
}

export default Home;