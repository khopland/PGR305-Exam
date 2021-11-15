import { Carousel, Container } from "react-bootstrap";

export const ProductCausel = () => {
  return (
    <Container>
      <Carousel variant="dark" style={{ objectFit: "cover" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://localhost:5001/images/benjamin-voros-TnNo84AJJ5A-unsplash.jpg"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://localhost:5001/images/camila-damasio-mWYhrOiAgmA-unsplash.jpg"
            alt="Second slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://localhost:5001/images/daniel-storek-JM-qKEd1GMI-unsplash.jpg"
            alt="Third slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};
