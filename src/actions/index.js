import axios from "axios";
import { AT_PRODUCTS } from "./action-types";

const END_POINT = "http://localhost:3001";

export function getProductsByOwner(owner) {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/products`)
      .then(function(response) {
        dispatch({ type: AT_PRODUCTS.READ_ALL, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function getProductByOwner(product) {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/products/${product.id}`)
      .then(function(response) {
        dispatch({ type: AT_PRODUCTS.READ, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function deletePost(post) {
  return function(dispatch) {
    axios
      .delete(`${END_POINT}/products/${post.id}`)
      .then(function(response) {
        console.log(response);
        dispatch({ type: AT_PRODUCTS.DELETE, payload: post });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function createPost(post) {
  return function(dispatch) {
    axios
      .post(`${END_POINT}/products/`, {
        title: post.title,
        content: post.content,
        author: post.author
      })
      .then(response => {
        dispatch({ type: AT_PRODUCTS.CREATE, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}
