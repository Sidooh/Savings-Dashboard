import { useGetPersonalCollectiveInvestmentsQuery } from 'features/personal-accounts/personalAccountApi';
import { SectionError } from 'components/Error';
import { SectionLoader } from 'components/Loader';
import CollectiveInvestmentsTable from '../CollectiveInvestmentsTable';

const PersonalCollectiveInvestments = () => {
    let {data: investments, isLoading, isSuccess, isError, error} = useGetPersonalCollectiveInvestmentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !investments) return <SectionLoader/>;

    console.log(investments);

    return <CollectiveInvestmentsTable title={'Personal Account Collective Investments'} investments={investments}/>;
};

export default PersonalCollectiveInvestments;
