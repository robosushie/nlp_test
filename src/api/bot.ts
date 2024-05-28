const base_url = "https://refined-magnetic-buck.ngrok-free.app";

export const get_bot_all = async () => {
  try {
    const response = await fetch(`${base_url}/bots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data.bots;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};

export const create_bot = async (data: any) => {
  try {
    console.log("calling post");
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("name", data.name);
    formData.append("voice", data.voice);
    formData.append("prompt", data.prompt);
    formData.append("model", data.model);
    data.links.forEach((link: any) => formData.append("links", link));
    data.documents.forEach((document: any) =>
      formData.append("documents", document)
    );

    const response = await fetch(`${base_url}/bot`, {
      method: "POST",
      //headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });
    return response;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
};

export const update_bot = async (data: any, id: any) => {
  try {
    const response = await fetch(`${base_url}/bot/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
};

export const delete_bot = async (id: any) => {
  try {
    const response = await fetch(`${base_url}/bots/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
};
