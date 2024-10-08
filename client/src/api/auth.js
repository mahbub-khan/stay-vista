import axiosSecure from "./index";

//save user data in database
export const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
    role: "guest",
    status: "Verified",
  };

  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);
  return data;
};

//Get token from server
export const getToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  console.log("Token received from server-------->", data);

  return data;
};

//Clear token from browser
export const clearToken = async () => {
  const { data } = await axiosSecure.get("/logout");

  return data;
};

//Get a single user and user role
export const getRole = async (email) => {
  const { data } = await axiosSecure.get(`/user/${email}`);

  return data;
};

//Get all users
export const getAllUsers = async () => {
  const { data } = await axiosSecure("/users");
  return data;
};

//update user role in DB
export const updateUserRole = async ({ email, role }) => {
  const currentUser = {
    email,
    role,
    status: "Verified",
  };

  const { data } = await axiosSecure.put(`/users/update/${email}`, currentUser);
  return data;
};

//become a host
export const becomeHost = async (email) => {
  const currentUser = {
    email,
    status: "Requested",
  };
  const { data } = await axiosSecure.put(`/users/${email}`, currentUser);
  return data;
};
