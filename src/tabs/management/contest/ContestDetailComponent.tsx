import ContestStatisticContainer from "./contest-detail-components/ContestDetailStatisticComponent";
import ParticipantListComponent from "./contest-detail-components/ParticipantListComponent";
import { Flex, Spin } from "antd";
import { useInfoContestDetail } from "../../../hook/useInfoContest";
import { Contest } from "../../../apis/contests.api";
import RankListComponent from "./contest-detail-components/RankListComponent";
import CountDownCard from "./contest-detail-components/CountDownCard";


const ContestDetailComponent: React.FC<{contest:Contest | null}> = ({ contest }) => {
    const { data: contestDetail, isLoading } = useInfoContestDetail(contest?.contestId ?? 0);

    if (isLoading) {
        return (
            <Flex justify="center" align="center" style={{ minHeight: '400px' }}>
                <Spin size="large" />
            </Flex>
        );
    }

    if (!contestDetail) {
        return null;
    }

    // Convert contestDetail to Contest format for CountDownCard
    const contestData: Contest = {
        contestId: contestDetail.contestId,
        contestName: contestDetail.contestName,
        startDateTime: new Date(contestDetail.startDateTime),
        endDateTime: new Date(contestDetail.endDateTime),
        banner: contestDetail.banner,
        maxParticipants: contestDetail.maxParticipants,
        isStrict: contestDetail.isStrict,
        allowJoinEmails: contestDetail.allowJoinEmails,
    };

    return (
        <Flex vertical gap={24} style={{  margin: '1rem 1rem', backgroundColor: '#F4F4F4', padding: '1rem', borderRadius: '10px' }}>
           <CountDownCard contest={contestData}/>
            <ContestStatisticContainer participants={contestDetail.participants} contest={contestData} /> 
            {contestDetail.rankList && contestDetail.rankList.length > 0 && (
                <RankListComponent topUsers={contestDetail.rankList} loading={false} />
            )}
            <ParticipantListComponent participants={contestDetail.participants} loading={false} />
        </Flex>
    );
}
export default ContestDetailComponent;