import React from 'react';
import { connect } from "react-redux";
import { fetchUser } from "./../actions/userActions";
import { push } from "react-router";
﻿import axios from "axios";
import { NotificationManager } from 'react-notifications';

class EditUser extends React.Component{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      errors: '',
      user_id: props.params.id,
    }

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    var formElement = document.querySelector("form");
    var formData = new FormData(formElement);
    formData.append('user_id', this.state.user_id);

    axios.post(baseUrl+"api/v1/users/update", formData)
      .then((response) => {

        this.context.router.push('/users');
        NotificationManager.success('User has been updated!', 'Success', 5000);

      })
      .catch((error) => {

        var errors = error.response.data.data;

        this.setState({
          errors: errors
        });

        NotificationManager.error('Error occured during operation!', 'Error', 5000);
      });

  }

  componentWillMount(){
    this.props.dispatch(fetchUser(this.state.user_id));
  }

  createMarkup() {
    return {__html: this.state.errors};
  }

  render(){

    const { user } = this.props;

    var errors = '';

    if(this.state.errors != ''){
      errors = <div class="alert alert-danger" role="alert"><div dangerouslySetInnerHTML={this.createMarkup()} /></div>
    }

    var formElements = '';
    if(user !== null){
      formElements =
      <div>
        <div className="form-group col-lg-6">
          <input className="form-control" placeholder="Full Name" name="name" defaultValue={user.fullname}/>
        </div>

        <div className="form-group col-lg-6">
          <input className="form-control" placeholder="Email Address" name="email" defaultValue={user.email}/>
        </div>

        <div className="form-group col-lg-6">
          <input className="form-control" placeholder="Phone Number" name="phone_number" defaultValue={user.phone_number}/>
        </div>

        <div className="form-group col-lg-6">
          <input className="form-control" placeholder="Contact Address" name="contact_address" defaultValue={user.contact_address}/>
        </div>
      </div>
    }

    return(
              <div>
                <h1>Edit User</h1>
                <div className="col-lg-8">
                  {errors}
                  <form method="post" onSubmit={this.handleSubmit}>

                    {formElements}

                    <div className="form-group col-lg-6">
                      <button type="submit" className="btn btn-primary btn-block">Update User</button>
                    </div>

                  </form>
                </div>

              </div>
          );
        }
  }

  function mapStateToProps(state) {
    return {
      user: state.users.user,
    }
  }
  export default connect(mapStateToProps)(EditUser)
