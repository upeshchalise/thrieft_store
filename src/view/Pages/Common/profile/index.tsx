import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import axios from "axios";
import { UpdateProfileModal } from "./updateProfile";

interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  imageUrl: string;
}
export const UpdateProfile: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);
  const { userId } = useParams();

  const [users, setUsers] = useState<UserDetails>({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    imageUrl: "",
  });
  // const navigate = useNavigate();
  const openUpdateModal = () => {
    setIsUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModal(false); // Re-fetch user details after modal is closed
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      setUsers(response.data);
    };
    fetchUserDetails();
  }, [userId, auth.access_token]);
  return (
    <>
      <h1 className="text-3xl text-white p-10">Profile</h1>
      <div className="w-3/4 mx-auto mt-10 p-10 bg-blue-100 h-max rounded-lg">
        <div className="flex justify-center gap-10 items-center h-full">
          <img
            src={`http://localhost:4000/uploads/${users?.imageUrl}`}
            alt="profile"
            className="w-1/2 rounded-3xl h-[400px]"
          />
          <div className="text-3xl flex flex-col gap-5 bg-slate-50 p-5 rounded-lg min-h-[400px] w-1/2">
            <p>FIrst Name: {users.first_name}</p>
            <p>Last Name: {users.last_name}</p>
            <p>Email: {users.email}</p>
          </div>
        </div>
        <div className="mt-10 flex gap-5 items-center justify-center">
          <button
            className="text-xl font-medium px-10 py-3 text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={openUpdateModal}
          >
            Update
          </button>
        </div>
      </div>

      <UpdateProfileModal
        isUpdateModal={isUpdateModal}
        closeUpdateModal={closeUpdateModal}
        userDetails={users}
      />
    </>
  );
};
