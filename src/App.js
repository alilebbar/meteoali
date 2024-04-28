import "./App.css";
//import Materiale Ui//
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
//import Materiale Ui//
//import moment//
import moment from "moment";
//import moment//
import { useTranslation } from "react-i18next";

const theme = createTheme({
  typography: {
    fontFamily: ["Dancing"],
  },
});

function App() {
  const { t, i18n } = useTranslation();
  let [traduction, setTraduction] = useState("en");
  let [dateState, setDateState] = useState({ date: null, heur: null });
  function date() {
    let date = moment().format("DD/MM/YYYY");
    let heur = moment().format("hh:mm:ss");
    setDateState({ date, heur });
  }
  let [dataState, setDataState] = useState({
    temp: "",
    tempmax: "",
    tempmin: "",
    namelocal: "",
    description: "",
    icon: "",
  });
  async function getApi() {
    let response;
    let data;
    try {
      response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=33.5724032&lon=-7.6693946&appid=4b320b8d49d7f13505737c6affe201ee"
      );
      data = await response.json();
      console.log(data);
      setDataState({
        ...dataState,
        temp: kelvinToCelsius(data.main.temp),
        tempmax: kelvinToCelsius(data.main.temp_max),
        tempmin: kelvinToCelsius(data.main.temp_min),
        namelocal: data.name,
        description: data.weather[0].description,
        icon:
          "https://openweathermap.org/img/wn/" +
          data.weather[0].icon +
          "@2x.png",
      });
    } catch (error) {
      console.error(response.statusText, ",", data.message);
    }
  }
  let changerLangue = () => {
    if (traduction === "en") {
      setTraduction("ar");
      i18n.changeLanguage("ar");
    } else {
      setTraduction("en");
      i18n.changeLanguage("en");
    }
  };
  useEffect(() => {
    i18n.changeLanguage(traduction);
    getApi();
    date();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  setTimeout(() => {
    date();
  }, 1000);
  setTimeout(() => {
    getApi();
  }, 3600000);
  // Fonction pour convertir la température de Kelvin en Celsius
  function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* content contnaire */}
          <div
            className="card"
            style={{
              height: "100vh",
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* card */}
            <div
              className="card"
              dir={traduction === "ar" ? "rtl" : "ltr"}
              style={{
                backgroundColor: "#0A3F9D",
                padding: "10px",
                borderRadius: "30px",
                boxShadow: "0px 11px 1px rgb(0,0,0,0.5)",
                width: "70vh",
              }}
            >
              {/* card content */}
              <div>
                {/* la localisation & la date */}
                <div
                  className="date"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h2" style={{ fontWeight: "300" }}>
                    {/*dataState.namelocal*/ t("casablanca")}
                  </Typography>
                  <div>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      {dateState.date}
                    </Typography>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      {dateState.heur}
                    </Typography>
                  </div>
                </div>
                {/* la localisation & la date */}
                <hr />
                {/* degrer & description */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <div>
                    {/* temperature */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h2">{dataState.temp}</Typography>
                      {/*image */}
                      <img src={dataState.icon} alt="icon" />
                    </div>
                    <Typography variant="h6" style={{ fontWeight: "600" }}>
                      {t(dataState.description)}
                    </Typography>
                    <Typography style={{ fontWeight: "300" }}>
                      {t("max")}: {dataState.tempmax} | {t("min")}:
                      {dataState.tempmin}
                    </Typography>
                    {/* temperature */}
                  </div>
                  <CloudQueueIcon style={{ fontSize: "125px" }} />
                </div>
                {/* degrer & description */}
              </div>
              {/* card content */}
            </div>
            {/* card */}
            <div
              style={{
                color: "white",
                marginTop: "5vh",
                fontWeight: "600",
                backgroundColor: "#1661e2",
                borderRadius: "20%",
                boxShadow: "10px 5px #002465",
              }}
            >
              <Button
                onClick={changerLangue}
                variant="text"
                style={{
                  color: "white",
                  fontSize: "20px",
                }}
              >
                {traduction === "en" ? "Arabic" : "إنجليزي"}
              </Button>
            </div>
          </div>
          {/* content contnaire */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
