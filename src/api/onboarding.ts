import axiosInstance from "../utils/axiosUtils";

export const onboardUser = async (token: string, userName: string, companyName: string, companyDescription: string) => {
  const response = await axiosInstance.post(
    "/user/onboarding",
    {
      name: userName,
      company: companyName,
      company_description: companyDescription,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
};
