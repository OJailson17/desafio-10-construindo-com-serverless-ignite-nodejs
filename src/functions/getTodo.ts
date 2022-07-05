import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from 'src/utils/dynamodbClient';

interface IGetTodo {
	title: string;
	deadline: string;
	done: boolean;
}

export const handler: APIGatewayProxyHandler = async event => {
	const { userid } = event.pathParameters;

	const todos = await document
		.query({
			TableName: 'todos',
			KeyConditionExpression: 'user_id = :id',
			ExpressionAttributeValues: {
				':id': userid,
			},
		})
		.promise();

	console.log(todos);

	const response = todos.Items as IGetTodo[];

	return {
		statusCode: 200,
		body: JSON.stringify(response),
	};
};
