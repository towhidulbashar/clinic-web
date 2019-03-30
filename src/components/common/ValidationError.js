import React from "react";

export const ValidationError = props => {
    return (
        <div style={{color:'#a80000'}}>
            {props.error && props.error.details[0].message}
        </div>
    );
}