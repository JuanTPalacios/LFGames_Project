import { CLIENT_ID, API_TOKEN, LOCAL_URL } from "@env";
console.log(LOCAL_URL);
const URL = "http://192.168.2.16:3000/";
console.log(CLIENT_ID);

export const getGameInfo = async (Mbody) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/" + "games", {
      method: "POST",
      headers: {
        "Client-ID": `${CLIENT_ID}`,
        Authorization: `Bearer ${API_TOKEN}`,
        "content-type": "text/plain",
      },
      body: Mbody,
    });
    const data = await response.json();
    data.map((game) => {
      if (game.cover) {
        game.cover.url = `http://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
      } else {
        game.cover = {
          url: "hi",
        };
      }
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getGameDetails = async (gameDetails) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/" + "games", {
      method: "POST",
      headers: {
        "Client-ID": `${CLIENT_ID}`,
        Authorization: `Bearer ${API_TOKEN}`,
        "content-type": "text/plain",
      },
      body: gameDetails,
    });
    const data = await response.json();
    data.map((game) => {
      if (game.cover) {
        game.cover.url = `http://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
      }
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};