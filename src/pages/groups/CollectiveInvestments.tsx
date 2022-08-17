import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import CollectiveInvestmentsTable from 'components/tables/CollectiveInvestmentsTable';
import { useGetGroupCollectiveInvestmentsQuery } from 'features/groups/groupsApi';

const PersonalCollectiveInvestments = () => {
    let {data: investments, isLoading, isSuccess, isError, error} = useGetGroupCollectiveInvestmentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !investments) return <SectionLoader/>;

    console.log(investments);

    return <CollectiveInvestmentsTable title={'Group Collective Investments'} investments={investments}/>;
};

export default PersonalCollectiveInvestments;
