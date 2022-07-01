import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import { getDetailAccomodation, createAccomodation, updateAccomodation } from '../../utils/AccomodationHandler';
import { useParams } from 'react-router-dom';
import "./addAccomodation.css";

const AddAccomodation = (props) => {
    const [accomodationName, setAccomodationName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState('');
    const [openTime, setOpenTime] = useState('');
    const [openDay, setOpenDay] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    // Get id Params
    const getParams = useParams();
    const id = getParams.id;

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            getDetailAccomodation(id)
                .then(response => {
                    const data = response.data;

                    setAccomodationName(data.accomodation_name);
                    setAddress(data.address);
                    setImagePreview(`http://localhost:4000/${data.image}`);
                    setDescription(data.desc);
                    setOpenTime(data.open_time);
                    setOpenDay(data.open_day);
                    setContactNumber(data.contact_number);
                })
                .catch(error => console.info('Error: ', error));
        }

    }, [id]);


    const onImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        try {
            setImagePreview(URL.createObjectURL(file));
        } catch (error) {
            console.info(error);
        }
    }

    const onSubmit = () => {
        console.info('accomodationName:', accomodationName);
        console.info('image:', image);
        console.info('Props: ', props.user.fullname);

        const accommodation = {
            accomodationName,
            address,
            image,
            imagePreview,
            description,
            openTime,
            openDay,
            contactNumber,
            user_name: props.user.fullname,
            user_id: props.user._id,
        };



        if (isEdit) {
            updateAccomodation(accommodation, id);
        } else {
            createAccomodation(accommodation)
        }
    }

    return (
        <main className='container add-accomodation-wrapper'>
            <h1>{isEdit ? 'Edit Accomodation' : 'Create Accomodation'}</h1>
            <div className='container mb-5 mt-5 form-wrapper'>
                <Form>
                    <FormGroup>
                        <Label>Accomodation Name</Label>
                        <Input value={isEdit ? accomodationName : undefined} onChange={e => setAccomodationName(e.target.value)} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Address</Label>
                        <Input value={address} onChange={e => setAddress(e.target.value)} required />
                    </FormGroup>

                    <FormGroup>
                        <Label for="image">Image Accommodation</Label>
                        {image && <img className="preview d-block mb-3" src={imagePreview} alt="preview" />}
                        <Input id="image" name="image" type="file" onChange={e => onImageUpload(e)} required />
                        <FormText>&#8505; Tampilkan foto terbaik dari Accommodation yang ingin datambahkan.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Deskripsi</Label>
                        <textarea className="form-control" name="description" id="description" rows="10" value={isEdit ? description : undefined} onChange={e => setDescription(e.target.value)} required></textarea>
                        <FormText>&#8505; Berikan deskripsi informasi dari accommodation yang ditambahkan agar orang lain tertarik untuk mengunjunginya.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label>Open Time</Label>
                        <Input value={isEdit ? openTime : undefined} onChange={e => setOpenTime(e.target.value)} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Open Day</Label>
                        <Input value={isEdit ? openDay : undefined} onChange={e => setOpenDay(e.target.value)} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Contact Number</Label>
                        <Input value={isEdit ? contactNumber : undefined} onChange={e => setContactNumber(e.target.value)} required />
                    </FormGroup>

                    <div className="d-flex justify-content-end">
                        <Button color="success" className="mt-4 px-4 py-2" onClick={onSubmit}>{isEdit ? 'Update' : 'Add'} Accomodation Tourism</Button>
                    </div>
                </Form>
            </div>
        </main>
    )
}

export default AddAccomodation;
