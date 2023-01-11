import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal3 from "./Modal3";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
const Modal1 = (props) => {
  const { contacts } = props;
  let page = 1;
  const [modalThreeShow, setModalThreeShow] = useState(false);

  const [contactsArr, setContactsArr] = useState();
  const [singleContact, setSingleContact] = useState({});
  const [even, setEven] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchKeyword = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = contactsArr.filter((item) =>
      item.phone_number.includes(searchTerm)
    );
    setContactsArr(filteredData);
  };
  const EvenArr = [];
  const onlyEvenIds = () => {
    for (let i of contactsArr) {
      if (i.id % 2 === 0) {
        EvenArr.push(i);
      }
    }
    !even ? setContactsArr(EvenArr) : setContactsArr(contacts);
  };

  const getSingleContact = (id) => {
    // eslint-disable-next-line
    contactsArr.find((item) => {
      if (item.id === id) {
        setSingleContact(item);
        return item;
      }
    });
    setModalThreeShow(true);
    props.closeModal();
  };
  useEffect(() => {
    if (!searchTerm) {
      // fetchData(page);
      setContactsArr(contacts);
    }
  }, [contacts, searchTerm, page]);

  const fetchData = async (page) => {
    await axios
      .get(
        `https://api.dev.pastorsline.com/api/contacts.json?companyId=171&page=${page}`,
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs`,
          },
        }
      )
      .then((res) => {
        const data = res.data.contacts;
        const contArr = Object.values(data);
        setContactsArr([...contactsArr, ...contArr]);
        page = page + 1;
      });
  };

  return (
    <>
      <Modal3
        singleContact={singleContact}
        closeModal={() => setModalThreeShow(false)}
        show={modalThreeShow}
        onHide={() => {
          setModalThreeShow(false);
        }}
      />
      <Modal
        {...props}
        restoreFocus={true}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-dialog modal-dialog-scrollable"
        // onHide={props.closeModal()}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            All Contacts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={searchTerm} type="search" onChange={searchKeyword} />{" "}
          &nbsp; Search
          {contactsArr ? (
            <>
              <InfiniteScroll
                dataLength={contactsArr.length}
                next={() => {
                  if (!searchTerm) {
                    fetchData();
                  }
                }}
                hasMore={true}
                loader={""}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Email</th>
                      <th>Contact_ID</th>
                      <th>Contact Number</th>
                      <th>Country</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contactsArr?.map((contact) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <button
                                className="btn btn-info"
                                onClick={() => getSingleContact(contact.id)}
                              >
                                View
                              </button>
                            </td>
                            <td>{contact.email}</td>
                            <td>{contact.id}</td>

                            <td>{contact.phone_number}</td>
                            <td>{contact.country.iso}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </InfiniteScroll>
            </>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <input
            type="checkbox"
            onChange={() => setEven(!even)}
            onClick={onlyEvenIds}
            aria-label="Checkbox for following text input"
          />
          Only Even
          <Button
            style={{
              backgroundColor: "#46139f",
              marginLeft: "44px",
              marginRight: "7px",
            }}
          >
            All Contacts
          </Button>
          <Button
            onClick={() => {
              props.uscontacts();
              navigate("/modal2");
            }}
          >
            US Contacts
          </Button>
          <Button onClick={props.closeModal} className="close-btn">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modal1;
