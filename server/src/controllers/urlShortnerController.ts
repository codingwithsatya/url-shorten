import { Request, Response } from "express";
import validUrl from "valid-url";
import shortid from "shortid";
import Url from "../models/urlShortnerModel";

// Route for shortening URL
export const urlShortener = async (req: Request, res: Response) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ error: "Invalid Url" });
  }

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.json(url);
    }

    const shortCode = shortid.generate();
    const shortUrl = process.env.BASE_URL + shortCode;

    url = new Url({
      longUrl,
      shortUrl,
      shortCode,
      createdAt: new Date(),
    });

    await url.save();
    res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// LongUrl redirect using shortCode
export const urlRedirectByID = async (req: Request, res: Response) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
