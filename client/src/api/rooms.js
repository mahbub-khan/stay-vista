import axiosSecure from ".";

//Get all rooms
export const getAllRooms = async () => {
  const { data } = await axiosSecure("/rooms");
  return data;
};

//Got all rooms for host
export const getHostRooms = async (email) => {
  const { data } = await axiosSecure(`/rooms/${email}`);
  return data;
};

//Get a single room
export const getSingleRoom = async (id) => {
  const { data } = await axiosSecure(`/room/${id}`);
  return data;
};

//Save a room data in DB
export const addRoom = async (roomData) => {
  const { data } = await axiosSecure.post(`/room`, roomData);

  return data;
};
