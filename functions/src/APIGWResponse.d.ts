export interface Response {
    isBase64Encoded: boolean;
    statusCode: 200 | 201 | 400 | 500,
    headers: Object,
    body: string;
}