export const success = (msg, data = null) => {
  return { status: "success", message: msg, data };
};

export const error = (msg) => {
  return { status: "error", message: msg };
};