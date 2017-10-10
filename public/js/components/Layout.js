import React from "react";
import { Link } from "react-router";
import Navigation from "../components/includes/Navigation";

import { NotificationContainer } from 'react-notifications';

export default class Layout extends React.Component{
render(){
const { location } = this.props;
        const containerStyle = {
            marginTop: "60px"
        };
return(
            <div>
              <Navigation location={location} />
              <NotificationContainer/>
                <div class="container" style={containerStyle}>
                    <div class="row">
                        <div class="col-lg-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
