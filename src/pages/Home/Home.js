import styles from './Home.module.css';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

const Home = () => {
	const { user } = useAuthContext();
	// Pasamos el tercer arreglo con los argumentos para ordenar
	const { documents: transactions, error } = useCollection(
		'transactions',
		['uid', '==', user.uid],
		['createdAt', 'desc']
	);
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{/* Primero revisamos el error */}
				{error && <p>{error}</p>}
				{transactions && <TransactionList transactions={transactions} />}
			</div>
			<div className={styles.sidebar}>
				<TransactionForm uid={user.uid} />
			</div>
		</div>
	);
};

export default Home;
