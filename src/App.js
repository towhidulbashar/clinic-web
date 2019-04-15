import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import classNames from 'classnames';
import {AppTopbar} from './components/common/AppTopbar';
import {AppFooter} from './components/common/AppFooter';
import {getMenuItem} from './components/common/MenuItem';
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel';
import {AppMenu} from './components/common/AppMenu';
import {AppInlineProfile} from './components/common/AppInlineProfile';
import PrivateRoute from './components/common/PrivateRoute';
import Patient from './components/patient/patient';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/common/Login';
import LoginReturn from './components/common/LoginReturn';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'fullcalendar/dist/fullcalendar.css';
import './layout/layout.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      layoutMode: 'static',
      layoutColorMode: 'dark',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false
    };
    this.createMenu();
  }
  onWrapperClick = (event) => {
    if (!this.menuClick) {
        this.setState({
            overlayMenuActive: false,
            mobileMenuActive: false
        });
    }
    this.menuClick = false;
  }
  onToggleMenu = (event) => {
    this.menuClick = true;
    if (this.isDesktop()) {
        if (this.state.layoutMode === 'overlay') {
            this.setState({
                overlayMenuActive: !this.state.overlayMenuActive
            });
        }
        else if (this.state.layoutMode === 'static') {
            this.setState({
                staticMenuInactive: !this.state.staticMenuInactive
            });
        }
    }
    else {
        const mobileMenuActive = this.state.mobileMenuActive;
        this.setState({
            mobileMenuActive: !mobileMenuActive
        });
    }   
    event.preventDefault();
  }
  onSidebarClick = (event) => {
    this.menuClick = true;
    setTimeout(() => {this.layoutMenuScroller.moveBar(); }, 500);
  }
  onMenuItemClick = (event) => {
    if(!event.item.items) {
        this.setState({
            overlayMenuActive: false,
            mobileMenuActive: false
        })
    }
  }
  createMenu() {
    this.menu = getMenuItem();
  }
  addClass(element, className) {
    if (element.classList)
        element.classList.add(className);
    else
        element.className += ' ' + className;
  }
  removeClass(element, className) {
      if (element.classList)
          element.classList.remove(className);
      else
          element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  isDesktop() {
    return window.innerWidth > 1024;
  }

  componentDidUpdate() {
    if (this.state.mobileMenuActive)
        this.addClass(document.body, 'body-overflow-hidden');
    else
        this.removeClass(document.body, 'body-overflow-hidden');
  }
  render() {
    let logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg': 'assets/layout/images/logo.svg';
    let wrapperClass = classNames('layout-wrapper', {
      'layout-overlay': this.state.layoutMode === 'overlay',
      'layout-static': this.state.layoutMode === 'static',
      'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
      'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive
    });
    let sidebarClassName = classNames("layout-sidebar", {'layout-sidebar-dark': this.state.layoutColorMode === 'dark'});
    return (
      <div className={wrapperClass} onClick={this.onWrapperClick}>
        <AppTopbar onToggleMenu={this.onToggleMenu}/>
        <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
          <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height:'100%'}}>
              <div className="layout-sidebar-scroll-content" >
                  <div className="layout-logo">
                      <img alt="Logo" src={logo} />
                  </div>
                  <AppInlineProfile />
                  <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
              </div>
          </ScrollPanel>
        </div> 
        <div className="layout-main">
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/patient" component={Patient} />
          <Route path="/login" component={Login} />
          <Route path="/login-return" component={LoginReturn} />
        </div>
        <AppFooter />
        <div className="layout-mask"></div>
      </div>
    );
  }
}

export default App;
