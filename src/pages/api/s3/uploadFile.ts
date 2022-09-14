import { NextApiRequest, NextApiResponse } from 'next'
import S3 from "aws-sdk/clients/s3";
import { json } from "stream/consumers";
import axios from 'axios';

const s3 = new S3({
  region: "ap-southeast-2",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});

const handleUpload = async (req: NextApiRequest, res: NextApiResponse) =>  {
    if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
    }
    if(!req.body) {
        return res.status(400).json("No data passed in...")
    }

    try {
    
        const fileParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: "fileName",
          Expires: 600,
          ContentType: 'image/png',
        };
    
        const url = await s3.getSignedUrlPromise("putObject", fileParams);
        axios.put(url, req.body, {
            headers: {
                "Content-type": 'image/png'
            }
        })
        res.status(200).json({ url });
      } catch (err) {
        console.log(err);
        res.status(400).json(req.body);
      }
}

export default handleUpload;

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.status(200).json({req})
// }




// //using https://github.com/kolberszymon/NextJS-AWSS3/blob/a9c2f3ae9f0c56e3c493ba042c37ae8e5f033f9f/src/pages/api/s3/uploadFile.ts


// export default async (req: NextApiRequest, res: NextApiResponse) => {  
//   try {
//     let { name, type } = req.body;

//     const fileParams = {
//       Bucket: process.env.BUCKET_NAME,
//       Key: name,
//       Expires: 600,
//       ContentType: type,
//     };

//     const url = await s3.getSignedUrlPromise("putObject", fileParams);

//     res.status(200).json({ url });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err });
//   }
// };

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};