const SUCCESS = 'success';
const DATA_UPDATED = 'data updated successFully';
const ERROR_WHILE_UPDATING_DATA = "error while updating data";
const CREATED_SUCCESSFULLY = 'created successfully'
const DATA_DELETED = 'data deleted successFully';
const ERROR_WHILE_DELETING_DATA = "error while deleting data";  
const ERROR_WHILE_CREATING = "error while creating"
const OTP_SEND = "otp send successfully"
const OTP_VERIFICATION_SUCCESS = "otp verification successfully"
const NOT_FOUND = (ms="") =>  `${ms} not found`
const INVALID_OTP = "invalid otp"
const ALEARDY_EXIST = (msg="") => `${msg} already exist`
const OTP_EXPIRED_MESSAGE = 'otp expired'
const YOU_CANT = (msg="") => `you can't ${msg}`

//Product Error Messages
const SUBCATEGORY_PRODUCT_ERROR = "Product cannot be linked with category having child categories"
const PROVIDE_OTP = "please provide otp"
const PLEASE_PROVIDE = (msg="") => `please provide ${msg}`
const YOU_CANT_DELETE = (msg="") => `you cant't delete ${msg}`

//=====Email
const EMAIL_SUCCESS = "Mail sent successfully in to"
const EMAIL_FAIL = "Error while sending mail please try it again"
//===================order==================
const PRODUCT_FAIL = "Product does not exist."
const CHECK_PRODUCT_FAIL = "Product not available in stock."
const CHECK_PRODUCT_QTY_FAIL = "Product out of stock."
const CHECK_PRODUCT_QTY_BOTH_FAIL = "Please enter correct product or quantity."

//======admin==========
const CHECK_EMAIL_FAIL = "Please enter correct product or quantity."
const CHECK_ACCOUNT_FAIL = "Please enter correct product or quantity."
const CHECK_ONBOARD_FAIL = "Admin user not onboarded."

//======Business==========
const CHECK_ORDER_ERROR = "Last invoice number can’t be lower than invoice number of any existing generated invoices"


module.exports = {
    SUCCESS,
    DATA_UPDATED,
    ERROR_WHILE_UPDATING_DATA,
    CREATED_SUCCESSFULLY,
    DATA_DELETED,
    ERROR_WHILE_DELETING_DATA,
    ERROR_WHILE_CREATING,
    OTP_SEND,
    OTP_VERIFICATION_SUCCESS,
    NOT_FOUND,
    INVALID_OTP,
    ALEARDY_EXIST,
    SUBCATEGORY_PRODUCT_ERROR,
    OTP_EXPIRED_MESSAGE,
    PROVIDE_OTP,
    PLEASE_PROVIDE,
    YOU_CANT_DELETE,
    YOU_CANT,
    EMAIL_SUCCESS,
    EMAIL_FAIL,
    CHECK_PRODUCT_FAIL,
    CHECK_PRODUCT_QTY_FAIL,
    CHECK_PRODUCT_QTY_BOTH_FAIL,
    CHECK_EMAIL_FAIL,
    CHECK_ACCOUNT_FAIL,
    CHECK_ONBOARD_FAIL,
    CHECK_ORDER_ERROR
}