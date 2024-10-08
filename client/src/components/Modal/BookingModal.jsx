import { loadStripe } from "@stripe/stripe-js";
import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import { Fragment } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

const BookingModal = ({
  isOpen,
  closeModal,
  room,
  bookingInfo,
  bookedDates,
  setBookedDates,
  latestAvailableDate,
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
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
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Booking Review
                  </Dialog.Title>
                  <hr className="mt-2 " />
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Room: {bookingInfo.title}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Location: {bookingInfo.location}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Guest: {bookingInfo.guest.name}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      From: {format(new Date(bookingInfo.from), "PP")} - To:{" "}
                      {format(new Date(bookingInfo.to), "PP")}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Price: {bookingInfo.price} €
                    </p>
                  </div>
                  <hr className="mt-2 " />
                  {/* Check out form */}
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      closeModal={closeModal}
                      bookingInfo={bookingInfo}
                      bookedDates={bookedDates}
                      setBookedDates={setBookedDates}
                      room={room}
                      latestAvailableDate={latestAvailableDate}
                    />
                  </Elements>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BookingModal;
