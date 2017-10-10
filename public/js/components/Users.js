import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router"
import { fetchUsers, deleteUser } from "./../actions/userActions";

class Users extends React.Component{

  constructor(){
    super();
    this.handleBtnDelete = this.handleBtnDelete.bind(this);
  }

  componentWillMount(){

    this.props.dispatch(fetchUsers());

  }

  handleBtnDelete(id, event){
    event.preventDefault();

    var r = confirm("Are you sure you want to delete this document!");
      if (r == true) {
        const url = baseUrl+"/api/v1/users/delete";
        var formElement = document.getElementById("form_"+id);
        var formData = new FormData(formElement);
        this.props.dispatch(deleteUser(formData));
      }
  }

  render(){

    return(
              <div>
                  <h1 className="pull-left">Users</h1>
                  <div className="col-lg-12">

                    <Link to="users/new" className="btn btn-primary btn-sm pull-left">Create New &nbsp; <i className="glyphicon glyphicon-plus"></i></Link>

                    <table className="table table-responsive">

                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Contact Address</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        { this.props.users.map((user, index) => {
                            return (
                              <tr key={index+1}>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.contact_address}</td>
                                <td>

                                  <Link to={'users/'+user.user_id+'/edit'} className="btn btn-success btn-xs pull-left"><i className="glyphicon glyphicon-pencil"></i></Link>

                                  <form id={"form_"+user.user_id} className="pull-left" method="post">
                                    <input type="hidden" name="user_id" value={user.user_id} />
                                    <a className="btn btn-danger btn-xs" onClick={(event) => this.handleBtnDelete(user.user_id, event)} href="#" id={user.user_id}><i className="glyphicon glyphicon-trash"></i></a>
                                  </form>
                                </td>
                              </tr>
                            )
                          }) }
                      </tbody>

                    </table>

                  </div>
              </div>
          );
        }
  }

  function mapStateToProps(state) {
    return {
      users: state.users.users,
    }
  }
  export default connect(mapStateToProps)(Users)
