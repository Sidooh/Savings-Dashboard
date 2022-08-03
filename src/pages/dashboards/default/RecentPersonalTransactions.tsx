import { SectionError } from 'components/Error';
import { SectionLoader } from 'components/Loader';
import { useGetRecentPersonalAccountTransactionQuery } from 'features/savings/savingsApi';
import SavingsTransactionTable from '../../SavingsTransactionTable';

const RecentPersonalTransactions = () => {
    let {data: transactions, isLoading, isSuccess, isError, error} = useGetRecentPersonalAccountTransactionQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <SectionLoader/>;

    console.log(transactions);

    return <SavingsTransactionTable title={'Recent Personal Account Transactions'} transactions={transactions}/>;
};

export default RecentPersonalTransactions;
