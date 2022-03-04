// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");

dotenv.config();

type Data = {
  type: string;
  content: string;
};

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
  }
}
