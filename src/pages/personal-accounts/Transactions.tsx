import {
    useGetPersonalAccountTransactionsQuery
} from 'features/personal-account-transactions/personalAccountTransactionApi';
import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import SavingsTransactionTable from 'components/tables/SavingsTransactionTable';
import { logger } from 'utils/logger';

const Transactions = () => {
    let { data: transactions, isLoading, isSuccess, isError, error } = useGetPersonalAccountTransactionsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !transactions) return <SectionLoader/>;

    logger.log(transactions);

    return <SavingsTransactionTable title={'Personal Account Transactions'} transactions={transactions}
                                    entity={'personal-accounts'}/>;
};

export default Transactions;
