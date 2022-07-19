import axios from "axios";
import config from "./config";
// 判断开发环境还是生产环境
const baseUrl =
  process.env.NODE_ENV === "development"
    ? config.baseUrl.dev
    : config.baseUrl.pro;

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      header: {},
    };
    return config;
  }
  interceptors(instance) {
    // Add a request interceptor
    instance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    instance.interceptors.response.use(
      function (response) {
        // Do something with response data
        console.log(response,'response');
        return response;
      },
      function (error) {
        // Do something with response error
        console.log(error, 'error');
        return Promise.reject(error);
      }
    );
  }
  request(options){
      const instance = axios.create()
      options = {...this.getInsideConfig(), ...options}
      this.interceptors(instance)
      return instance(options)
  }
}

export default new HttpRequest(baseUrl)
// 官网get用法：
// Make a request for a user with a given ID-------------------------------------------------------
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// Optionally the request above could also be done as-----------------------------------------
// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// // Want to use async/await? Add the `async` keyword to your outer function/method.-----------------------
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
