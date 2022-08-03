import { SectionError } from 'components/Error';
import { SectionLoader } from 'components/Loader';
import CollectiveInvestmentsTable from '../CollectiveInvestmentsTable';
import { useGetGroupCollectiveInvestmentsQuery } from 'features/groups/groupsApi';

const PersonalCollectiveInvestments = () => {
    let {data: investments, isLoading, isSuccess, isError, error} = useGetGroupCollectiveInvestmentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !investments) return <SectionLoader/>;

    console.log(investments);

    return <CollectiveInvestmentsTable title={'Group Collective Investments'} investments={investments}/>;
};

export default PersonalCollectiveInvestments;
