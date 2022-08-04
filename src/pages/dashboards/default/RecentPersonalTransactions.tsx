import { SectionError } from 'components/Error';
import { useGetRecentPersonalAccountTransactionQuery } from 'features/savings/savingsApi';
import SavingsTransactionTable from 'components/tables/SavingsTransactionTable';
import { ComponentLoader } from '../../../components/Loader';

const RecentPersonalTransactions = () => {
    let {data: transactions, isLoading, isSuccess, isError, error} = useGetRecentPersonalAccountTransactionQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <ComponentLoader/>;

    console.log(transactions);

    return <SavingsTransactionTable title={'Recent Personal Transactions'} transactions={transactions}/>;
};

export default RecentPersonalTransactions;
