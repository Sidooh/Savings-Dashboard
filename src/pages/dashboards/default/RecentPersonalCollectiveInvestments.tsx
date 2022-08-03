import { SectionError } from 'components/Error';
import { SectionLoader } from 'components/Loader';
import CollectiveInvestmentsTable from 'pages/CollectiveInvestmentsTable';
import { useGetRecentPersonalCollectiveInvestmentQuery } from '../../../features/savings/savingsApi';

const RecentPersonalCollectiveInvestments = () => {
    let {data: investments, isLoading, isSuccess, isError, error} = useGetRecentPersonalCollectiveInvestmentQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !investments) return <SectionLoader/>;

    console.log(investments);

    return <CollectiveInvestmentsTable title={'Recent Personal Collective Investments'} investments={investments}/>;
};

export default RecentPersonalCollectiveInvestments;
