import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { imageUpload } from "../../api/utils";
import UpdateRoomForm from "../Form/UpdateRoomForm";
import toast from "react-hot-toast";
import { updateRoom } from "../../api/rooms";
import { updateTitleImage } from "../../api/bookings";

const UpdateRoomModal = ({ setIsEditModalOpen, isOpen, refetch, room, id }) => {
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState({
    startDate: new Date(room.from),
    endDate: new Date(room.to),
    key: "selection",
  });
  const [roomData, setRoomData] = useState(room);

  const handleImageUpdate = (image) => {
    setLoading(true);
    imageUpload(image)
      .then((res) => {
        setRoomData({ ...roomData, image: res.data.display_url });
        setLoading(false);
      })
      .catch((err) => {
        //console.log(err);
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(roomData);
    const updatedData = Object.assign({}, { ...roomData });
    delete updatedData._id;
    setLoading(true);
    updateRoom(updatedData, id)
      .then((data) => {
        //Update info in the booking collection
        const updatedBookingInfo = {
          title: updatedData.title,
          image: updatedData.image,
        };

        updateTitleImage(updatedBookingInfo, id)
          .then(() => {
            console.log("Booking info updated");
          })
          .catch((err) => {
            console.error(err.message);
          });

        //console.log(data);
        toast.success("Home info updated");
        setLoading(false);
        refetch();
        setIsEditModalOpen(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleDates = (ranges) => {
    const { startDate, endDate, key } = ranges.selection;
    const modifiedEndDate = new Date(endDate.setHours(23, 59, 59, 999));
    console.log(ranges);
    setDates({
      startDate,
      endDate: modifiedEndDate,
      key,
    });

    //setDates(ranges.selection);
    setRoomData({
      ...roomData,
      to: ranges.selection.endDate,
      from: ranges.selection.startDate,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Room Info
                </Dialog.Title>
                <div className="mt-2 w-full">
                  <UpdateRoomForm
                    handleSubmit={handleSubmit}
                    roomData={roomData}
                    setRoomData={setRoomData}
                    handleImageUpdate={handleImageUpdate}
                    loading={loading}
                    dates={dates}
                    handleDates={handleDates}
                  />
                </div>
                <hr className="mt-8 " />
                <div className="mt-2 ">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateRoomModal;
