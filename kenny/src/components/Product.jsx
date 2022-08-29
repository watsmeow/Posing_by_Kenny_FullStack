import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  flex: 1;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  margin: 3rem;
  cursor: pointer;
  h2 {
    color: black;
    position: absolute;
    z-index: 5;
  }

`;


const Image = styled.img`
  height: 100%;
  z-index: 2;
  position: absolute;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1.0;
    transform: scale(1.1);
  }
`;


const Product = ({ item }) => {
  return (
    <Link to={`/product/${item._id}`}>
    <Container>
      <h2>{item.productname}</h2>
      <Image src={item.img} />
    </Container>
    </Link>
  );
};

export default Product;