import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

const Modal3 = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-dialog modal-dialog-scrollable"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          "{props.singleContact.email}" Contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.singleContact ? (
          <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.singleContact.first_name}</td>
                  <td>{props.singleContact.email}</td>
                  <td>{props.singleContact.phone_number}</td>
                  <td>{props.singleContact?.country?.iso}</td>
                </tr>
              </tbody>
            </Table>
          </>
        ) : (
          ''
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal3;
