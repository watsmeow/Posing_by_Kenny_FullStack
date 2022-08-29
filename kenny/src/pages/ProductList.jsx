import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useLocation } from "react-router";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;


const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const catName = cat.split('%20').join(' ').toUpperCase()


  return (
    <Container>
      <Navbar />
      <Title>{catName}</Title>
      <Products cat={cat}  />
      <Footer />
    </Container>
  );
};

export default ProductList;