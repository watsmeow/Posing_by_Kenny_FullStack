import { Instagram } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  lign-items: center;
  padding: 20px;
  padding-left: 10rem;
  color: white;
`;


const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: white;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;


const Footer = () => {
  const linkStyle = {
    textDecoration: "none",
    cursor: "pointer",
  }
  return (
    <Container>
      <a 
      href="https://www.instagram.com/posing_by_kenny/?hl=en"
      style={linkStyle}
      target='_blank'>


        <SocialContainer>

          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <h3>FOLLOW KENNY ON INSTAGRAM</h3>
        </SocialContainer>


      </a>
    </Container>
  );
};

export default Footer;