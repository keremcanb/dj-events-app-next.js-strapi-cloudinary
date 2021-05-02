import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { put, get } from 'axios';
import { FaImage } from 'react-icons/fa';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import { API_URL } from '@/config/index';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/styles/Form.module.css';
import ImageUpload from '@/components/ImageUpload';
import { parseCookies } from '@/helpers/helpers';

const EditEventPage = ({ event: { name, performers, venue, address, date, time, description, image, id }, token }) => {
  const [values, setValues] = useState({ name, performers, venue, address, date, time, description });
  const [imagePreview, imagePreviewSet] = useState(image && image.formats.thumbnail.url);
  const [showModal, showModalSet] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some((element) => element === '');
    if (hasEmptyFields) {
      toast.error('Fill in all fields');
      return;
    }

    try {
      const { data } = await put(`${API_URL}/events/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push(`/events/${data.slug}`);
    } catch (err) {
      if ([403, 401].includes(err.response.status)) {
        toast.error(`Invalid permision, you cannot modify this event`);
      } else {
        toast.error(err.response.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const { data } = await get(`${API_URL}/events/${id}`);
    imagePreviewSet(data.image.formats.thumbnail.url);
    showModalSet(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">
        <a className="btn-secondary">Go back</a>
      </Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" name="venue" id="venue" value={values.venue} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" value={values.address} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" value={values.time} onChange={handleInputChange} />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Update Event" className="btn-info" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? <Image src={imagePreview} height={100} width={170} /> : <div> No Image Uploaded </div>}
      <div>
        <button className="btn" onClick={() => showModalSet(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => showModalSet(false)}>
        <ImageUpload eventId={id} imageUploaded={imageUploaded} token={token} />
      </Modal>
    </Layout>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  const { data: event } = await get(`${API_URL}/events/${id}`);
  return { props: { event, token } };
}

// const res = await fetch(`${API_URL}/events/${id}`, {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`
//   },
//   body: JSON.stringify(values)
// });
// const data = await res.json();

// if (res.ok) {
//   router.push(`/events/${data.slug}`);
// } else if ([403, 401].includes(res.status)) {
//   toast.error(`Invalid permision, you cannot modify this event`);
// } else {
//   toast.error(data.message);
// }
