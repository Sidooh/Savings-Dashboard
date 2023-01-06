import { ComponentLoader, SectionError } from '@nabcellent/sui-react';
import CollectiveInvestmentsTable from 'components/tables/CollectiveInvestmentsTable';
import { useGetRecentPersonalCollectiveInvestmentQuery } from 'features/savings/savingsApi';
import { logger } from 'utils/logger';

const RecentPersonalCollectiveInvestments = () => {
    let {data: investments, isLoading, isSuccess, isError, error} = useGetRecentPersonalCollectiveInvestmentQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !investments) return <ComponentLoader/>;

    logger.log(investments);

    return <CollectiveInvestmentsTable title={'Recent Personal Collective Investments'} investments={investments}/>;
};

export default RecentPersonalCollectiveInvestments;
