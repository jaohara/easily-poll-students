import { API } from "@aws-amplify/api";
import config from "../aws-exports";

API.configure(config);

function useApi () {
  return API;
}

export default useApi;