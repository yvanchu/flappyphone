import styled from "styled-components";

import { useData } from "../util/firebase";

import { useEffect, useState } from "react";

import RedBird from '../assets/red_bird.png';
import BlueBird from '../assets/blue_bird.png';
import YellowBird from '../assets/yellow_bird.png';
import Title from '../assets/LEADERBOARD.png';
import Logo from '../assets/logo-wrap.png';

import { useParams } from "react-router";

import NameBox from "../components/NameBox";

function Leaderboard() {
  
  const { pid } = useParams();

  const [sorted, setSorted] = useState([]);

  const [playerData] = useData(`/players`);

  const [me, setMe] = useState(null);

  const [place, setPlace] = useState(null);

  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    bird: window.innerHeight / 2.7,
  })

  useEffect(() => {
    const handleResize = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
        bird: window.innerHeight / 2.7,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])

  useEffect(() => {
    if (playerData) {
      let tmp = Object.entries(playerData);
      tmp = tmp.filter((a) => {
        return a[1].hasOwnProperty("score")
      })
      tmp = tmp.sort((a, b) => {
        return b[1].score - a[1].score
      });

      let hmm = tmp.filter((a) => {
        return a[0] == pid
      })

      let asdf = tmp.indexOf(hmm[0]);
      console.log(asdf);

      tmp = tmp.slice(0, 10);

      let hmm2 = tmp.filter((a) => {
        return a[0] == pid
      })

      if (hmm2.length) {
        console.log('a1');
        setSorted(tmp);
      } else if (hmm.length) {
        console.log('a2');
        setSorted(tmp.slice(0, 9));
        setMe(hmm[0]);
        setPlace(asdf);
      } else {
        console.log('a3');
        setSorted(tmp);
      }
    }
  }, [playerData]);

  return (
    <Wrapper>
      {/* <header className="App-header">
        <p>Leaderboard</p>
        <p>{Number(cloud_count)}</p>
      </header> */}
      <Column>
        <a href="/"><Img src={Logo} width={screen.width / 5} y={5} />
          </a>
        <Img A src={RedBird} height={screen.bird} y={22} />
        <ImgR src={YellowBird} height={screen.bird} y={39} />
        <Img src={BlueBird} height={screen.bird} y={58} />
      </Column>
      <Column a>
        <img src={Title} width={0.7 * ((screen.width / 2) - 80)} />
        <Holder>
          {sorted &&
            sorted.map((e, i) => {
              return (
                <NameBox
                  highlighted={e[0] == pid}
                  place={i + 1}
                  name={e[1].name}
                  score={e[1].score}
                  key={i}
                />
              )
            })
          }
          {me && <NameBox
            highlighted={true}
            place={place}
            name={me[1].name}
            score={me[1].score}
          />}
        </Holder>
      </Column>
    </Wrapper>
  );
}

export default Leaderboard;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
  padding: ${props => props.a ? "60px 40px" : "0"};
  background-color: black;
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  position: absolute;
  left: ${props => props.A ? "10%" : "7%"};
  top: ${props => props.y}%;
`;

const ImgR = styled.img`
  position: absolute;
  right: 7%;
  top: ${props => props.y}%;
`;

const Holder = styled.div`
  overflow-y: auto;
  height: calc(100% - 172px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
`;
