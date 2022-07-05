import { DynamoDB } from 'aws-sdk';

export const document = new DynamoDB.DocumentClient({
	region: 'localhost',
	endpoint: 'http://localhost:8000',
	accessKeyId: 'x',
	secretAccessKey: 'x',
});
