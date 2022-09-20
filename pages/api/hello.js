// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import moment from "moment"
import fs from "fs"
import formidable from "formidable-serverless"
import slugify from "slugify"
import path from "path"


export const config = {
  api: {
      bodyParser: false
  }
}

export default async function handler(req, res) {
  const timestamp = moment().format("DD-MM-YYYY")
  fs.mkdir(`./public/${moment().format("DD-MM-YYYY")}`, { recursive: true }, (err) => {
  })

  const data = await new Promise((resolve, reject) => {
    const form = formidable({
      multiple: true,
      uploadDir: `./public/${timestamp}`
    })
    form.keepExtensions = true
    form.keepFileName   = true
    form.on("fileBegin", (name, file) => {
      file.path = path.join(`./public/${timestamp}`, slugify(file.name))
    })
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve(files)
    })
  })

  res.status(200).json({ name: 'John Doe', data })
}
