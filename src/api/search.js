import request from "@/utils/request.js";

export const getsearchsuggestion = (q) => {
  return request({
    method: "GET",
    url: "/app/v1_0/suggestion",
    params: {
      q,
    },
  });
};


export const getsearchresult = params => {
  return request({
    method: "GET",
    url: "/app/v1_0/search",
    params
  });
};
