import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import SavingsTransactionTable from 'components/tables/SavingsTransactionTable';
import { useGetGroupAccountTransactionsQuery } from 'features/group-accounts/groupAccountApi';
import { logger } from 'utils/logger';

const Transactions = () => {
    let { data: transactions, isLoading, isSuccess, isError, error } = useGetGroupAccountTransactionsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <SectionLoader/>;

    logger.log(transactions);

    return <SavingsTransactionTable title={'Group Account Transactions'} transactions={transactions}
                                    entity={'group-accounts'}/>;
};

export default Transactions;
