import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
// import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4} from 'uuid';

import schema from './schema';

const dynamoDB = new DynamoDB.DocumentClient()

const getErrorResponse = (errorMessage: string) => {

  return {
    statusCode: 500,
    body: JSON.stringify({
      message: errorMessage,
    })
  }
}

const message: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { nome, materia, curso } = event.body

  try{
    const params = {
      TableName: 'crudexampledb',
      Item: {
        id: uuidv4(),
        nome,
        materia,
        curso
      }
    }

    await dynamoDB.put(params).promise()

    return {
      statusCode: 201,
      body: JSON.stringify(params.Item)
    }

  } catch(err){
    console.log(err)
    return getErrorResponse(err);
  }

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message:`Olá ${nome}, sua matéria é ${materia} e seu curso é ${curso}` ,
  //   input: event,
  // }, null, 2)
  // }

  // return formatJSONResponse({
  //   message: `Olá ${nome}, sua matéria é ${materia} e seu curso é ${curso}`,
  //   event,
  // });
};

const getInfo = async () => {

  const params = {
    TableName: 'crudexampledb',
  }

  try{

    const data = await dynamoDB.scan(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    }

  } catch(err){
    console.log(err)
    return getErrorResponse(err)
  }

}

export const main = middyfy(message);
export const getProfessors = middyfy(getInfo);
