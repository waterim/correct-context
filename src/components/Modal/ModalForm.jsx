import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReportForm from './ReportForm/ReportForm'
import './ModalForm.scss'

const ModalForm = (props) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button onClick={() => setShow(true)}>Modal</Button>
            <Modal
                size='lg'
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby='example-modal-sizes-title-lg'
            >
                <Modal.Header closeButton className="modalHeader">
                    <Modal.Title id='example-modal-sizes-title-lg'>
                        Export Report
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReportForm/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalForm;
