import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { document } from '../utils/dynamodbClient';

interface ICreateTodo {
	title: string;
	deadline: string;
}

export const handler: APIGatewayProxyHandler = async event => {
	const { userid } = event.pathParameters;
	const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

	const todo = {
		id: uuid(),
		user_id: userid,
		title,
		deadline: new Date(deadline).toString(),
		done: false,
	};

	await document
		.put({
			TableName: 'todos',
			Item: todo,
		})
		.promise();

	return {
		statusCode: 201,
		body: JSON.stringify(todo),
	};
};
