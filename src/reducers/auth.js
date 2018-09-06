import update from 'immutability-helper'
// import * as TYPES from '../actions/constants'
import { ApiResult } from '../actions/utils'
const initialState = {
  signUp: {
    status: ApiResult.initDefault(),
    errorCode: null,
    email: '',
    firstName: '',
    lastname: '',
    password: '',
    phoneNumber: '',
  },
  auth: {
    status: ApiResult.initDefault(),
    isAuthenticated: false,
    userRealm: null,
    user: null,
    totalLengthProduct: Number,
    totalLengthSupplier: Number,
    checkInShow: null
  },
  login: {
    status: ApiResult.initDefault(),
    errorCode: null,
    email: '',
    password: '',
  },
  forgetPassword: {
    status: ApiResult.initDefault(),
    email: '',
    errorCode: null,
    emailSent: false,
  },
  update: {
    status: ApiResult.initDefault(),
    firstName: '',
    lastName: ''
  }
}

const getUser = (data) => {
  let userData = {}
  userData = data[0] || {}
  return { userData }
}

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
