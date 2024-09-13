import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)/);
  const extraxted_msg = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `Room ${extraxted_msg} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleDuplicateError;
