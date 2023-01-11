import React, { useEffect, useState } from "react";
import Modal1 from "./Modal1";
import Modal2 from "./Modal2";

import { useSelector, useDispatch } from "react-redux";
import { getContacts } from "../features/ContactSlice";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const dispatch = useDispatch();
  const [modalOneShow, setModalOneShow] = useState(false);
  const [modalTwoShow, setModalTwoShow] = useState(false);

  const navigate = useNavigate();

  const ContactsData = async (page) => {
    try {
      dispatch(getContacts(page));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ContactsData();
    // eslint-disable-next-line
  }, []);
  const ContactResData = useSelector((store) => store.contactData);

  const ContactARr = Object.values(ContactResData.contacts);

  const usArr = ContactARr.filter((ele) => {
    if (ele.country.iso === "US") {
      return ele;
    }
  });
  return (
    <>
      {ContactResData.loading ? (
        <div>Loading...Please Wait</div>
      ) : (
        <>
          <div className="btn-section">
            <button
              onClick={() => {
                setModalOneShow(true);
                navigate("/modal1");
              }}
              className="btn btn-primary"
              style={{ backgroundColor: "#46139f" }}
            >
              Button A
            </button>

            <button
              onClick={() => {
                setModalTwoShow(true);
                navigate("/modal2");
              }}
              class="btn btn-primary"
              style={{ backgroundColor: "#ff7f50" }}
            >
              Button B
            </button>
          </div>

          <Modal1
            onExited  ={()=>setModalTwoShow(true)}
            contacts={ContactARr}
            closeModal={() => {
              setModalOneShow(false);
              // setModalTwoShow(true);

              navigate("/");
            }}
            show={modalOneShow}
            // onHide={() => {
            //   // eslint-disable-next-line
            //   {
            //   console.log("On hide")

            //     // setModalOneShow(false);
            //     setModalTwoShow(true);
            //     navigate("/")
            //   }
            // }}
          />

          <Modal2
            contacts={usArr}
            closeModal={() => {
              setModalTwoShow(false);
              // setModalOneShow(true);
              navigate("/");
            }}
            show={modalTwoShow}
            // onHide={() => {
            //   setModalTwoShow(false);
            //   navigate("/")

            //   // setModalOneShow(true);
            // }}
          />
        </>
      )}
    </>
  );
};

export default Main;
