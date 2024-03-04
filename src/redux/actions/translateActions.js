// async thunk actions

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languageOptions } from "../../constants/index";

export const getLanguages = createAsyncThunk(
  "language/getlanguages",
  async () => {
    // get languages data from API
    const res = await axios.request(languageOptions);

    // determine the payload of the action
    return res.data.data.languages;
  }
);

// get request from api's translate endpoint

export const translateText = createAsyncThunk(
  "translate/translateText",
  async (action_params) => {
    const { sourceLang, targetLang, text } = action_params;

    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "77c98b0588msh98828b2b0d0eb78p15b0c1jsn05bf3b079533",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };
    const res = await axios.request(options);

    console.log(res.data.data.translatedText);

    return res.data.data.translatedText;
  }
);
