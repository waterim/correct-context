import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Spinner, Row, Col, Alert } from 'react-bootstrap';
import './ReportForm.scss';
import axios from 'axios';

const ReportForm = () => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    return (
        <Formik
            initialValues={{ name: '', email: '', scheduleRadios: 'No Repeat' }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    //some api call
                    console.log(values);
                    setLoading(true);
                    axios
                        .post('https://postman-echo.com/post', values, {
                            headers: {
                                'x-forwarded-proto': 'https',
                                accept: '*/*',
                                'cache-control': 'no-cache',
                                'Access-Control-Allow-Origin': '*'
                            },
                            credentials: 'same-origin',
                            mode: 'no-cors',
                        })
                        .then((res) => {
                            setLoading(false);
                            setShowAlert(true);
                        })
                        .catch((err) => {
                            console.error('Error during uploading data', err);
                        });

                    setSubmitting(false);
                }, 500);
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email().required('Email is required.'),
                name: Yup.string().required('Report name is required.'),
            })}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                return (
                    <Form noValidate className='' onSubmit={handleSubmit}>
                        <Alert
                            show={showAlert}
                            variant='success'
                            onClose={() => setShowAlert(false)}
                            dismissible
                        >
                            <h5>Your data was successfully uploaded</h5>
                        </Alert>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column sm={2}>
                                Report name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    name='name'
                                    type='text'
                                    placeholder='Shareablee Report'
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={!errors.name && touched.name}
                                    isInvalid={!!errors.name && touched.name}
                                />
                                <Form.Control.Feedback>
                                    Looks ok!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <fieldset>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label as='legend' column sm={2}>
                                    Format
                                </Form.Label>
                                <Form.Check
                                    inline
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value='Excel'
                                    type='radio'
                                    label='Excel'
                                    name='formatRadios'
                                />
                                <Form.Check
                                    inline
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value='CSV'
                                    type='radio'
                                    label='CSV'
                                    name='formatRadios'
                                />
                            </Form.Group>
                        </fieldset>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column sm={2}>
                                E-mail to
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    name='email'
                                    type='email'
                                    placeholder='client@company.com'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={!errors.email && touched.email}
                                    isInvalid={!!errors.email && touched.email}
                                />{' '}
                                <Form.Control.Feedback>
                                    Looks ok!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <fieldset>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label as='legend' column sm={2}>
                                    Schedule
                                </Form.Label>
                                <Form.Check
                                    value='No Repeat'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inline
                                    type='radio'
                                    label='No Repeat'
                                    name='scheduleRadios'
                                />
                                <Form.Check
                                    value='Specific Date'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inline
                                    type='radio'
                                    label='Specific Date'
                                    name='scheduleRadios'
                                />
                                <Form.Check
                                    value='Daily'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inline
                                    type='radio'
                                    label='Daily'
                                    name='scheduleRadios'
                                />
                                <Form.Check
                                    value='Weekly'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inline
                                    type='radio'
                                    label='Weekly'
                                    name='scheduleRadios'
                                />
                            </Form.Group>
                        </fieldset>
                        {values.scheduleRadios !== 'No Repeat' && (
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column sm={2}>
                                    {values.scheduleRadios === 'Specific Date'
                                        ? 'Date'
                                        : values.scheduleRadios === 'Daily'
                                        ? 'Everyday at'
                                        : 'Every'}
                                </Form.Label>
                                {values.scheduleRadios === 'Specific Date' ? (
                                    <>
                                        <Col sm={4}>
                                            <Form.Control
                                                name='specificDate'
                                                type='date'
                                                placeholder='client@company.com'
                                                value={values.specificDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Col>
                                        <div className='align-self-center'>
                                            at
                                        </div>
                                        <Col sm={4}>
                                            <Form.Control
                                                name='specificTime'
                                                type='time'
                                                placeholder='client@company.com'
                                                value={values.specificTime}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Col>
                                    </>
                                ) : values.scheduleRadios === 'Daily' ? (
                                    <>
                                        <Col sm={4}>
                                            <Form.Control
                                                name='dailyTime'
                                                type='time'
                                                placeholder='client@company.com'
                                                value={values.dailyTime}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <Col sm={4}>
                                            <Form.Control
                                                as='select'
                                                name='weekdays'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.weekdays} // <--- it should allow an array of strings, currently the code won't compile or won't update the form value as it has multiple in the form control
                                            >
                                                <option>Select the day</option>
                                                <option value='Monday'>
                                                    Monday
                                                </option>
                                                <option value='Tuesday'>
                                                    Tuesday
                                                </option>
                                                <option value='Wednesday'>
                                                    Wednesday
                                                </option>
                                                <option value='Thursday'>
                                                    Thursday
                                                </option>
                                                <option value='Friday'>
                                                    Friday
                                                </option>
                                                <option value='Saturday'>
                                                    Saturday
                                                </option>
                                                <option value='Sunday'>
                                                    Sunday
                                                </option>
                                            </Form.Control>
                                        </Col>
                                        <div className='align-self-center'>
                                            at
                                        </div>
                                        <Col sm={4}>
                                            <Form.Control
                                                name='weekTime'
                                                type='time'
                                                placeholder='client@company.com'
                                                value={values.weekTime}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Col>
                                    </>
                                )}
                            </Form.Group>
                        )}
                        <hr />
                        <div className='d-flex justify-content-end'>
                            <Button
                                variant='outline-secondary'
                                className='mr-3'
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='dark'
                                disabled={isSubmitting}
                                type='submit'
                                className='submitButton'
                            >
                                OK
                                {loading && (
                                    <Spinner size='sm' animation='border' />
                                )}
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ReportForm;
