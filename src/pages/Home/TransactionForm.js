import React, { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore'; 

const TransactionForm = ({uid}) => {
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
    const { addDocument, response} = useFirestore('transactions');

    const handleSubmit = e => {
        e.preventDefault();
        addDocument({
            name, 
            amount,
            uid
        });

    }
    useEffect(() => {
        if (response.success) {
            setName('');
            setAmount('');
        }
    }, [response.success])

	return (
		<>
			<h3>Add a Transaction</h3>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Transaction name</span>
					<input
						type='text'
						value={name}
						required
						onChange={e => setName(e.target.value)}
					/>   
				</label>
                <label>
					<span>Amount</span>
					<input
						type='number'
						value={amount}
						required
						onChange={e => setAmount(e.target.value)}
					/>   
				</label>
                <button>Add Transaction</button>
			</form>
		</> 
	);
};

export default TransactionForm;
