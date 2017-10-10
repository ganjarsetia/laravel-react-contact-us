import React from 'react';
import { push } from "react-router";
﻿import axios from "axios";
import { NotificationManager } from 'react-notifications';

class NewUser extends React.Component{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(){
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
    axios.post(baseUrl+"api/v1/users/create", formData)
      .then((response) => {
        this.context.router.push('/users');
        NotificationManager.success('User has been created!', 'Success', 5000);
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
                <h1>Create New User</h1>
                <div className="col-lg-8">
                  {errors}
                  <form method="post" onSubmit={this.handleSubmit}>
                    <div className="form-group col-lg-6">
                      <input className="form-control" placeholder="Full Name" name="name"/>
                    </div>

                    <div className="form-group col-lg-6">
                      <input className="form-control" placeholder="Email Address" name="email"/>
                    </div>

                    <div className="form-group col-lg-6">
                      <input type="password" className="form-control" placeholder="Password" name="password"/>
                    </div>

                    <div className="form-group col-lg-6">
                      <input type="password" className="form-control" placeholder="Confirm Password" name="password_confirmation" />
                    </div>

                    <div className="form-group col-lg-6">
                      <input className="form-control" placeholder="Phone Number" name="phone_number" />
                    </div>

                    <div className="form-group col-lg-6">
                      <input className="form-control" placeholder="Contact Address" name="contact_address" onChange={this.handleUpdate} />
                    </div>

                    <div className="form-group col-lg-6">
                      <button type="submit" className="btn btn-primary btn-block">Create User</button>
                    </div>

                  </form>
                </div>

              </div>
          );
        }
  }

export default NewUser
