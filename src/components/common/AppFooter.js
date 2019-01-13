import React, { Component } from 'react';

export class AppFooter extends Component {
    render() {
        return  (
            <div className="layout-footer" style={{textAlign: 'center', fontSize: '.85em'}}>
                <span className="footer-text" style={{'marginRight': '5px'}}>Patient Care by SoftSol</span>
                {/* <img src="assets/layout/images/logo.svg" alt="" width="80"/> */}
                <span className="footer-text" style={{'marginLeft': '5px'}}>&#169;All rights reserved</span>
            </div>
        );
    }
}