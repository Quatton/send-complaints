// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import { capFirst } from "../../lib/util";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const database_id = process.env.NOTION_DATABASE_ID
  ? process.env.NOTION_DATABASE_ID
  : "please specify a database";

import { getOptions } from "./option";

type Complain = {
  title: string;
  type: string;
  about: string;
  desc: string;
};

async function createComplain(complain: Complain) {
  const { type_options, about_options } = await getOptions();
  const { id: type_id, color: type_color } = type_options[complain.type]
    ? type_options[complain.type]
    : type_options[type_options[0]];
  const { id: about_id, color: about_color } = about_options[complain.about]
    ? about_options[complain.about]
    : about_options[about_options[0]];
  const response = await notion.pages.create({
    parent: {
      database_id: database_id,
    },
    properties: {
      Title: {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: complain.title,
            },
          },
        ],
      },
      Type: {
        type: "select",
        select: {
          id: type_id,
          name: complain.type,
          color: type_color,
        },
      },
      About: {
        type: "select",
        select: {
          id: about_id,
          name: complain.about,
          color: about_color,
        },
      },
      Description: {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: {
              content: complain.desc,
            },
          },
        ],
      },
    },
  });

  return response;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    createComplain({
      title: capFirst(req.body.title),
      type: capFirst(req.body.type),
      about: capFirst(req.body.about),
      desc: capFirst(req.body.desc),
    })
      .then(res.json)
      .catch(res.json);
  } else {
    getOptions().then(res.json);
  }
}
