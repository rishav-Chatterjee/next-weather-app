import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <div>
      <Navbar style={{ backgroundColor: "#efefef" }}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://dev.thebizio.net/_next/static/media/logo.191ee989.svg"
              width="100"
              height="30"
              className="d-inline-block align-top"
            />
            Weather App
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
