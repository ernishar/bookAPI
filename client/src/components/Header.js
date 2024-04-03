import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



 
    


function Header() {


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid-sm>
        <Navbar.Brand href="#">Book API</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="allBooks">Home</Nav.Link>
            <Nav.Link href="allBooks">All Books</Nav.Link>
            <Nav.Link href="AddBook">Add Books</Nav.Link>
        

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
             
            />
            
            <Button variant="outline-success m-2">SignIn</Button>
            <Button variant="outline-success m-2">SignUp</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;