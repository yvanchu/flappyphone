import styled from "styled-components";

import RedBird from '../assets/redNotFlapping.png';
import BlueBird from '../assets/blueNotFlapping.png';
import YellowBird from '../assets/yellowNotFlapping.png';


const BOIRDS = [RedBird, BlueBird, YellowBird];

function NameBox(props) {
        return (
                <Box highlighted={props.highlighted}>
                        {props.place}
                        <Name>{props.name}</Name>
                        <Score highlighted={props.highlighted}>{props.score}</Score>
                        {props.highlighted && <BirdIcon src={BOIRDS[props.char]} />}
                </Box>
        )
}

export default NameBox;

const Box = styled.div`
        background-color: ${props => (props.highlighted) ? "#d9d9d9" : "#6c6c6c"};
        min-height: 46px;
        position: relative;
        font-family: "Russo One", sans-serif;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 24px;
        border-radius: 15px;
        padding: 0 15px;
        margin: 4px 0px;
        z-index: 5;
`;

const Name = styled.div`
padding-left: 15px;
`;

const Score = styled.div`
position: absolute;
right: 15px;
color: ${props => props.highlighted ? "#000000" : "#ffffff"};
`;

const BirdIcon = styled.img`
        width: 40px;
        margin-left: 8px;
`;
