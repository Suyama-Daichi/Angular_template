import { Response } from './APIGWResponse.d';
import { Context, APIGatewayEvent } from "aws-lambda";
import * as admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env['PROJECT_ID'],
        clientEmail: process.env['CLIENT_EMAIL'],
        privateKey: process.env['PRIVATE_KEY']!.replace(/\\n/g, '\n')
    })
})
export async function handler(event: APIGatewayEvent, context?: Context): Promise<Response> {
    try {
        const customToken = await admin.auth().createCustomToken(JSON.parse(event.body as string).fsUserToken)
        return {
            isBase64Encoded: false,
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                token: customToken
            })
        };
    } catch (error) {
        return {
            isBase64Encoded: false,
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                message: error
            })
        };
    }

}
