class ApiResponse  {
    constructor({message, data={}}) {
      this.data =  Object.keys(data) ? data : {};
      this.message = message;
    }
  }

module.exports = ApiResponse;