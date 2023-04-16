import styled from "styled-components";

function NameBox(props) {
        return (
                <Box highlighted={props.highlighted}>
                        {props.place}
                        <Name>{props.name}</Name>
                        <Score highlighted={props.highlighted}>{props.score}</Score>
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
`;

const Name = styled.div`
padding-left: 15px;
`;

const Score = styled.div`
position: absolute;
right: 15px;
color: ${props => props.highlighted ? "#000000" : "#ffffff"};
`;
