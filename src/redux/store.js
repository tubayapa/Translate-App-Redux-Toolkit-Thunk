import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/languageSlices";
import translate from "./slices/translateSlices";

export default configureStore({ reducer: { language, translate } });
