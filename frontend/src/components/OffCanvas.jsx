import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function OffCanvas() {
	return (
		<>
			<Navbar bg="light" expand="md" className="mb-3">
				<Container fluid>
					<Navbar.Brand href="/">Baby Name Swiper</Navbar.Brand>
					<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-md`}
						aria-labelledby={`offcanvasNavbarLabel-expand-md`}
						placement="end"
					>
						<Offcanvas.Header closeButton></Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 pe-3">
								<Nav.Link href="#">Profile</Nav.Link>
								<Nav.Link href="#">Swipe Names</Nav.Link>
								<Nav.Link href="#">Matches</Nav.Link>
								<Nav.Link href="#">Rank Choices</Nav.Link>
								<Nav.Link href="#">Results</Nav.Link>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
}

export default OffCanvas;
