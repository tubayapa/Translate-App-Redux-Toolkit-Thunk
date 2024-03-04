import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions/translateActions";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Loader from "./components/Loader";
import { updateText } from "./redux/slices/translateSlices";

const App = () => {
  const langState = useSelector((store) => store.language);
  const translateState = useSelector((store) => store.translate);

  console.log(translateState);

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const [text, setText] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // we don't want to change all states for every render so for a better performance we prefer to use useMemo

  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages]
  );

  // function for change button

  const handleChange = () => {
    // change the values where select areas

    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    // change the values where textareas
    setText(translateState.text);
    // update text where slice
    dispatch(updateText(text));
  };

  return (
    <div className=" bg-zinc-900 h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w=[1100px] flex flex-col justify-center">
        <h1 className="text-center text-3xl font-semibold mb-7">Translate +</h1>

        {/* top area */}
        <div className="flex gap-2 text-black rounded align-items-center ">
          <Select
            value={sourceLang}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            onChange={setSourceLang}
            className="flex-1"
            options={formatted}
          />

          <button
            onClick={handleChange}
            className="py-2 px-4 bg-slate-500 rounded transition hover:ring-1 hover:bg-slate-700 text-white"
          >
            Change
          </button>

          <Select
            value={targetLang}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            onChange={setTargetLang}
            className="flex-1"
            options={formatted}
          />
        </div>

        {/* text area */}
        <div className="flex mt-5 gap-[120px] max-md:flex-col max-md:gap-3">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[150px] max-h[500px] p-[10px]
             text-black rounded text-[17px]"
            />
          </div>

          <div className="flex-1 relative">
            <textarea
              value={translateState.text}
              disabled
              className="w-full min-w-[300px] min-h-[150px] max-h[500px] p-[10px]
             text-white text-[17px]  rounded"
            />
            {translateState.isLoading && <Loader />}
          </div>
        </div>

        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
          className="rounded py-3 px-5 bg-slate-500  transition  hover:bg-slate-700 font-semibold mt-3"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;
