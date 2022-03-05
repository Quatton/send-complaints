// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const database_id = process.env.NOTION_DATABASE_ID
  ? process.env.NOTION_DATABASE_ID
  : "please specify a database";

export async function getOptions(options_arr) {
  const database = await notion.databases.retrieve({
    database_id: database_id,
  });

  const properties = database.properties;
  const [type_options, about_options, status_options] = options_arr.map((e) =>
    properties[e]["select"].options.reduce((obj, property) => {
      const { name, ...rest } = property;
      return { ...obj, [name]: rest };
    }, {})
  );

  return { type_options, about_options, status_options };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    getOptions(["Type", "About"]).then(res.json);
  }
}
