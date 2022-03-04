// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const database_id: string = process.env.NOTION_DATABASE_ID
  ? process.env.NOTION_DATABASE_ID
  : "please specify a database";
const type_id = process.env.NOTION_TYPE_ID || "trust me it's string";
const desc_id = process.env.NOTION_DESCRIPTION_ID || "trust me it's string";
const about_id = process.env.NOTION_ABOUT_ID || "trust me it's string";
const vote_id = process.env.NOTIONNOTION_VOTES_ID || "trust me it's string";
const status_id = process.env.NOTION_STATUS_ID || "trust me it's string";

async function getOptions() {
  const database = await notion.databases.retrieve({
    database_id: database_id,
  });

  const properties = database.properties;
  const type_options = properties["Type"]["select"].options.reduce(
    (obj, property) => {
      const { name, ...rest } = property;
      return { ...obj, [name]: rest };
    },
    {}
  );
  const about_options = properties["About"]["select"].options.reduce(
    (obj, property) => {
      const { name, ...rest } = property;
      return { ...obj, [name]: rest };
    },
    {}
  );
  return { type_options, about_options };
}

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
      title: req.body.title,
      type: req.body.type,
      about: req.body.about,
      desc: req.body.desc,
    })
      .then(res.json)
      .catch(res.json);
  } else {
    getOptions().then(res.json);
  }
}
