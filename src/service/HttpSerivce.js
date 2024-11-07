import httpConnect from "../functions/http-common";

class HttpService {
  get(fileName, path = "") {
    return httpConnect.get(`${path}/${fileName}`);
  }
}

const runService = new HttpService();

export default runService;
