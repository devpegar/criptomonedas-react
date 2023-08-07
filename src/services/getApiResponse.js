import { ajax } from "../tools/ajax";

export const getApiResponse = async (optionsRequest) => {
  return await ajax(optionsRequest);
};
