import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";

function InquiryModal({ onClose }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/Admin/getInquiry"
        );
        setInquiries(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Inquiry Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading inquiries...</p>
        ) : inquiries.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{inquiry.username}</td>
                  <td>{inquiry.email}</td>
                  <td>{inquiry.contact}</td>
                  <td>{inquiry.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No inquiries found.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InquiryModal;
