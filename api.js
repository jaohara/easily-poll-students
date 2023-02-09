import { db } from "./db";
import { GetItemCommand, PutItemCommand, DeleteItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const getPoll = async (event) => {
    const response = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ pollId: event.pathParameters.pollId }),
        };
        const { Item } = await db(new GetItemCommand(params));

        console.log({ Item });
        response.body = JSON.stringify({
            message: "Successfully retrieved poll.",
            data: (Item) ? unmarshall(Item) : {},
            rawData: Item,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to get poll.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const createPoll = async (event) => {
    const response = { statusCode: 200 };

    try {
        const body = JSON.parse(event.body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(body || {}),
        };
        const createResult = await db(new PutItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully created poll.",
            createResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to create poll.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const updatePoll = async (event) => {
    const response = { statusCode: 200 };

    try {
        const body = JSON.parse(event.body);
        const objKeys = Object.keys(body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ pollId: event.pathParameters.pollId }),
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`]: key,
            }), {}),
            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`:value${index}`]: body[key],
            }), {})),
        };
        const updateResult = await db(new UpdateItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully updated poll.",
            updateResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to update poll.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const deletePoll = async (event) => {
    const response = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ pollId: event.pathParameters.pollId }),
        };
        const deleteResult = await db(new DeleteItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully deleted poll.",
            deleteResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to delete poll.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const getAllPolls = async () => {
    const response = { statusCode: 200 };

    try {
        const { Items } = await db(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME }));

        response.body = JSON.stringify({
            message: "Successfully retrieved all polls.",
            data: Items.map((item) => unmarshall(item)),
            Items,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to retrieve polls.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

export default {
    getPoll,
    createPoll,
    updatePoll,
    deletePoll,
    getAllPolls,
};