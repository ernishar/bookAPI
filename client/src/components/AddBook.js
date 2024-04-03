import React, { useState, useHistory } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';

const AddBook = () => {
  const [formData, setFormData] = useState({
    book_id:'',
    title:'',
    description:'',
    published_year:'',
    author_name:'',
    genre_name:'',
  });

  //const history = useHistory();

  // Function to handle form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate('/allBooks')
  }

  const handleSubmit = async (event) => {


    event.preventDefault();
    try {

      //const response = await axios.post('http:localhost:5000/addBook', formData);

      axios({
        method: 'post',
        url: 'http://localhost:5000/api/addBook',
        data: {
          ...formData
        },

        // validateStatus: (status) => {
        //   return true; 
        // },

     
      }).then(response => {
        console.log(response);
        navigate('/allBooks');
      }).catch(error => {
        console.log(error);
      });
      // console.log(response.data); // Handle response from backend
      // navigate('/allBooks');

    } catch (error) {
      console.error('Error registering book:', error);
    }
  };

  return (
    <>
    <Header/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className='text-center'>Add Book</h2>
          <p className='text-center'> Please fill all the details given below </p>
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="bookId" className="form-label"> Book ID</label>
              <input type="number" className="form-control" id="bookId" name="book_id" value={formData.book_id} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="publishedYear" className="form-label">Published Year</label>
              <input type="text" className="form-control" id="publishedYear" name="published_year" value={formData.published_year} onChange={handleInputChange} />
            </div>
          
            <div className="mb-3">
              <label htmlFor="author_name" className="form-label">Author Name</label>
              <input type="text" className="form-control" id="author_name" name="author_name" value={formData.author_name} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="genreName" className="form-label">Genre Name</label>
              <input type="text" className="form-control" id="genreName" name="genre_name" value={formData.genre_name} onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>

            <button
              className="btn btn-primary btn-sm mx-4"
              type="button"
              onClick={handleClick}
            >
              Show All Books
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddBook;
