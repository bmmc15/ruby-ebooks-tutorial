export const validateRequiredField = (fieldValue, fieldName) => {
  if (!fieldValue) {
    return {
      type: "required",
      message: `${fieldName} is required.`,
    };
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email) {
    return {
      type: "required",
      message: "Email is required.",
    };
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return {
      type: "pattern",
      message: "Email is not valid.",
    };
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return {
      type: "required",
      message: "Password is required.",
    };
  } else if (password.length < 8) {
    return {
      type: "minLength",
      message: "Password must be at least 8 characters long.",
    };
  }
  return null;
};
