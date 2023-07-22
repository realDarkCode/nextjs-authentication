export default function httpError(msg = "Internal sever error", status = 400) {
  const err = new Error(msg);
  err.status = status;
  return err;
}
