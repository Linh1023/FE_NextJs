'use client'
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface Props{
    setShow:(value:boolean)=> void;
    show:boolean;
    tourTitle:string;
    setTourTitle:(value:string)=>void;
    tourId:number;
    setTourId:(value:number)=>void;
}

export const ModalCustom = ({setShow,show,tourTitle,setTourTitle,tourId,setTourId}:Props) => {
  
    
  
    const handleClose = () => {
      setTourTitle('');
      setTourId(0);
      setShow(false);
    };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thông Tin Liên Hệ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Địa chỉ Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          {tourId != 0 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Tên Tour</Form.Label>
                <Form.Control type="text" disabled value={tourTitle} />
              </Form.Group>
              <Form.Control type="number" hidden value={tourId} />
            </>
          )}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Nội dung </Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Gửi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
