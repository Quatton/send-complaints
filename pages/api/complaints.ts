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

interface Complain {
  title: string;
  type: string;
  about: string;
  desc: string;
}

async function createComp(complain: Complain) {
  const { type_options, about_options, status_options } = await getOptions([
    "Type",
    "About",
    "Status",
  ]);
  const { id: type_id, color: type_color } = type_options[complain.type]
    ? type_options[complain.type]
    : type_options[type_options[0]];
  const { id: about_id, color: about_color } = about_options[complain.about]
    ? about_options[complain.about]
    : about_options[about_options[0]];
  const { id: status_id, color: status_color } = status_options["New"];
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
      Status: {
        type: "select",
        select: {
          id: status_id,
          name: "New",
          color: status_color,
        },
      },
      Votes: {
        type: "number",
        number: 0,
      },
    },
  });

  return response;
}

async function getComp() {
  const notionPages = await notion.databases.query({
    database_id: database_id,
    filter: {
      or: [
        {
          property: "Status",
          select: {
            equals: "Developing",
          },
        },
        {
          property: "Status",
          select: {
            equals: "Voting",
          },
        },
      ],
    },
    sorts: [{ property: "Votes", direction: "descending" }],
  });

  return notionPages;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    createComp({
      title: req.body.title,
      type: capFirst(req.body.type),
      about: capFirst(req.body.about),
      desc: req.body.desc,
    })
      .then(res.json)
      .catch(res.json);
  } else {
    getComp()
      .then((data) =>
        res.json(
          data.results.map((page) => {
            const { Description, Title, Votes, About, Status } =
              page.properties;
            const id = page.id;
            const desc = Description["rich_text"][0].text.content;
            const title = Title["title"][0].text.content;
            const votes = Votes["number"];
            const about = About["select"].name;
            const status = Status["select"].name;
            return { id, title, desc, votes, about, status };
          })
        )
      )
      .catch(res.json);
  }
}
