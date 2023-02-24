//import axios from 'react-native-axios';
import axios from 'axios';

const baseV1ApiUrl = `https://dummyjson.com`;

export const getProductList = (Params = {}) => {
      return new Promise((resolve, reject) => {
            axios.get(`${baseV1ApiUrl}/products`, {}).then(function (response) {
                  resolve(response.data);
            }).catch(function (error) {
                  reject(error);
            });
      })
}

export const searchProductList = (Params = {}) => {
      return new Promise((resolve, reject) => {
            axios.get(`${baseV1ApiUrl}/products/search`, { params: Params }).then(function (response) {
                  resolve(response.data);
            }).catch(function (error) {
                  reject(error);
            });
      })
}

export const getProductDetail = (ID) => {
      return new Promise((resolve, reject) => {
            axios.get(`${baseV1ApiUrl}/products/${ID}`, {}).then(function (response) {
                  resolve(response.data);
            }).catch(function (error) {
                  reject(error);
            });
      })
}

export const getCategoryList = () => {
      return new Promise((resolve, reject) => {
            axios.get(`${baseV1ApiUrl}/products/categories`, {}).then(function (response) {
                  resolve(response.data);
            }).catch(function (error) {
                  reject(error);
            });
      })
}

export const uploadProduct = (Param) => {
      return new Promise((resolve, reject) => {
            axios({
                  url: `${baseV1ApiUrl}/products/add`,
                  method: 'POST',
                  data: Param,
                  headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                  }
            }).then(function (response) {
                  resolve(response.data);
            }).catch(function (error) {
                  reject(error);
            });
      })
}
