import React from 'react';
import { push } from "react-router";
﻿import axios from "axios";
import { NotificationManager } from 'react-notifications';

export default class Contact extends React.Component{
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor() {
        super();

        this.state = {
            errors: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        var formElement = document.querySelector("form");
        var formData = new FormData(formElement);
        axios.post(baseUrl+"api/v1/contact/create", formData)
          .then((response) => {
            this.context.router.push('/contact');
            NotificationManager.success('Message has been sent!', 'Success', 5000);
          })
          .catch((error) => {
            var errors = error.response.data.data;
            this.setState({
              errors: errors
            });
            NotificationManager.error('Error occured during operation!', 'Error', 5000);
          });
    }

    createMarkup() {
        return {__html: this.state.errors};
    }

    render(){
        var errors = '';

        if(this.state.errors != ''){
          errors = <div class="alert alert-danger" role="alert"><div dangerouslySetInnerHTML={this.createMarkup()} /></div>
        }

        return(
                  <div>
                    <h1>Contact US</h1>
                    <div className="col-lg-8">
                      {errors}
                      <form method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group col-lg-6">
                          <input className="form-control" placeholder="Full Name" name="name"/>
                        </div>

                        <div className="form-group col-lg-6">
                          <input className="form-control" placeholder="Email Address" name="email"/>
                        </div>

                        <div className="form-group col-lg-12">
                            <textarea className="form-control" name="message" placeholder="Message" rows="5"></textarea>
                        </div>

                        <div className="form-group col-lg-6">
                          <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </div>

                      </form>
                    </div>

                  </div>
              );
            }
}
