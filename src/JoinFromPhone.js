import React, { useState } from "react";
import { setData } from "./util/firebase";

import CameraIcon from "./assets/cam.png";
import RedBird from './assets/ActualRedBird.png';
import YellowBird from './assets/ActualYellowBird.png';
import BlueBird from './assets/ActualBlueBird.png';
import Arr from './assets/Arrow.png';

import styled from "styled-components";

const BIRDLIST = [RedBird, YellowBird, BlueBird];

const JoinFromPhone = (props) => {
  const [name, setName] = useState("");

  const [modal, setModal] = useState(false);

  const startGame = () => {
    if (name != "") {
      props.handlePermission();
      setData(`/players/${props.pid}/character`, props.bird.index);
      setData(`/players/${props.pid}/name`, name);
      setData(`/players/${props.pid}/playerState`, "waiting-for-screen");
    }
  };

  const click = (amt) => {
    let newindex = props.bird.index + amt;
    newindex = newindex % 3;
    props.updateBird({
      ...props.bird,
      index: newindex
    });
  }

  return (
    <Div>
      {modal && <Modal onClick={() => setModal(false)}>
        <InnerModal onClick={e => e.stopPropagation()}>
          /* NEEDS PHOTO UPLOAD LOGIC */
          <input type="file" accept="image/*" capture="camera" />
        </InnerModal>
      </Modal>}
      <Flex flex={0.7}>
        <Title>
          You're In!
        </Title>
      </Flex>
      <Flex flex={1}>
        <em>What's your name?</em>
        <Input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Flex>
      <Flex flex={2}>
        <em>Pick your bird:</em>
        <Carousel>
          <Arrow src={Arr} Left onClick={() => {click(2)}}/>
          <StyledImage src={BIRDLIST[props.bird.index]} size={window.innerWidth}/>
          <Arrow src={Arr} onClick={() => {click(1)}} />
        </Carousel>
      </Flex>
      {/* <Flex flex={1}>
        <em>Optional photo</em>
        <ModalButton onClick={() => {setModal(true)}}>
          <Img src={CameraIcon} width="18px" />
          Add a custom avatar photo
        </ModalButton>
        <input type="file" />
      </Flex> */}
      <Flex flex={1}>
        <Submit onClick={startGame} valid={name != ""}>
          Ready to Fly
        </Submit>
      </Flex>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => props.flex};
  width: 70%;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 8px;
  border-radius: 8px;
  background: #D9D9D9;
  font-family: "Russo One";
  margin-top: 12px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
`;

const ModalButton = styled.div`
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  margin-top: 4px;
  cursor: pointer;
`;

const Img = styled.img`
  margin-right: 6px;
`;

const Submit = styled.button`
  border-radius: 15px;
  background: white;
  color: black;
  font-family: "Russo One";
  opacity: ${props => props.valid ? 1: 0.5};
  cursor: ${props => props.valid ? "pointer" : "default"};
`;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const Arrow = styled.img`
  width: 42px;
  transform: ${props => props.Left ? "rotate(180deg)" : ""};
`;

const StyledImage = styled.img`
  width: ${props => props.size * 0.4}px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(143, 143, 143, 0.3);
  backdrop-filter: blur(7.5px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
`;

const InnerModal = styled.div`
  width: calc(100% - 124px);
  height: calc(60% - 48px);
  background: black;
  border-radius: 32px;
  padding: 24px;
`;

export default JoinFromPhone;
