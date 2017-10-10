import axios from "axios";
import { NotificationManager } from 'react-notifications';

export function fetchUsers(){
  return function (dispatch) {
    axios.get(baseUrl+"api/v1/users")
    .then((response) => {
      dispatch({type: "FETCH_USERS_FULFILLED", payload: response.data});
    })
    .catch((error) => {
      dispatch({type: "FETCH_USERS_REJECTED", payload: error});
    })
  }
}

export function fetchUser(id){
  return function (dispatch) {
    axios.get(baseUrl+"api/v1/users/"+id)
    .then((response) => {
      dispatch({type: "FETCH_USER_FULFILLED", payload: response.data.user});
    })
    .catch((error) => {
      dispatch({type: "FETCH_USER_REJECTED", payload: error});
    })
  }
}

export function deleteUser(formData){
  return function (dispatch) {
    axios.post(baseUrl+"api/v1/users/delete", formData)
    .then((response) => {
      NotificationManager.success(response.data.message, 'Success', 5000);
      dispatch(fetchUsers());
    })
    .catch((error) => {
      NotificationManager.error("An error occured in the operation", 'Error', 5000);
    })
  }
}
