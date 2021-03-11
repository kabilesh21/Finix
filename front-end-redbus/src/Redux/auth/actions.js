import * as actionTypes from "./actionTypes";
import axios from "axios";
const loginSuccess = (response) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: response.profileObj,
  };
};

const loginFailure = (response) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: response.error,
  };
};

const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

const addCustomerMongoRequest = () => {
  return {
    type: actionTypes.ADD_CUSTOMER_MONGO_REQUEST,
  };
};
const addCustomerMongoSuccess = () => {
  return {
    type: actionTypes.ADD_CUSTOMER_MONGO_SUCCESS,
  };
};
const addCustomerMongoFailure = () => {
  return {
    type: actionTypes.ADD_CUSTOMER_MONGO_FAILURE,
  };
};

const addCustomerMongo = (profileObj) => {
  return async (dispatch) => {
    dispatch(addCustomerMongoRequest());
    try {
      let customer = {
        name: profileObj.name,
        email: profileObj.email,
        googleId: profileObj.googleId,
        profilePicture: profileObj.imageUrl,
      };
      const res = await axios.post(
        "http://localhost:8000/v1/api/customers",
        customer
      );
      console.log("response from db: ", res);
      dispatch(addCustomerMongoSuccess(res));
    } catch (err) {
      console.log("error", err);
      dispatch(addCustomerMongoFailure());
    }
  };
};
export { loginSuccess, loginFailure, logout, addCustomerMongo };