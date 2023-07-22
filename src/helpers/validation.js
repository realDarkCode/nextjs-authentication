const validationError = (msg) => {
  let err = new Error(msg);
  err.name = "[Validation Error]";
  err.status = 400;
  return err;
};

const defaultOptions = { dataType: "string", minLen: 8, maxLen: 30 };
const validate = (data = "", fieldName = "data", options) => {
  options = { ...defaultOptions, ...options };
  const { dataType, minLen, maxLen } = options;

  if (!data) throw validationError(`${fieldName} is required`);
  if (typeof data !== dataType)
    throw validationError(`${fieldName} should be ${dataType} type`);
  if (data.toString().length < minLen)
    throw validationError(
      `${fieldName} length must be at least ${minLen} characters long`
    );
  if (data.toString().length > maxLen)
    throw validationError(
      `${fieldName} length must be within ${minLen} characters`
    );
};

export default validate;
