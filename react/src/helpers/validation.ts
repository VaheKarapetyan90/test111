export const getRequiredRule = (message = "This field is required!") => ({
  required: true,
  message,
});

export const getNumberRule = (message = "This field must be numeric!") => ({
  pattern: /^[0-9]+$/,
  message,
});

export const getMinLengthRule = (
  minLength = 5,
  message = `The length should be at least ${minLength} symbols`
) => ({
  min: minLength,
  message,
});

export const getEmailRule = (
  type = "email",
  message = "The input is not valid E-mail!"
) => ({
  type,
  message,
});
