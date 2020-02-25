exports.passwordValidator = (password) => {

  let lengthRegex = new RegExp("(?=.{8,})");
  let lowerCaseRegex = new RegExp("(?=.*[a-z])");
  let upperCaseRegex = new RegExp("^(?=.*[A-Z])");
  let numericRegex = new RegExp("(?=.*[0-9])");
  let specialRegex = new RegExp("(?=.*[!@#\$%\^&\*])");
        
  if (!lowerCaseRegex.test(password)) {
    return "Password must contain at least 1 lowercase alphabetical character";
  } else if (!upperCaseRegex.test(password)) {
    return "Password must contain at least 1 uppercase alphabetical character";
  } else if (!numericRegex.test(password)) {
    return "Password must contain at least 1 numeric character";
  } else if (!specialRegex.test(password)) {
    return "Password must contain at least one special character";
  } else if (!lengthRegex.test(password)) {
    return "Password must must be eight characters or longer";
  } else {
    return password;
  }    
};

exports.emailValidator = (email) => {
  let tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!email) return false;
  
  if (email.length > 256) return false;
  
  if (!tester.test(email)) return false;
  
  // Further checking of some things regex can't handle
  var [account, address] = email.split('@');
  if (account.length > 64) return false;
  
  var domainParts = address.split('.');
  if (domainParts.some(function (part) {
    return part.length > 63;
  })) return false;
  
  return true;
};