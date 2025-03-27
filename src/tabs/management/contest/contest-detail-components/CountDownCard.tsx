import React, { useEffect, useState } from 'react';
import { Typography, Flex, Space } from 'antd';
import { styled } from 'styled-components';
import moment from "moment";
import { Contest } from '../../../../apis/contests.api';
const { Title, Paragraph } = Typography;
const StyledCountDownCard = styled.div`
.countdown-container {
    position: relative;
    height: 25rem;
    background-color: var(--body-background-color-level-2);
    color: white;
    font-family: 'Roboto', sans-serif;
    border-radius:0.9rem ;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    } 
  }
  
  .background-image {
    position: absolute;
    inset: 0;
    z-index: 0; 
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
    border-radius:0.9rem ;
  }
  
  .countdown-content{
    width:100%;
  }
  
  .countdown-timers {
    margin-top: 2rem;
    width:100%;
    z-index: 1; 
    height:fit-content;
  }
  .countdown-item {
    background-color: rgba(2, 1, 0, 0.65);
    /* background-color: var(--body-background-color-level-2); */
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--primary-text-color);
    width: clamp(8rem, 11vw, 11rem);
    padding: clamp(1rem, 3vw, 1.8rem);
    height: fit-content;
    &:hover {
        box-shadow: 0 0 10px 0 rgba(3, 3, 3, 0.475);
    }
}
  .countdown-num{
    color:var(--primary-text-color) !important;
    padding:0!important;
    margin: 0 !important;
    font-size: clamp(3rem, 5vw, 6rem) !important;
}
  }
  .countdown-unit{
    color:black !important;
   text-align: center;
    font-size: 1.4rem !important;
    font-weight: bold;
    margin-bottom: 0 !important;
  }

.countdown-title{
    color:black !important;
   text-align: center;
   font-size: clamp(1rem, 4vw, 2.5rem)!important;
   font-weight: bold;
}
 
`;


const CountDownCard: React.FC<{ contest: Contest }> = ({ contest }) => {
    const [deadline, setDeadline] = useState(0);
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());
    const [message, setMessage] = useState("");
   const setValidDeadline = ()=> {
        const now = moment().valueOf();
        const endTime = moment(contest.endDateTime).valueOf();
        const startTime = moment(contest.startDateTime).valueOf();
        
        if (endTime < now && startTime < now) {
            console.log('Contest has ended');
            setDeadline(0);
            setMessage("CONTEST HAS ENDED");
        } else if (endTime > now && startTime <= now) {
            console.log('Contest has ongoing');
            setDeadline(endTime);
            setMessage("CONTEST ENDS IN");
        } else {
            console.log('Contest has not started');
            setDeadline( startTime);
            setMessage("CONTEST STARTS IN");
        }
    }
    
    function getTimeLeft() {
        if(deadline === 0){
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }
        const now =moment().valueOf();
        const diff = Math.max( deadline - now,0);

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }

    useEffect(() => {
        setValidDeadline();
        const intervalTimeLeft = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(intervalTimeLeft);
    }, [deadline,timeLeft,contest]);
    
    return (
        <StyledCountDownCard>
            <Flex vertical gap='1rem' justify='center' align='center' className="countdown-container">
                <img
                    src={contest.banner}
                    alt="Contest banner"
                    className="background-image"
                />
                <Flex vertical justify='center' align='center' gap={5} className="countdown-timers">
                    <Space>
                        <Title level={1} className="countdown-title">{message}</Title>
                    </Space>
                    <Flex gap={20}>
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <Flex vertical justify='center' align='center' key={unit}>
                            <Flex justify='center' align='center' className="countdown-item">
                                <Title level={1} className='countdown-num'>{value.toString().padStart(2, '0')}</Title>
                            </Flex>
                            <Paragraph className='countdown-unit'>{unit.toUpperCase()}</Paragraph>
                        </Flex>
                    ))}
                    </Flex>
                  
                </Flex>
            </Flex >
        </StyledCountDownCard>

    );
};

export default CountDownCard;
