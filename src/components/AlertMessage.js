import React from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertMessage = ( props ) => {
	
	return (
		<>
			<Alert variant={props.value.variant}>
				<Alert.Heading>
					{props.value.message}
				</Alert.Heading>
			</Alert>
		</>	
	);
}

export default AlertMessage;