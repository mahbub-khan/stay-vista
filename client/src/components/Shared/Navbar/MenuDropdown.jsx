import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import HostRequestModal from "../../Modal/HostRequestModal";
import { becomeHost } from "../../../api/auth";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [, role] = useRole();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalHandler = async () => {
    try {
      const data = await becomeHost(user?.email);
      if (data.modifiedCount > 0) {
        toast.success("Request Submitted ✅! Wait for the Admin's approval");
      } else {
        toast.success("Please, Wait for the Admin's approval ⛔");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* Become A Host btn */}
        {/* <div className="hidden md:block">
          {(!user || !role || role === "guest") && (
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!user}
              className="disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
            >
              Host your home
            </button>
          )}
        </div> */}
        {/* Dropdown btn */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu className="text-[#d94e28]" />

          <div className="hidden md:block">
            {/* Avatar */}
            <img
              className="rounded-full border-[1px] border-[#d94e28] object-cover h-[30px] w-[30px]"
              referrerPolicy="no-referrer"
              src={user && user.photoURL ? user.photoURL : avatarImg}
              alt="profile"
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-11 text-sm border-[1px] border-[#d94e28]/50">
          <div className="flex flex-col cursor-pointer">
            <Link
              to="/"
              className="block md:hidden px-4 py-3 hover:bg-[#d94e28] hover:text-white transition font-semibold"
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-3 hover:bg-[#d94e28] hover:text-white transition font-semibold"
                >
                  Dashboard
                </Link>
                <div
                  onClick={logOut}
                  className="px-4 py-3 hover:bg-[#d94e28] hover:text-white transition font-semibold cursor-pointer"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-[#d94e28] hover:text-white transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 hover:bg-[#d94e28] hover:text-white transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <HostRequestModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalHandler={modalHandler}
      />
    </div>
  );
};

export default MenuDropdown;
