import { contestParticipants } from "./sampleData";

import DetailBarChart from "./contest-detail-components/ContestDetailBarChartComponent";
import ContestStatisticContainer from "./contest-detail-components/ContestDetailStatisticComponent";
import { ContestDetailProps, ContestParticipant } from "./type";
import ParticipantListComponent from "./contest-detail-components/ParticipantListComponent";
import { Flex } from "antd";


const ContestDetailComponent: React.FC<ContestDetailProps> = ({ contest }) => {
    const participants = contestParticipants.filter((participant) => participant.contestId === contest?.contestId);
    return (
        <Flex vertical gap={24} style={{ margin: '1rem 2rem' }}>
            {contest && <ContestStatisticContainer contest={contest} />}
            {contest && <DetailBarChart contest={contest} />}
            <ParticipantListComponent participants={participants} />
        </Flex>
    );
}
export default ContestDetailComponent;