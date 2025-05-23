import axiosInstance from "./axiosUtils";

export const fetchUserData = async (token: string) => {
  const response = await axiosInstance.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.user;
};
