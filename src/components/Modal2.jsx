import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Modal2 = (props) => {
  const { contacts } = props;
  const [even, setEven] = useState(false);

  const navigate = useNavigate();
  const ContactResData = useSelector((store) => store.contactData);
  const [searchTerm, setSearchTerm] = useState("");
  const [usContacts, setUSContacts] = useState([]);

  const searchKeyword = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = usContacts.filter((item) =>
      item.phone_number.includes(searchTerm)
    );
    setUSContacts(filteredData);
  };
  // eslint-disable-next-line

  useEffect(() => {
    if (!searchTerm) {
      setUSContacts(contacts);
    }
  }, [contacts, searchTerm]);
  const EvenArr = [];

  const onlyEvenIds = () => {
    for (let i of usContacts) {
      if (i.id % 2 === 0) {
        EvenArr.push(i);
      }
    }
    !even ? setUSContacts(EvenArr) : setUSContacts(contacts);
  };
  return (
    <>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-dialog modal-dialog-scrollable"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            US Contacts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={searchTerm} type="search" onChange={searchKeyword} />{" "}
          {usContacts ? (
            <>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Contact_ID</th>
                    <th>Contact Number</th>
                    <th>Country</th>
                  </tr>
                </thead>
                {ContactResData.loading ? (
                  <div>Loading...Please Wait</div>
                ) : (
                  <tbody>
                    {usContacts?.map((contact) => {
                      return (
                        <>
                          <tr>
                            <td>{contact.first_name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.id}</td>
                            <td>{contact.phone_number}</td>
                            <td>{contact.country.iso}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                )}
              </Table>
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
            onClick={() => {
              props.onHide();
              navigate("/modal1");
            }}
          >
            All Contacts
          </Button>
          <Button style={{ backgroundColor: "#ff7f50" }}>US Contacts</Button>
          <Button onClick={props.closeModal} className="close-btn">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modal2;
