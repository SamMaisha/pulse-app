import React from "react";

export const PageLoader = () => {
    const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

    return (
        <div className="loader" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
            <img src={loadingImg} alt="Loading..." style={{
                width: "50%",
                opacity: "0.3",
            }} />
        </div>
    );
};
