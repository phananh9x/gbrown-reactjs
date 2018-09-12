// import Parse from 'parse/react-native'

export class ApiResult {
  static DEFAULT = '__DEFAULT__';

  static FETCHING = '__FETCHING__';

  static SUCCESS = '__SUCCESS__';

  static FAILURE = '__FAILURE__';

  constructor(status = ApiResult.DEFAULT, data) {
    if (typeof status === 'object') {
      return Object.assign(this, status);
    }
    this.status = status;
    this.data = data;
  }

  isDefault() {
    return this.status === ApiResult.DEFAULT;
  }

  isFetching() {
    return this.status === ApiResult.FETCHING;
  }

  isSuccess() {
    return this.status === ApiResult.SUCCESS;
  }

  isFailure() {
    return this.status === ApiResult.FAILURE;
  }

  get message() {
    if (this._message) return this._message;
    if (this.data instanceof Error /* || this.data instanceof Parse.Error */) {
      const errorMessage = this.data.message;
      return typeof errorMessage === 'string' ? errorMessage : `${errorMessage}`;
    } if (typeof this.data === 'string') return this.data;
    switch (this.status) {
      case ApiResult.SUCCESS:
        return 'Success';
      case ApiResult.FAILURE:
        return 'Failure';
      case ApiResult.FETCHING:
        return 'Fethching';
      default:
        return '';
    }
  }

  static initDefault(...args) {
    return new ApiResult(ApiResult.DEFAULT, ...args);
  }

  static initSuccess(...args) {
    return new ApiResult(ApiResult.SUCCESS, ...args);
  }

  static initFetching(...args) {
    return new ApiResult(ApiResult.FETCHING, ...args);
  }

  static initFailure(...args) {
    return new ApiResult(ApiResult.FAILURE, ...args);
  }
}

export function action(type) {
  return function (payload = {}, meta = {}) {
    return {
      type,
      payload,
      meta
    };
  };
}
