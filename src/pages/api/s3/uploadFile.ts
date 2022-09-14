import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";

//create s3 instance
const s3 = new S3({
    region: "ap-southeast-2",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    signatureVersion: "v4",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    if(!req.body) {
        return res.status(400).json("No data passed in...");
    }

    try{
        //get name of file and type of file from body of request
        let { name, type } = req.body;

        //set params so we can see the file
        const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: name,
            Expires: 600,
            ContentType: type,
        };

        //get signed URL so we can upload tings
        const url = await s3.getSignedUrlPromise("putObject", fileParams);

        res.status(200).json({ url });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
};

//export config
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "8mb",
        },
    },
};