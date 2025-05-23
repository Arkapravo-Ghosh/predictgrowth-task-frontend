import axiosInstance from "../utils/axiosUtils";

export const editUserProfile = async (token: string, data: { name?: string; company?: string; company_description?: string }) => {
  const response = await axiosInstance.post(
    "/user",
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
