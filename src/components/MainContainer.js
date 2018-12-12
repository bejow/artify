import React from 'react';

export const MainContainer = (props) => {
    return(
        <div className="new-wrapper">
            <div id="main">
                <div id="main-contents">
                    <h1>Multi-level Side Navigation</h1>
                    {props.childrend}
                </div>
            </div>
        </div>
    )
}