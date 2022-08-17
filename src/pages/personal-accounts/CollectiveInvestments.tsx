import { useGetPersonalCollectiveInvestmentsQuery } from 'features/personal-accounts/personalAccountApi';
import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import CollectiveInvestmentsTable from 'components/tables/CollectiveInvestmentsTable';

const PersonalCollectiveInvestments = () => {
    let {data: investments, isLoading, isSuccess, isError, error} = useGetPersonalCollectiveInvestmentsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !investments) return <SectionLoader/>;

    console.log(investments);

    return <CollectiveInvestmentsTable title={'Personal Account Collective Investments'} investments={investments}/>;
};

export default PersonalCollectiveInvestments;
