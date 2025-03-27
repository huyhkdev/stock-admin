import DetailBarChart from "./contest-detail-components/ContestDetailBarChartComponent";
import ContestStatisticContainer from "./contest-detail-components/ContestDetailStatisticComponent";
import ParticipantListComponent from "./contest-detail-components/ParticipantListComponent";
import { Flex } from "antd";
import { useInfoContestParticipants, useInfoCurrentRank, useInfoFinalRank } from "../../../hook/useInfoContest";
import { Contest, TopUser } from "../../../apis/contests.api";
import RankListComponent from "./contest-detail-components/RankListComponent";
import { useEffect, useState } from "react";
import CountDownCard from "./contest-detail-components/CountDownCard";


const ContestDetailComponent: React.FC<{contest:Contest | null}> = ({ contest }) => {
    ;
    const isEnded= new Date(contest?.endDateTime ?? 0) <= new Date();
    const isStarted = new Date(contest?.startDateTime ?? 0) <= new Date();
    const {data:participants,isLoading:loading } = useInfoContestParticipants(contest!.contestId!);
    const {data:currentRank } = useInfoCurrentRank(contest!.contestId!);
    const {data:finalRank } = useInfoFinalRank(contest!.contestId!);
    const [rank,setRank] = useState<TopUser[]>();
   useEffect(()=>{
    if(!isEnded && isStarted){
        setRank(currentRank);
    }else if(isEnded){
        setRank(finalRank);
    }
   },[currentRank,finalRank,participants])
    return (
        <Flex vertical gap={24} style={{  margin: '1rem 1rem', backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '10px' }}>
           {contest && <CountDownCard contest={contest}/>}
            {participants && <ContestStatisticContainer participants={participants} contest={contest!} />} 
            { (rank?.length ?? 0) > 0 && <RankListComponent topUsers={rank!} loading={false} />}
            {participants && <DetailBarChart participants={participants} />} 
             <ParticipantListComponent participants={participants!} loading={loading} />
        </Flex>
    );
}
export default ContestDetailComponent;