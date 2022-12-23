export default {
  GetWeather: async (data) => {
    const req = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        data.latitude +
        "&lon=" +
        data.longitude +
        "&appid=2c63d574db1ebdabfff1c6d0481ed955&units=metric&lang=pt"
    )
      .then((resp) => resp.json())
      .catch(() => alert("erro ao carregar"));

    console.log("Data", req);
    return req;
  },
};
