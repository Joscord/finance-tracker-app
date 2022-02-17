// Importamos nuestro hook
import { useFirestore } from '../../hooks/useFirestore';
import styles from './Home.module.css';

const TransactionList = ({transactions}) => {
  const { deleteDocument } = useFirestore('transactions');
  return (
    <ul className={styles.transactions}>
        {
            transactions.map(({id, name, amount}) => (
                <li key={id}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.amount}>{amount}</p>
                    {/* Pasamos la función de borrar documento al evento onClick */}
                    <button onClick={() => deleteDocument(id)}>X</button>
                </li>
            ))
        }
    </ul>
  )
}

export default TransactionList