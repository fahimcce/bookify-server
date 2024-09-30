import { TErrorSources } from "../interface/error";

const handleDuplicateError = (err: any) => {
  // const regex = /{ name: "([^"]+)" }/;
  // const match = err.errorResponse.errMsg.match(regex);
  // const errorMsg = match & match[1];
  const erroSource: TErrorSources = [
    {
      path: "",
      message: `${err.errmsg} is already Exist`,
    },
  ];
  const statusCode = 500;
  return {
    statusCode,
    message: err?.message,
    erroSource: erroSource,
  };
};
export default handleDuplicateError;
