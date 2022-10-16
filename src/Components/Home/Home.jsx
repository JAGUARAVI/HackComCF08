import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
import { Button, Spacer } from '@nextui-org/react';

export default function Home({ session }) {
	return (
		<Wrapper>
			<Navbar session={session} />
			<TopWrapper>
				<Text1>
					<Title>Pacify CF-08</Title>
					<SubTitle>To Tackle Mental Health</SubTitle>
				</Text1>
			</TopWrapper>
			<LineImage src="/Lines1.svg" />
			<TopWrapper>

				<TopWrapper2>
					<WaveImage src="/Wave1.svg" />
					<Text2>
						<CardWrapper>
							<SubTitle2>
								A self-reflective journey, mind-soothing content, socialising activities, and gamified exercises empower you by setting daily goals to meet your mental wellness targets and allow you to lift up your emotional wellbeing and build positive habits into your daily schedule. Our globally validated, interactive, research and evidence based self-help tools aims to help you develop the faculties of self-management and emotional resilience. This program is embedded in the most powerful technique of Cognitive Behaviour Therapy, which has a similar therapeutic impact as personal interaction ones. Mental welfare is as much a choice as it is a chore. So make your choice and let us help you with the chores!
							</SubTitle2>
						</CardWrapper>
					</Text2>
				</TopWrapper2>
			</TopWrapper>
			<Spacer y={4} />    /
			{ /*<Tabs>
				<div>
					<img src='/HeadPhones.svg' style={{ width: "300px" }} />
					<h3 style={{ color: 'white' }}>24 x 7 Helpline</h3>
				</div>
				<div>
					<img src='/experts.svg' style={{ width: "300px" }} />
					<h3 style={{ color: 'white' }}>Connect with Experts</h3>
				</div>
				<div>
					<img src='/Tailored.svg' style={{ width: "300px" }} />
					<h3 style={{ color: 'white' }}>Tailored Services</h3>
				</div>
			</Tabs>*/ }
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
    flex-direction:column;
    text-align:center;
	minHeight: 100vh,
	height: 100%,
    overflow-x: hidden;
    background: linear-gradient(146.06deg, #4FBB5A 0%, #4CA2CD 143.3%);
`;

const LineImage = styled.img`
  object-fit: cover;
  user-drag: none;
`

const WaveImage = styled.img`
  position: absolute;
  left:0;
  align-self: center;
  object-fit: cover;
  z-index: 1;
  user-drag: none;
`

const Text1 = styled.div`
    color:white;
    display: flex;
    flex-direction: column;
    gap:20px;
    align-items: center;
    align-self: center;
    margin: 16px;
    padding-top: 200px;
`

const Text2 = styled.div`
	z-index: 2;
    color:white;
    display: flex;
    flex-direction: column;
    gap:30px;
    align-items: center;
    align-self: center;
    margin: 0px 10px;
    padding-top: 50px;
`

const Title = styled.h1`
    font-size: 96px;
    padding: 0;
    margin: 0;
    @media (max-width:732px) {
        font-size: 64px;
    }
`

const SubTitle = styled.p`
    font-style: normal;
    font-weight: 300;
    padding: 0;
    margin: 0;
    font-size: 28px;
    text-align: center;
    @media (max-width:732px) {
        font-size: 20px;
    }
`

const SubTitle2 = styled.p`
    font-size: 24px;
    text-align: justify;
    font-style: normal;
    font-weight: 400;
    color: #FFFFFF;
    padding: 50px;
	z-index: 2;
    @media (max-width:732px) {
        font-size: 20px;
        padding:20px
    }
`

const TopWrapper = styled.div`
`

const TopWrapper2 = styled.div`
  position: relative;
`

const CardWrapper = styled.div`  
  max-width: 1000px;
  background: rgba(45, 108, 77, 0.2);
  backdrop-filter: blur(50px);
  align-self: center;
  text-align: justify;
  border-radius: 30px;
`

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1114px;
  margin-top: 150px;
  align-self:center;
  justify-content: center;
`