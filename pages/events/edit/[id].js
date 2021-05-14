import { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { get } from 'axios';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import { FaImage } from 'react-icons/fa';
import { parseCookies } from '@/helpers/helpers';
import { Layout, Modal, ImageUpload } from '@/components/index';
import EventsContext from '@/context/EventsContext';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

const EditEventPage = ({ event: { name, performers, venue, address, date, time, description, image, id }, token }) => {
  const [values, setValues] = useState({ name, performers, venue, address, date, time, description });
  const [imagePreview, imagePreviewSet] = useState(image && image.formats.thumbnail.url);
  const [showModal, showModalSet] = useState(false);
  const { updateEvent } = useContext(EventsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateEvent(id, values, token);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const imageUploaded = async () => {
    const { data } = await get(`${API_URL}/events/${id}`);
    imagePreviewSet(data.image.formats.thumbnail.url);
    showModalSet(false);
  };

  return token ? (
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
            <input type="text" id="name" value={values.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" id="performers" value={values.performers} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" id="venue" value={values.venue} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={values.address} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" id="time" value={values.time} onChange={handleChange} required />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea type="text" id="description" value={values.description} onChange={handleChange} required />
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
  ) : (
    <center>
      <h1>Not authorized to view this page</h1>
    </center>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id }, req }) {
  // Get token
  const { token } = parseCookies(req);
  const { data: event } = await get(`${API_URL}/events/${id}`);
  return { props: { event, token } };
}
