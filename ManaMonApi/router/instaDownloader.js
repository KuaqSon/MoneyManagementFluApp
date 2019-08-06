const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const request = require("request");

router.post("/image-urls", function(req, res) {
  const { post_url } = req.body;

  if (!post_url) {
    return res.json({
      resp: null,
      isError: true,
      message: "Link to instagram post cannot blank!"
    });
  }

  if (
    post_url.substring(0, 8) === "https://" ||
    post_url.substring(0, 7) === "http://"
  ) {
    request(post_url, (error, response, html) => {
      if (!error) {
        const $ = cheerio.load(html);

        const image_link = $('meta[property="og:image"]').attr("content");
        const video_link = $('meta[property="og:video"]').attr("content");
        const file = $('meta[property="og:type"]').attr("content");
        const url = $('meta[property="og:url"]').attr("content");
        const title = $('meta[property="og:title"]').attr("content");

        res.json({
          resp: {
            title,
            url,
            file,
            src_url: video_link ? video_link : image_link
          },
          isError: false,
          message: "Success!"
        });
      } else {
        res.json({
          resp: null,
          isError: true,
          message: "Cannot load page!"
        });
      }
    });
  } else {
    return res.json({
      resp: null,
      isError: true,
      message: "Invalid post url!"
    });
  }
});

module.exports = router;
