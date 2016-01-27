import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import Menu from './../Menu.jsx';
import MenuItem from './../MenuItem.jsx';


class Aside extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navItemsShown: true,
            asideFolded: true
        }
    }

    render() {
        var navClass = classnames({hide: !this.state.navItemsShown}),
            accountClass = classnames('m-v-xs', {hide: this.state.navItemsShown}),
            asideClass = classnames('app-aside modal fade', {folded: this.state.asideFolded});


        return (
            <aside id="aside" className={asideClass} role="menu">
                <div className="left">
                    <div className="box bg-white">
                        <div className="navbar md-whiteframe-z1 no-radius blue">
                            <a className="navbar-brand">
                                <span className="hidden-folded m-l inline">Freeway</span>
                            </a>
                        </div>

                        <div className="box-row">
                            <div className="box-cell scrollable hover">
                                <div className="box-inner">
                                    <div className="p hidden-folded blue-50"
                                         style={{backgroundImage: "url(images/bg.png)",  backgroundSize: "cover"}}>
                                        <div className="rounded w-64 bg-white inline pos-rlt">
                                            <img src="images/a0.jpg" className="img-responsive rounded"/>
                                        </div>
                                        <a className="block m-t-sm" onClick={this._toggleNav.bind(this)}>
                                            <span className="block font-bold">John Smith</span>
                                            <span className="pull-right auto">
                                            <i className="fa inline fa-caret-down"></i>
                                            <i className="fa none fa-caret-up"></i>
                                            </span>
                                            john.smith@gmail.com
                                        </a>
                                    </div>
                                    <Menu header="Cool Project" className={navClass}>
                                        <MenuItem link="/companyname/dashboard" name="Dashboard" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Products" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Categories" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Orders" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Orders" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Customers" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Discounts" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Developers" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Imports/Exports" iconClass="mdi-action-perm-contact-cal" />
                                    </Menu>
                                    <Menu header="Cool Project" className={accountClass}>
                                        <MenuItem link="/companyname/dashboard" name="My Profile" iconClass="mdi-action-perm-contact-cal"/>
                                        <MenuItem link="/companyname/products" name="Settings" iconClass="mdi-action-settings" />
                                        <MenuItem link="/companyname/products" name="Logout" iconClass="mdi-action-exit-to-app" />
                                        <li className="m-v-sm b-b b"></li>
                                        <li>
                                            <div className="nav-item">
                                                <label className="md-check">
                                                    <input type="checkbox" onChange={this._foldAside.bind(this)}/>
                                                    <i className="purple no-icon"></i>
                                                            <span
                                                                className="hidden-folded">Folded aside</span>
                                                </label>
                                            </div>
                                        </li>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <nav>
                            <ul className="nav b-t b">
                                <li>
                                    <a href="#" target="_blank" md-ink-ripple="" className=" waves-effect">
                                        <i className="icon mdi-action-help i-20"></i>
                                        <span>Help &amp; Feedback</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </aside>
        )
    }

    _toggleNav() {
        this.setState({navItemsShown: !this.state.navItemsShown});
    }

    _foldAside() {
        this.setState({asideFolded: !this.state.asideFolded});
    }
}

export default Aside;
