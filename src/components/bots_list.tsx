"use client";
import { create_bot, get_bot_all } from "@/api/bot";
import {
  Montserrat,
  Poppins,
  Inter,
  Lato,
  Roboto_Mono,
} from "next/font/google";
import React, { useState, useEffect } from "react";
import { Oval, RotatingLines, TailSpin } from "react-loader-spinner";

const banner_font = Inter({ subsets: ["latin"], weight: "500" });
const content_font = Inter({ subsets: ["latin"], weight: "300" });
const title_font = Poppins({ subsets: ["latin"], weight: "300" });
const roboto = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

const container_style = "w-full flex flex-col gap-1";
const label_style = "text-neutral-600 text-sm";
const input_style =
  "border-neutral-500 border-[1px] text-md rounded py-1 px-2 w-full";
const drop_down_style =
  "w-40 py-2 px-3 border-neutral-500 border-[1px] text-md rounded";

const Bot: React.FC<{ data: any; setTest: any; setSelected: any }> = ({
  data,
  setTest,
  setSelected,
}) => {
  const [show, setShow] = useState(false);
  if (data.title == "Assistant") {
    data.status = "Inactive";
  }
  return (
    <div className="w-full flex flex-col">
      <div
        className={`${roboto.className} w-full py-3 px-8 shadow-md flex justify-between items-center bg-blue-100 text-sm`}
      >
        <div
          className="cursor-pointer"
          onClick={() => {
            setShow(!show);
          }}
        >
          Id: {data.id}
        </div>
        <div>Title: {data.title}</div>
        <div>Model: {data.model}</div>
        <div
          className={`w-40 py-2 flex gap-2 justify-center items-center cursor-pointer ${
            data.status == "Active"
              ? "bg-blue-500 cursor-pointer"
              : "bg-neutral-500 cursor-default"
          } rounded text-neutral-100`}
          onClick={() => {
            if (data.status == "Active") {
              setSelected(data);
              setTest(true);
            }
          }}
        >
          {data.status == "Active" ? (
            <div className="w-2 h-2 bg-green-500 rounded-full border-white border-[1px]" />
          ) : (
            <div className="w-2 h-2 bg-red-500 rounded-full border-white border-[1px]" />
          )}
          Test Bot
        </div>
      </div>
      {show && (
        <div
          className={`${roboto.className} w-full bg-neutral-200 rounded gap-3 p-8 flex flex-col`}
        >
          <div>Id: {data.id}</div>
          <div>Title: {data.title}</div>
          <div>Bot Name: {data.name}</div>
          <div>Status: {data.status}</div>
          <div>Prompt: {data.prompt}</div>
          <div>port: {data.port}</div>
        </div>
      )}
    </div>
  );
};

const TestBot: React.FC<{ data: any; setTest: any }> = ({ data, setTest }) => {
  const [inp, setInp] = useState("");
  const [conv, setConv] = useState([]);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen backdrop-blur-sm flex justify-center items-center bg-black transparent bg-opacity-50">
      <div className="relative w-2/3 h-4/5 shadow-md rounded-md bg-white flex flex-col pb-6 gap-4 overflow-x-hidden overflow-y-auto">
        <div className="sticky top-0 left-0 w-full z-10 py-6 px-8 bg-white">
          <div className="w-full flex justify-between pb-4">
            <div>{data.title}</div>
            <div
              onClick={() => {
                setTest(false);
              }}
              className="cursor-pointer"
            >
              X
            </div>
          </div>
          <hr className="w-full border-b-[1px] px-8 border-neutral-300" />
        </div>
        <div className="w-full flex flex-col gap-2 px-8 py-6">
          {conv.map((item: any, index) => (
            <div
              key={index}
              className={`w-full flex ${
                item.id === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`${
                  item.id === "bot" ? " bg-green-100" : " bg-blue-100"
                } max-w-2/3 p-2 rounded`}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full  px-8 ">
          <textarea
            className={input_style}
            rows={3}
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex  justify-end gap-4 px-8">
          <div className="px-3 py-1 bg-red-400 rounded">Record</div>
          <div className="px-3 py-1 bg-green-400 rounded">Send</div>
        </div>
      </div>
    </div>
  );
};

const CreateBot: React.FC<{
  setBotList: any;
  setCreateDialog: any;
  botList: any;
}> = ({ setBotList, botList, setCreateDialog }) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [voice, setVoice] = useState("male");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("mistral");
  const [links, setLinks] = useState<any>([]);
  const [documents, setDocuments] = useState<any>([]);

  const [tmpLink, setTmpLink] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    const response: any = await create_bot({
      title: title,
      name: name,
      voice: voice,
      prompt: prompt,
      model: model,
      links: links,
      documents: documents,
    });
    const newBot = response.data;
    setLoading(false);
    //setBotList([...botList, newBot]);
    setCreateDialog(false);
  };

  function isValidUrl(url: any) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen backdrop-blur-sm flex justify-center items-center bg-black transparent bg-opacity-50">
      <div className="relative w-1/2 h-4/5 shadow-md rounded-md bg-white flex flex-col pb-6 gap-4 overflow-x-hidden overflow-y-auto">
        <div className="sticky top-0 left-0 w-full z-10 py-6 px-8 bg-white">
          <div className="w-full flex justify-between pb-4">
            <div>Create a new bot</div>
            <div
              onClick={() => {
                setCreateDialog(false);
              }}
              className="cursor-pointer"
            >
              X
            </div>
          </div>
          <hr className="w-full border-b-[1px] px-8 border-neutral-300" />
        </div>
        <div className="w-full">
          <form className="flex flex-col gap-6 px-10">
            <div className={container_style}>
              <label className={label_style}>Title:</label>
              <input
                className={input_style}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className={container_style}>
              <label className={label_style}>Name:</label>
              <input
                className={input_style}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={container_style}>
              <label className={label_style}>Voice:</label>
              <select
                className={drop_down_style}
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div className={container_style}>
              <label className={label_style}>Prompt:</label>
              <textarea
                className={input_style}
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
            </div>
            <div className={container_style}>
              <label className={label_style}>Model:</label>
              <select
                className={drop_down_style}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="mistral">Mistral</option>
                <option value="llama2">Llama2</option>
                <option value="llama3">Llama3</option>
              </select>
            </div>
            <div className={container_style}>
              <label className={label_style}>Web Links:</label>
              {links.map((link: any, index: any) => (
                <div className="py-1 px-2" key={index}>
                  {link}
                </div>
              ))}
              <div className="w-full flex flex-col gap-1">
                <input
                  className={input_style}
                  type="text"
                  value={tmpLink}
                  onChange={(e) => setTmpLink(e.target.value)}
                />
                <button
                  className="w-28 bg-blue-400 px-2 py-0.5 rounded cursor-pointer"
                  type="button"
                  onClick={() => {
                    if (isValidUrl(tmpLink)) {
                      setLinks([...links, tmpLink]);
                      setTmpLink("");
                    }
                  }}
                >
                  + Add URL
                </button>
              </div>
            </div>
            <div className={container_style}>
              <label className={label_style}>Documents:</label>
              {documents.map((doc: any, index: any) => (
                <div className="py-1 px-2" key={index}>
                  {doc.name}
                </div>
              ))}
              <input
                type="file"
                accept=".txt, application/pdf"
                onChange={(e: any) => {
                  const newFile = e.target.files[0];
                  setDocuments([...documents, newFile]);
                }}
              />
            </div>
            <div className="w-full flex gap-10">
              <div
                className="bg-green-400 w-40 py-1 rounded flex justify-center items-center cursor-pointer"
                onClick={handleSubmit}
              >
                Submit
              </div>
              {loading && (
                <RotatingLines
                  visible={true}
                  height="30"
                  width="30"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const BotsList = () => {
  const [botList, setBotList] = useState([]);
  const [showCreateDialog, setCreateDialog] = useState(false);
  const [showTest, setTest] = useState(false);
  const [currentSelected, setSelected] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      const data = await get_bot_all();
      if (data) {
        setBotList(data);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="w-full h-full flex flex-col py-6 px-8 gap-4">
      <div className="w-full flex justify-start">
        <div
          className={`${title_font.className} bg-green-700 px-4 py-1 rounded shadow text-neutral-100 cursor-pointer`}
          onClick={() => {
            setCreateDialog(true);
          }}
        >
          Create +
        </div>
      </div>

      <hr className="w-full border-b-[1px] border-neutral-300" />
      {botList.map((item: any, index: any) => (
        <Bot
          key={index}
          data={item}
          setTest={setTest}
          setSelected={setSelected}
        />
      ))}
      {showCreateDialog && (
        <CreateBot
          setBotList={setBotList}
          setCreateDialog={setCreateDialog}
          botList={botList}
        />
      )}
      {showTest && <TestBot data={currentSelected} setTest={setTest} />}
    </div>
  );
};

export default BotsList;
