import React, { useState } from 'react';

const TransactionForm = () => {
	// Creamos dos piezas de estado para el nombre de la transacción y la cantidad que involucra. Nótese que el valor inicial del valor de la transacción es un string vacío porque los números en los inputs son tomados como strings
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
    // Definimos la función para el manejo del envío del formulario
    const handleSubmit = e => {
        e.preventDefault();
        // Por ahora sólo mostraremos la transacción por consola para ver que el formulario funciona
        console.log({
            name,
            amount 
        })
    }

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
