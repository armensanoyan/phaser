const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');
const process = require('process');
const { exec } = require('child_process');
const util = require('util');
const { concatenateVideos } = require('./concat-videos.js');
const execPromise = util.promisify(exec);
const {outputRelativePath} = require('../config')


async function runPhaserGame() {
  console.time('runPhaserGame')
  console.time('runPuppeteer')
  const browser = await puppeteer.launch({
    headless: false, // Set to true to run headlessly
    devtools: true,
    protocolTimeout: 600000,
    defaultViewport: null,
  });
  console.timeEnd('runPuppeteer')

    const page = await browser.newPage();

    page.on('console', async (msg) => {
      const text = msg.text();
      console.log({console: text});
  });

    // Load the Phaser game
    await page.goto(`http://localhost:3000/index.html`);
    const url = 'http://localhost:3000/hy.mp4'
    
    const result = await page.evaluate(async (url) => {
      const response = await fetch(url)
      const buffer = await response.arrayBuffer();
      
      try {
      const job = {
        id: "testJob",
        canvasObjects: [{
          id: "test",
          x: 960,
          y: 540,
          type: "caption",
          startAt: 0,
          endsAt: 9000,
          animations: [],
          visible: true,
          scaleX: 1,
          scaleY: 1,
          width: 0,
          height: 0,
          metadata:  {
            styleData: {
              id: 1,
              animation: "appear",
              layout: "verse",
              positionX: "left",
              positionY: "bottom",
              backgroundColor: "#000000",
              backgroundOpacity: 0.5,
              textColor: "#FF0000",
              textHighlightColor: "#FF0000",
              shadowColor: "#FF0000",
              isTextHighlighted: false,
              fontData: {
                id: 123,
                name: "Arial",
                path: "https://...",
                characterSize: 24,
              },
              fontScale: 1.2,
            },
            texts: [
              {
                "text": "When the pimpps in the grib ma Drop it like it's hot Drop it like",
                "startTime": "00:00:00.340",
                "endTime": "00:00:26.770",
                "words": [
                  {
                    "word": "When",
                    "startTime": "00:00:00.340",
                    "endTime": "00:00:23.500"
                  },
                  {
                    "word": "the",
                    "startTime": "00:00:23.540",
                    "endTime": "00:00:23.690"
                  },
                  {
                    "word": "pimpps",
                    "startTime": "00:00:23.710",
                    "endTime": "00:00:23.970"
                  },
                  {
                    "word": "in",
                    "startTime": "00:00:23.990",
                    "endTime": "00:00:24.130"
                  },
                  {
                    "word": "the",
                    "startTime": "00:00:24.150",
                    "endTime": "00:00:24.310"
                  },
                  {
                    "word": "grib",
                    "startTime": "00:00:24.340",
                    "endTime": "00:00:24.580"
                  },
                  {
                    "word": "ma",
                    "startTime": "00:00:24.640",
                    "endTime": "00:00:24.900"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:00:24.960",
                    "endTime": "00:00:25.130"
                  },
                  {
                    "word": "it",
                    "startTime": "00:00:25.150",
                    "endTime": "00:00:25.290"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:25.310",
                    "endTime": "00:00:25.450"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:00:25.470",
                    "endTime": "00:00:25.660"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:00:25.680",
                    "endTime": "00:00:26.070"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:00:26.180",
                    "endTime": "00:00:26.430"
                  },
                  {
                    "word": "it",
                    "startTime": "00:00:26.460",
                    "endTime": "00:00:26.610"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:26.630",
                    "endTime": "00:00:26.770"
                  }
                ]
              },
              {
                "text": "it's hot Drop it like it's hot the pigs try to get at you",
                "startTime": "00:00:26.790",
                "endTime": "00:00:30.100",
                "words": [
                  {
                    "word": "it's",
                    "startTime": "00:00:26.790",
                    "endTime": "00:00:26.980"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:00:27.000",
                    "endTime": "00:00:27.390"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:00:27.500",
                    "endTime": "00:00:27.750"
                  },
                  {
                    "word": "it",
                    "startTime": "00:00:27.780",
                    "endTime": "00:00:27.930"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:27.950",
                    "endTime": "00:00:28.090"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:00:28.110",
                    "endTime": "00:00:28.290"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:00:28.310",
                    "endTime": "00:00:28.610"
                  },
                  {
                    "word": "the",
                    "startTime": "00:00:28.700",
                    "endTime": "00:00:28.890"
                  },
                  {
                    "word": "pigs",
                    "startTime": "00:00:28.910",
                    "endTime": "00:00:29.180"
                  },
                  {
                    "word": "try",
                    "startTime": "00:00:29.210",
                    "endTime": "00:00:29.370"
                  },
                  {
                    "word": "to",
                    "startTime": "00:00:29.390",
                    "endTime": "00:00:29.530"
                  },
                  {
                    "word": "get",
                    "startTime": "00:00:29.550",
                    "endTime": "00:00:29.690"
                  },
                  {
                    "word": "at",
                    "startTime": "00:00:29.710",
                    "endTime": "00:00:29.850"
                  },
                  {
                    "word": "you",
                    "startTime": "00:00:29.870",
                    "endTime": "00:00:30.100"
                  }
                ]
              },
              {
                "text": "po it like it's hot park it like hot park it like it's hot",
                "startTime": "00:00:30.160",
                "endTime": "00:00:34.080",
                "words": [
                  {
                    "word": "po",
                    "startTime": "00:00:30.160",
                    "endTime": "00:00:30.330"
                  },
                  {
                    "word": "it",
                    "startTime": "00:00:30.350",
                    "endTime": "00:00:30.490"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:30.510",
                    "endTime": "00:00:30.650"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:00:30.670",
                    "endTime": "00:00:30.850"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:00:30.870",
                    "endTime": "00:00:31.300"
                  },
                  {
                    "word": "park",
                    "startTime": "00:00:31.410",
                    "endTime": "00:00:31.620"
                  },
                  {
                    "word": "it",
                    "startTime": "00:00:31.640",
                    "endTime": "00:00:31.740"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:31.760",
                    "endTime": "00:00:32.070"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:00:32.160",
                    "endTime": "00:00:32.620"
                  },
                  {
                    "word": "park",
                    "startTime": "00:00:32.730",
                    "endTime": "00:00:32.960"
                  },
                  {
                    "word": "it",
                    "startTime": "00:00:32.980",
                    "endTime": "00:00:33.120"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:33.140",
                    "endTime": "00:00:33.280"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:00:33.300",
                    "endTime": "00:00:33.450"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:00:33.470",
                    "endTime": "00:00:34.080"
                  }
                ]
              },
              {
                "text": "Get a attitude Pop it like it's hot Pop it like it's hot Pop",
                "startTime": "00:00:34.260",
                "endTime": "00:00:38.160",
                "words": [
                  {
                    "word": "Get",
                    "startTime": "00:00:34.260",
                    "endTime": "00:00:34.560"
                  },
                  {
                    "word": "a",
                    "startTime": "00:00:34.580",
                    "endTime": "00:00:34.720"
                  },
                  {
                    "word": "attitude",
                    "startTime": "00:00:34.740",
                    "endTime": "00:00:35.290"
                  },
                  {
                    "word": "Pop",
                    "startTime": "00:00:35.350",
                    "endTime": "00:00:35.520"
                  },
                  {
                    "word": "it",
                    "startTime": "00:00:35.540",
                    "endTime": "00:00:35.680"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:35.700",
                    "endTime": "00:00:35.840"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:00:35.860",
                    "endTime": "00:00:36.050"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:00:36.070",
                    "endTime": "00:00:36.480"
                  },
                  {
                    "word": "Pop",
                    "startTime": "00:00:36.600",
                    "endTime": "00:00:36.840"
                  },
                  {
                    "word": "it",
                    "startTime": "00:00:36.860",
                    "endTime": "00:00:37.000"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:37.020",
                    "endTime": "00:00:37.160"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:00:37.180",
                    "endTime": "00:00:37.370"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:00:37.390",
                    "endTime": "00:00:37.800"
                  },
                  {
                    "word": "Pop",
                    "startTime": "00:00:37.920",
                    "endTime": "00:00:38.160"
                  }
                ]
              },
              {
                "text": "it like it's hot I got the ro of your my and I'm pouring shan",
                "startTime": "00:00:38.180",
                "endTime": "00:00:41.250",
                "words": [
                  {
                    "word": "it",
                    "startTime": "00:00:38.180",
                    "endTime": "00:00:38.320"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:38.340",
                    "endTime": "00:00:38.480"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:00:38.500",
                    "endTime": "00:00:38.650"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:00:38.670",
                    "endTime": "00:00:38.800"
                  },
                  {
                    "word": "I",
                    "startTime": "00:00:38.820",
                    "endTime": "00:00:38.980"
                  },
                  {
                    "word": "got",
                    "startTime": "00:00:39.010",
                    "endTime": "00:00:39.130"
                  },
                  {
                    "word": "the",
                    "startTime": "00:00:39.150",
                    "endTime": "00:00:39.280"
                  },
                  {
                    "word": "ro",
                    "startTime": "00:00:39.300",
                    "endTime": "00:00:39.460"
                  },
                  {
                    "word": "of",
                    "startTime": "00:00:39.490",
                    "endTime": "00:00:39.590"
                  },
                  {
                    "word": "your",
                    "startTime": "00:00:39.600",
                    "endTime": "00:00:39.770"
                  },
                  {
                    "word": "my",
                    "startTime": "00:00:39.800",
                    "endTime": "00:00:40.150"
                  },
                  {
                    "word": "and",
                    "startTime": "00:00:40.240",
                    "endTime": "00:00:40.410"
                  },
                  {
                    "word": "I'm",
                    "startTime": "00:00:40.430",
                    "endTime": "00:00:40.620"
                  },
                  {
                    "word": "pouring",
                    "startTime": "00:00:40.650",
                    "endTime": "00:00:40.930"
                  },
                  {
                    "word": "shan",
                    "startTime": "00:00:40.990",
                    "endTime": "00:00:41.250"
                  }
                ]
              },
              {
                "text": "down and the little cause I got ita go I'm",
                "startTime": "00:00:41.310",
                "endTime": "00:00:45.000",
                "words": [
                  {
                    "word": "down",
                    "startTime": "00:00:41.310",
                    "endTime": "00:00:41.550"
                  },
                  {
                    "word": "and",
                    "startTime": "00:00:41.600",
                    "endTime": "00:00:41.760"
                  },
                  {
                    "word": "the",
                    "startTime": "00:00:41.780",
                    "endTime": "00:00:42.010"
                  },
                  {
                    "word": "little",
                    "startTime": "00:00:42.070",
                    "endTime": "00:00:42.620"
                  },
                  {
                    "word": "cause",
                    "startTime": "00:00:42.770",
                    "endTime": "00:00:43.080"
                  },
                  {
                    "word": "I",
                    "startTime": "00:00:43.100",
                    "endTime": "00:00:43.260"
                  },
                  {
                    "word": "got",
                    "startTime": "00:00:43.290",
                    "endTime": "00:00:43.410"
                  },
                  {
                    "word": "ita",
                    "startTime": "00:00:43.430",
                    "endTime": "00:00:43.560"
                  },
                  {
                    "word": "go",
                    "startTime": "00:00:43.580",
                    "endTime": "00:00:44.150"
                  },
                  {
                    "word": "I'm",
                    "startTime": "00:00:44.650",
                    "endTime": "00:00:45.000"
                  }
                ]
              },
              {
                "text": "a nice dude what's some nice dream y c these ice cubes",
                "startTime": "00:00:45.020",
                "endTime": "00:00:48.560",
                "words": [
                  {
                    "word": "a",
                    "startTime": "00:00:45.020",
                    "endTime": "00:00:45.160"
                  },
                  {
                    "word": "nice",
                    "startTime": "00:00:45.180",
                    "endTime": "00:00:45.410"
                  },
                  {
                    "word": "dude",
                    "startTime": "00:00:45.470",
                    "endTime": "00:00:45.940"
                  },
                  {
                    "word": "what's",
                    "startTime": "00:00:46.050",
                    "endTime": "00:00:46.290"
                  },
                  {
                    "word": "some",
                    "startTime": "00:00:46.310",
                    "endTime": "00:00:46.480"
                  },
                  {
                    "word": "nice",
                    "startTime": "00:00:46.520",
                    "endTime": "00:00:46.750"
                  },
                  {
                    "word": "dream",
                    "startTime": "00:00:46.800",
                    "endTime": "00:00:47.070"
                  },
                  {
                    "word": "y",
                    "startTime": "00:00:47.120",
                    "endTime": "00:00:47.370"
                  },
                  {
                    "word": "c",
                    "startTime": "00:00:47.430",
                    "endTime": "00:00:47.600"
                  },
                  {
                    "word": "these",
                    "startTime": "00:00:47.620",
                    "endTime": "00:00:47.800"
                  },
                  {
                    "word": "ice",
                    "startTime": "00:00:47.840",
                    "endTime": "00:00:48.070"
                  },
                  {
                    "word": "cubes",
                    "startTime": "00:00:48.120",
                    "endTime": "00:00:48.560"
                  }
                ]
              },
              {
                "text": "CDS ice creams elig bachelor million dollar",
                "startTime": "00:00:48.660",
                "endTime": "00:00:51.980",
                "words": [
                  {
                    "word": "CDS",
                    "startTime": "00:00:48.660",
                    "endTime": "00:00:49.070"
                  },
                  {
                    "word": "ice",
                    "startTime": "00:00:49.120",
                    "endTime": "00:00:49.350"
                  },
                  {
                    "word": "creams",
                    "startTime": "00:00:49.400",
                    "endTime": "00:00:49.740"
                  },
                  {
                    "word": "elig",
                    "startTime": "00:00:49.810",
                    "endTime": "00:00:50.290"
                  },
                  {
                    "word": "bachelor",
                    "startTime": "00:00:50.390",
                    "endTime": "00:00:51.130"
                  },
                  {
                    "word": "million",
                    "startTime": "00:00:51.240",
                    "endTime": "00:00:51.570"
                  },
                  {
                    "word": "dollar",
                    "startTime": "00:00:51.630",
                    "endTime": "00:00:51.980"
                  }
                ]
              },
              {
                "text": "bow that's whiter than what'you throw a",
                "startTime": "00:00:52.010",
                "endTime": "00:00:55.300",
                "words": [
                  {
                    "word": "bow",
                    "startTime": "00:00:52.010",
                    "endTime": "00:00:52.480"
                  },
                  {
                    "word": "that's",
                    "startTime": "00:00:52.600",
                    "endTime": "00:00:52.990"
                  },
                  {
                    "word": "whiter",
                    "startTime": "00:00:53.040",
                    "endTime": "00:00:53.320"
                  },
                  {
                    "word": "than",
                    "startTime": "00:00:53.340",
                    "endTime": "00:00:53.600"
                  },
                  {
                    "word": "what'you",
                    "startTime": "00:00:53.660",
                    "endTime": "00:00:54.650"
                  },
                  {
                    "word": "throw",
                    "startTime": "00:00:54.690",
                    "endTime": "00:00:55.010"
                  },
                  {
                    "word": "a",
                    "startTime": "00:00:55.090",
                    "endTime": "00:00:55.300"
                  }
                ]
              },
              {
                "text": "phantom exterior like forag the interior like",
                "startTime": "00:00:55.330",
                "endTime": "00:00:59.180",
                "words": [
                  {
                    "word": "phantom",
                    "startTime": "00:00:55.330",
                    "endTime": "00:00:55.880"
                  },
                  {
                    "word": "exterior",
                    "startTime": "00:00:55.980",
                    "endTime": "00:00:56.670"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:56.720",
                    "endTime": "00:00:56.900"
                  },
                  {
                    "word": "forag",
                    "startTime": "00:00:56.930",
                    "endTime": "00:00:57.380"
                  },
                  {
                    "word": "the",
                    "startTime": "00:00:57.450",
                    "endTime": "00:00:57.800"
                  },
                  {
                    "word": "interior",
                    "startTime": "00:00:57.880",
                    "endTime": "00:00:58.450"
                  },
                  {
                    "word": "like",
                    "startTime": "00:00:58.520",
                    "endTime": "00:00:59.180"
                  }
                ]
              },
              {
                "text": "that's ra I can exercise you this could be your ph cheat",
                "startTime": "00:00:59.360",
                "endTime": "00:01:3.080",
                "words": [
                  {
                    "word": "that's",
                    "startTime": "00:00:59.360",
                    "endTime": "00:00:59.710"
                  },
                  {
                    "word": "ra",
                    "startTime": "00:00:59.740",
                    "endTime": "00:01:0.050"
                  },
                  {
                    "word": "I",
                    "startTime": "00:01:0.130",
                    "endTime": "00:01:0.330"
                  },
                  {
                    "word": "can",
                    "startTime": "00:01:0.350",
                    "endTime": "00:01:0.490"
                  },
                  {
                    "word": "exercise",
                    "startTime": "00:01:0.510",
                    "endTime": "00:01:1.060"
                  },
                  {
                    "word": "you",
                    "startTime": "00:01:1.120",
                    "endTime": "00:01:1.410"
                  },
                  {
                    "word": "this",
                    "startTime": "00:01:1.470",
                    "endTime": "00:01:1.650"
                  },
                  {
                    "word": "could",
                    "startTime": "00:01:1.670",
                    "endTime": "00:01:1.810"
                  },
                  {
                    "word": "be",
                    "startTime": "00:01:1.830",
                    "endTime": "00:01:1.940"
                  },
                  {
                    "word": "your",
                    "startTime": "00:01:1.960",
                    "endTime": "00:01:2.110"
                  },
                  {
                    "word": "ph",
                    "startTime": "00:01:2.140",
                    "endTime": "00:01:2.620"
                  },
                  {
                    "word": "cheat",
                    "startTime": "00:01:2.760",
                    "endTime": "00:01:3.080"
                  }
                ]
              },
              {
                "text": "on your MA1 that's how you get it killer with the be I",
                "startTime": "00:01:3.130",
                "endTime": "00:01:6.490",
                "words": [
                  {
                    "word": "on",
                    "startTime": "00:01:3.130",
                    "endTime": "00:01:3.290"
                  },
                  {
                    "word": "your",
                    "startTime": "00:01:3.310",
                    "endTime": "00:01:3.470"
                  },
                  {
                    "word": "MA1",
                    "startTime": "00:01:3.500",
                    "endTime": "00:01:3.890"
                  },
                  {
                    "word": "that's",
                    "startTime": "00:01:3.910",
                    "endTime": "00:01:4.090"
                  },
                  {
                    "word": "how",
                    "startTime": "00:01:4.110",
                    "endTime": "00:01:4.220"
                  },
                  {
                    "word": "you",
                    "startTime": "00:01:4.240",
                    "endTime": "00:01:4.390"
                  },
                  {
                    "word": "get",
                    "startTime": "00:01:4.420",
                    "endTime": "00:01:4.570"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:4.590",
                    "endTime": "00:01:5.110"
                  },
                  {
                    "word": "killer",
                    "startTime": "00:01:5.260",
                    "endTime": "00:01:5.690"
                  },
                  {
                    "word": "with",
                    "startTime": "00:01:5.730",
                    "endTime": "00:01:5.890"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:5.910",
                    "endTime": "00:01:6.070"
                  },
                  {
                    "word": "be",
                    "startTime": "00:01:6.100",
                    "endTime": "00:01:6.300"
                  },
                  {
                    "word": "I",
                    "startTime": "00:01:6.330",
                    "endTime": "00:01:6.490"
                  }
                ]
              },
              {
                "text": "know killers in the street with the to make you feel like chinchilla and the",
                "startTime": "00:01:6.510",
                "endTime": "00:01:9.970",
                "words": [
                  {
                    "word": "know",
                    "startTime": "00:01:6.510",
                    "endTime": "00:01:6.650"
                  },
                  {
                    "word": "killers",
                    "startTime": "00:01:6.670",
                    "endTime": "00:01:6.970"
                  },
                  {
                    "word": "in",
                    "startTime": "00:01:7.020",
                    "endTime": "00:01:7.170"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:7.190",
                    "endTime": "00:01:7.350"
                  },
                  {
                    "word": "street",
                    "startTime": "00:01:7.380",
                    "endTime": "00:01:7.620"
                  },
                  {
                    "word": "with",
                    "startTime": "00:01:7.680",
                    "endTime": "00:01:7.820"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:7.840",
                    "endTime": "00:01:8.090"
                  },
                  {
                    "word": "to",
                    "startTime": "00:01:8.150",
                    "endTime": "00:01:8.330"
                  },
                  {
                    "word": "make",
                    "startTime": "00:01:8.350",
                    "endTime": "00:01:8.490"
                  },
                  {
                    "word": "you",
                    "startTime": "00:01:8.510",
                    "endTime": "00:01:8.670"
                  },
                  {
                    "word": "feel",
                    "startTime": "00:01:8.700",
                    "endTime": "00:01:8.920"
                  },
                  {
                    "word": "like",
                    "startTime": "00:01:8.970",
                    "endTime": "00:01:9.130"
                  },
                  {
                    "word": "chinchilla",
                    "startTime": "00:01:9.150",
                    "endTime": "00:01:9.630"
                  },
                  {
                    "word": "and",
                    "startTime": "00:01:9.660",
                    "endTime": "00:01:9.810"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:9.830",
                    "endTime": "00:01:9.970"
                  }
                ]
              },
              {
                "text": "haat so don't try to run up on my ear talking all that raspy",
                "startTime": "00:01:9.990",
                "endTime": "00:01:13.970",
                "words": [
                  {
                    "word": "haat",
                    "startTime": "00:01:9.990",
                    "endTime": "00:01:10.300"
                  },
                  {
                    "word": "so",
                    "startTime": "00:01:10.380",
                    "endTime": "00:01:10.590"
                  },
                  {
                    "word": "don't",
                    "startTime": "00:01:10.620",
                    "endTime": "00:01:10.880"
                  },
                  {
                    "word": "try",
                    "startTime": "00:01:10.930",
                    "endTime": "00:01:11.090"
                  },
                  {
                    "word": "to",
                    "startTime": "00:01:11.110",
                    "endTime": "00:01:11.250"
                  },
                  {
                    "word": "run",
                    "startTime": "00:01:11.270",
                    "endTime": "00:01:11.410"
                  },
                  {
                    "word": "up",
                    "startTime": "00:01:11.430",
                    "endTime": "00:01:11.570"
                  },
                  {
                    "word": "on",
                    "startTime": "00:01:11.590",
                    "endTime": "00:01:11.730"
                  },
                  {
                    "word": "my",
                    "startTime": "00:01:11.750",
                    "endTime": "00:01:11.910"
                  },
                  {
                    "word": "ear",
                    "startTime": "00:01:11.940",
                    "endTime": "00:01:12.160"
                  },
                  {
                    "word": "talking",
                    "startTime": "00:01:12.210",
                    "endTime": "00:01:12.600"
                  },
                  {
                    "word": "all",
                    "startTime": "00:01:12.650",
                    "endTime": "00:01:12.860"
                  },
                  {
                    "word": "that",
                    "startTime": "00:01:12.890",
                    "endTime": "00:01:13.170"
                  },
                  {
                    "word": "raspy",
                    "startTime": "00:01:13.230",
                    "endTime": "00:01:13.970"
                  }
                ]
              },
              {
                "text": "trying to ask me when my big thing gonn",
                "startTime": "00:01:14.110",
                "endTime": "00:01:17.150",
                "words": [
                  {
                    "word": "trying",
                    "startTime": "00:01:14.110",
                    "endTime": "00:01:14.370"
                  },
                  {
                    "word": "to",
                    "startTime": "00:01:14.390",
                    "endTime": "00:01:14.530"
                  },
                  {
                    "word": "ask",
                    "startTime": "00:01:14.550",
                    "endTime": "00:01:14.730"
                  },
                  {
                    "word": "me",
                    "startTime": "00:01:14.780",
                    "endTime": "00:01:15.260"
                  },
                  {
                    "word": "when",
                    "startTime": "00:01:15.400",
                    "endTime": "00:01:15.650"
                  },
                  {
                    "word": "my",
                    "startTime": "00:01:15.670",
                    "endTime": "00:01:16.000"
                  },
                  {
                    "word": "big",
                    "startTime": "00:01:16.090",
                    "endTime": "00:01:16.500"
                  },
                  {
                    "word": "thing",
                    "startTime": "00:01:16.600",
                    "endTime": "00:01:16.860"
                  },
                  {
                    "word": "gonn",
                    "startTime": "00:01:16.890",
                    "endTime": "00:01:17.150"
                  }
                ]
              },
              {
                "text": "pass me you should think about it take a second matter of",
                "startTime": "00:01:17.180",
                "endTime": "00:01:21.050",
                "words": [
                  {
                    "word": "pass",
                    "startTime": "00:01:17.180",
                    "endTime": "00:01:17.350"
                  },
                  {
                    "word": "me",
                    "startTime": "00:01:17.380",
                    "endTime": "00:01:17.840"
                  },
                  {
                    "word": "you",
                    "startTime": "00:01:17.970",
                    "endTime": "00:01:18.180"
                  },
                  {
                    "word": "should",
                    "startTime": "00:01:18.200",
                    "endTime": "00:01:18.380"
                  },
                  {
                    "word": "think",
                    "startTime": "00:01:18.420",
                    "endTime": "00:01:18.660"
                  },
                  {
                    "word": "about",
                    "startTime": "00:01:18.720",
                    "endTime": "00:01:18.860"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:18.880",
                    "endTime": "00:01:19.220"
                  },
                  {
                    "word": "take",
                    "startTime": "00:01:19.320",
                    "endTime": "00:01:19.530"
                  },
                  {
                    "word": "a",
                    "startTime": "00:01:19.550",
                    "endTime": "00:01:19.690"
                  },
                  {
                    "word": "second",
                    "startTime": "00:01:19.710",
                    "endTime": "00:01:20.280"
                  },
                  {
                    "word": "matter",
                    "startTime": "00:01:20.580",
                    "endTime": "00:01:20.890"
                  },
                  {
                    "word": "of",
                    "startTime": "00:01:20.910",
                    "endTime": "00:01:21.050"
                  }
                ]
              },
              {
                "text": "fact, you should take 4, 3 and think before you",
                "startTime": "00:01:21.070",
                "endTime": "00:01:24.370",
                "words": [
                  {
                    "word": "fact,",
                    "startTime": "00:01:21.070",
                    "endTime": "00:01:21.660"
                  },
                  {
                    "word": "you",
                    "startTime": "00:01:21.840",
                    "endTime": "00:01:22.130"
                  },
                  {
                    "word": "should",
                    "startTime": "00:01:22.150",
                    "endTime": "00:01:22.310"
                  },
                  {
                    "word": "take",
                    "startTime": "00:01:22.340",
                    "endTime": "00:01:22.580"
                  },
                  {
                    "word": "4,",
                    "startTime": "00:01:22.640",
                    "endTime": "00:01:22.940"
                  },
                  {
                    "word": "3",
                    "startTime": "00:01:23.010",
                    "endTime": "00:01:23.320"
                  },
                  {
                    "word": "and",
                    "startTime": "00:01:23.410",
                    "endTime": "00:01:23.610"
                  },
                  {
                    "word": "think",
                    "startTime": "00:01:23.630",
                    "endTime": "00:01:23.860"
                  },
                  {
                    "word": "before",
                    "startTime": "00:01:23.920",
                    "endTime": "00:01:24.090"
                  },
                  {
                    "word": "you",
                    "startTime": "00:01:24.110",
                    "endTime": "00:01:24.370"
                  }
                ]
              },
              {
                "text": "a little skateboard when the pimps in the grib ma Drop it",
                "startTime": "00:01:24.430",
                "endTime": "00:01:27.890",
                "words": [
                  {
                    "word": "a",
                    "startTime": "00:01:24.430",
                    "endTime": "00:01:24.610"
                  },
                  {
                    "word": "little",
                    "startTime": "00:01:24.630",
                    "endTime": "00:01:24.860"
                  },
                  {
                    "word": "skateboard",
                    "startTime": "00:01:24.920",
                    "endTime": "00:01:25.720"
                  },
                  {
                    "word": "when",
                    "startTime": "00:01:25.850",
                    "endTime": "00:01:26.110"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:26.140",
                    "endTime": "00:01:26.310"
                  },
                  {
                    "word": "pimps",
                    "startTime": "00:01:26.340",
                    "endTime": "00:01:26.550"
                  },
                  {
                    "word": "in",
                    "startTime": "00:01:26.580",
                    "endTime": "00:01:26.730"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:26.750",
                    "endTime": "00:01:26.910"
                  },
                  {
                    "word": "grib",
                    "startTime": "00:01:26.940",
                    "endTime": "00:01:27.180"
                  },
                  {
                    "word": "ma",
                    "startTime": "00:01:27.240",
                    "endTime": "00:01:27.500"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:01:27.560",
                    "endTime": "00:01:27.730"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:27.750",
                    "endTime": "00:01:27.890"
                  }
                ]
              },
              {
                "text": "like it's hot Drop it like it's hot Drop it like it's hard when",
                "startTime": "00:01:27.910",
                "endTime": "00:01:31.360",
                "words": [
                  {
                    "word": "like",
                    "startTime": "00:01:27.910",
                    "endTime": "00:01:28.050"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:01:28.070",
                    "endTime": "00:01:28.260"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:01:28.280",
                    "endTime": "00:01:28.670"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:01:28.780",
                    "endTime": "00:01:29.030"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:29.060",
                    "endTime": "00:01:29.210"
                  },
                  {
                    "word": "like",
                    "startTime": "00:01:29.230",
                    "endTime": "00:01:29.370"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:01:29.390",
                    "endTime": "00:01:29.580"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:01:29.600",
                    "endTime": "00:01:29.990"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:01:30.100",
                    "endTime": "00:01:30.350"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:30.380",
                    "endTime": "00:01:30.530"
                  },
                  {
                    "word": "like",
                    "startTime": "00:01:30.550",
                    "endTime": "00:01:30.690"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:01:30.710",
                    "endTime": "00:01:30.860"
                  },
                  {
                    "word": "hard",
                    "startTime": "00:01:30.880",
                    "endTime": "00:01:31.120"
                  },
                  {
                    "word": "when",
                    "startTime": "00:01:31.180",
                    "endTime": "00:01:31.360"
                  }
                ]
              },
              {
                "text": "the pigs try to get at you park it like it's hot park it like",
                "startTime": "00:01:31.380",
                "endTime": "00:01:34.560",
                "words": [
                  {
                    "word": "the",
                    "startTime": "00:01:31.380",
                    "endTime": "00:01:31.520"
                  },
                  {
                    "word": "pigs",
                    "startTime": "00:01:31.540",
                    "endTime": "00:01:31.810"
                  },
                  {
                    "word": "try",
                    "startTime": "00:01:31.840",
                    "endTime": "00:01:32.000"
                  },
                  {
                    "word": "to",
                    "startTime": "00:01:32.020",
                    "endTime": "00:01:32.160"
                  },
                  {
                    "word": "get",
                    "startTime": "00:01:32.180",
                    "endTime": "00:01:32.320"
                  },
                  {
                    "word": "at",
                    "startTime": "00:01:32.340",
                    "endTime": "00:01:32.450"
                  },
                  {
                    "word": "you",
                    "startTime": "00:01:32.470",
                    "endTime": "00:01:32.720"
                  },
                  {
                    "word": "park",
                    "startTime": "00:01:32.780",
                    "endTime": "00:01:32.960"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:32.980",
                    "endTime": "00:01:33.120"
                  },
                  {
                    "word": "like",
                    "startTime": "00:01:33.140",
                    "endTime": "00:01:33.280"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:01:33.300",
                    "endTime": "00:01:33.450"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:01:33.470",
                    "endTime": "00:01:33.910"
                  },
                  {
                    "word": "park",
                    "startTime": "00:01:34.040",
                    "endTime": "00:01:34.280"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:34.300",
                    "endTime": "00:01:34.410"
                  },
                  {
                    "word": "like",
                    "startTime": "00:01:34.430",
                    "endTime": "00:01:34.560"
                  }
                ]
              },
              {
                "text": "it's hot park it like it's hot Get a attitude",
                "startTime": "00:01:34.580",
                "endTime": "00:01:37.910",
                "words": [
                  {
                    "word": "it's",
                    "startTime": "00:01:34.580",
                    "endTime": "00:01:34.730"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:01:34.750",
                    "endTime": "00:01:35.190"
                  },
                  {
                    "word": "park",
                    "startTime": "00:01:35.320",
                    "endTime": "00:01:35.560"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:35.580",
                    "endTime": "00:01:35.720"
                  },
                  {
                    "word": "like",
                    "startTime": "00:01:35.740",
                    "endTime": "00:01:35.880"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:01:35.900",
                    "endTime": "00:01:36.050"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:01:36.070",
                    "endTime": "00:01:36.680"
                  },
                  {
                    "word": "Get",
                    "startTime": "00:01:36.860",
                    "endTime": "00:01:37.160"
                  },
                  {
                    "word": "a",
                    "startTime": "00:01:37.180",
                    "endTime": "00:01:37.320"
                  },
                  {
                    "word": "attitude",
                    "startTime": "00:01:37.340",
                    "endTime": "00:01:37.910"
                  }
                ]
              },
              {
                "text": "Pop it like it's hot Pop it like it't pop it like it's",
                "startTime": "00:01:37.960",
                "endTime": "00:01:41.250",
                "words": [
                  {
                    "word": "Pop",
                    "startTime": "00:01:37.960",
                    "endTime": "00:01:38.120"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:38.140",
                    "endTime": "00:01:38.280"
                  },
                  {
                    "word": "like",
                    "startTime": "00:01:38.300",
                    "endTime": "00:01:38.440"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:01:38.460",
                    "endTime": "00:01:38.650"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:01:38.670",
                    "endTime": "00:01:39.080"
                  },
                  {
                    "word": "Pop",
                    "startTime": "00:01:39.200",
                    "endTime": "00:01:39.440"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:39.460",
                    "endTime": "00:01:39.620"
                  },
                  {
                    "word": "like",
                    "startTime": "00:01:39.650",
                    "endTime": "00:01:39.800"
                  },
                  {
                    "word": "it't",
                    "startTime": "00:01:39.820",
                    "endTime": "00:01:40.390"
                  },
                  {
                    "word": "pop",
                    "startTime": "00:01:40.520",
                    "endTime": "00:01:40.760"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:40.780",
                    "endTime": "00:01:40.920"
                  },
                  {
                    "word": "like",
                    "startTime": "00:01:40.940",
                    "endTime": "00:01:41.080"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:01:41.100",
                    "endTime": "00:01:41.250"
                  }
                ]
              },
              {
                "text": "t I got the rul your my arm and I'm po shan down and I'm",
                "startTime": "00:01:41.270",
                "endTime": "00:01:44.600",
                "words": [
                  {
                    "word": "t",
                    "startTime": "00:01:41.270",
                    "endTime": "00:01:41.420"
                  },
                  {
                    "word": "I",
                    "startTime": "00:01:41.450",
                    "endTime": "00:01:41.600"
                  },
                  {
                    "word": "got",
                    "startTime": "00:01:41.620",
                    "endTime": "00:01:41.760"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:41.780",
                    "endTime": "00:01:41.890"
                  },
                  {
                    "word": "rul",
                    "startTime": "00:01:41.910",
                    "endTime": "00:01:42.130"
                  },
                  {
                    "word": "your",
                    "startTime": "00:01:42.190",
                    "endTime": "00:01:42.410"
                  },
                  {
                    "word": "my",
                    "startTime": "00:01:42.440",
                    "endTime": "00:01:42.620"
                  },
                  {
                    "word": "arm",
                    "startTime": "00:01:42.650",
                    "endTime": "00:01:42.860"
                  },
                  {
                    "word": "and",
                    "startTime": "00:01:42.890",
                    "endTime": "00:01:43.040"
                  },
                  {
                    "word": "I'm",
                    "startTime": "00:01:43.060",
                    "endTime": "00:01:43.240"
                  },
                  {
                    "word": "po",
                    "startTime": "00:01:43.260",
                    "endTime": "00:01:43.520"
                  },
                  {
                    "word": "shan",
                    "startTime": "00:01:43.580",
                    "endTime": "00:01:43.850"
                  },
                  {
                    "word": "down",
                    "startTime": "00:01:43.910",
                    "endTime": "00:01:44.150"
                  },
                  {
                    "word": "and",
                    "startTime": "00:01:44.200",
                    "endTime": "00:01:44.360"
                  },
                  {
                    "word": "I'm",
                    "startTime": "00:01:44.380",
                    "endTime": "00:01:44.600"
                  }
                ]
              },
              {
                "text": "p the best cause I got it going on I'm a",
                "startTime": "00:01:44.620",
                "endTime": "00:01:47.840",
                "words": [
                  {
                    "word": "p",
                    "startTime": "00:01:44.620",
                    "endTime": "00:01:44.760"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:44.780",
                    "endTime": "00:01:44.890"
                  },
                  {
                    "word": "best",
                    "startTime": "00:01:44.910",
                    "endTime": "00:01:45.300"
                  },
                  {
                    "word": "cause",
                    "startTime": "00:01:45.410",
                    "endTime": "00:01:45.680"
                  },
                  {
                    "word": "I",
                    "startTime": "00:01:45.700",
                    "endTime": "00:01:45.860"
                  },
                  {
                    "word": "got",
                    "startTime": "00:01:45.890",
                    "endTime": "00:01:46.010"
                  },
                  {
                    "word": "it",
                    "startTime": "00:01:46.030",
                    "endTime": "00:01:46.160"
                  },
                  {
                    "word": "going",
                    "startTime": "00:01:46.180",
                    "endTime": "00:01:46.460"
                  },
                  {
                    "word": "on",
                    "startTime": "00:01:46.530",
                    "endTime": "00:01:47.170"
                  },
                  {
                    "word": "I'm",
                    "startTime": "00:01:47.350",
                    "endTime": "00:01:47.650"
                  },
                  {
                    "word": "a",
                    "startTime": "00:01:47.670",
                    "endTime": "00:01:47.840"
                  }
                ]
              },
              {
                "text": "gangster but y'all knew that the big boss dog yeah, I had",
                "startTime": "00:01:47.890",
                "endTime": "00:01:51.530",
                "words": [
                  {
                    "word": "gangster",
                    "startTime": "00:01:47.890",
                    "endTime": "00:01:48.490"
                  },
                  {
                    "word": "but",
                    "startTime": "00:01:48.590",
                    "endTime": "00:01:48.800"
                  },
                  {
                    "word": "y'all",
                    "startTime": "00:01:48.820",
                    "endTime": "00:01:49.060"
                  },
                  {
                    "word": "knew",
                    "startTime": "00:01:49.090",
                    "endTime": "00:01:49.280"
                  },
                  {
                    "word": "that",
                    "startTime": "00:01:49.330",
                    "endTime": "00:01:49.740"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:49.850",
                    "endTime": "00:01:50.100"
                  },
                  {
                    "word": "big",
                    "startTime": "00:01:50.130",
                    "endTime": "00:01:50.350"
                  },
                  {
                    "word": "boss",
                    "startTime": "00:01:50.400",
                    "endTime": "00:01:50.650"
                  },
                  {
                    "word": "dog",
                    "startTime": "00:01:50.710",
                    "endTime": "00:01:50.950"
                  },
                  {
                    "word": "yeah,",
                    "startTime": "00:01:51.000",
                    "endTime": "00:01:51.210"
                  },
                  {
                    "word": "I",
                    "startTime": "00:01:51.230",
                    "endTime": "00:01:51.330"
                  },
                  {
                    "word": "had",
                    "startTime": "00:01:51.350",
                    "endTime": "00:01:51.530"
                  }
                ]
              },
              {
                "text": "to do that I keep a flag hanging out my backside but only",
                "startTime": "00:01:51.560",
                "endTime": "00:01:55.300",
                "words": [
                  {
                    "word": "to",
                    "startTime": "00:01:51.560",
                    "endTime": "00:01:51.720"
                  },
                  {
                    "word": "do",
                    "startTime": "00:01:51.740",
                    "endTime": "00:01:51.900"
                  },
                  {
                    "word": "that",
                    "startTime": "00:01:51.930",
                    "endTime": "00:01:52.320"
                  },
                  {
                    "word": "I",
                    "startTime": "00:01:52.420",
                    "endTime": "00:01:52.660"
                  },
                  {
                    "word": "keep",
                    "startTime": "00:01:52.690",
                    "endTime": "00:01:52.840"
                  },
                  {
                    "word": "a",
                    "startTime": "00:01:52.860",
                    "endTime": "00:01:53.190"
                  },
                  {
                    "word": "flag",
                    "startTime": "00:01:53.280",
                    "endTime": "00:01:53.570"
                  },
                  {
                    "word": "hanging",
                    "startTime": "00:01:53.630",
                    "endTime": "00:01:53.940"
                  },
                  {
                    "word": "out",
                    "startTime": "00:01:53.970",
                    "endTime": "00:01:54.120"
                  },
                  {
                    "word": "my",
                    "startTime": "00:01:54.140",
                    "endTime": "00:01:54.330"
                  },
                  {
                    "word": "backside",
                    "startTime": "00:01:54.360",
                    "endTime": "00:01:54.810"
                  },
                  {
                    "word": "but",
                    "startTime": "00:01:54.840",
                    "endTime": "00:01:55.070"
                  },
                  {
                    "word": "only",
                    "startTime": "00:01:55.120",
                    "endTime": "00:01:55.300"
                  }
                ]
              },
              {
                "text": "on the left side yeah, that's the Ain't no other way",
                "startTime": "00:01:55.330",
                "endTime": "00:01:58.690",
                "words": [
                  {
                    "word": "on",
                    "startTime": "00:01:55.330",
                    "endTime": "00:01:55.480"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:55.500",
                    "endTime": "00:01:55.640"
                  },
                  {
                    "word": "left",
                    "startTime": "00:01:55.660",
                    "endTime": "00:01:55.890"
                  },
                  {
                    "word": "side",
                    "startTime": "00:01:55.950",
                    "endTime": "00:01:56.240"
                  },
                  {
                    "word": "yeah,",
                    "startTime": "00:01:56.300",
                    "endTime": "00:01:56.560"
                  },
                  {
                    "word": "that's",
                    "startTime": "00:01:56.580",
                    "endTime": "00:01:56.770"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:56.790",
                    "endTime": "00:01:57.340"
                  },
                  {
                    "word": "Ain't",
                    "startTime": "00:01:57.660",
                    "endTime": "00:01:58.060"
                  },
                  {
                    "word": "no",
                    "startTime": "00:01:58.080",
                    "endTime": "00:01:58.300"
                  },
                  {
                    "word": "other",
                    "startTime": "00:01:58.360",
                    "endTime": "00:01:58.530"
                  },
                  {
                    "word": "way",
                    "startTime": "00:01:58.550",
                    "endTime": "00:01:58.690"
                  }
                ]
              },
              {
                "text": "to play the game the way I play I cut so much you thought I",
                "startTime": "00:01:58.710",
                "endTime": "00:02:1.810",
                "words": [
                  {
                    "word": "to",
                    "startTime": "00:01:58.710",
                    "endTime": "00:01:58.850"
                  },
                  {
                    "word": "play",
                    "startTime": "00:01:58.870",
                    "endTime": "00:01:59.010"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:59.030",
                    "endTime": "00:01:59.170"
                  },
                  {
                    "word": "game",
                    "startTime": "00:01:59.190",
                    "endTime": "00:01:59.350"
                  },
                  {
                    "word": "the",
                    "startTime": "00:01:59.380",
                    "endTime": "00:01:59.530"
                  },
                  {
                    "word": "way",
                    "startTime": "00:01:59.550",
                    "endTime": "00:01:59.690"
                  },
                  {
                    "word": "I",
                    "startTime": "00:01:59.710",
                    "endTime": "00:01:59.870"
                  },
                  {
                    "word": "play",
                    "startTime": "00:01:59.900",
                    "endTime": "00:02:0.220"
                  },
                  {
                    "word": "I",
                    "startTime": "00:02:0.300",
                    "endTime": "00:02:0.510"
                  },
                  {
                    "word": "cut",
                    "startTime": "00:02:0.540",
                    "endTime": "00:02:0.760"
                  },
                  {
                    "word": "so",
                    "startTime": "00:02:0.810",
                    "endTime": "00:02:1.020"
                  },
                  {
                    "word": "much",
                    "startTime": "00:02:1.060",
                    "endTime": "00:02:1.230"
                  },
                  {
                    "word": "you",
                    "startTime": "00:02:1.260",
                    "endTime": "00:02:1.450"
                  },
                  {
                    "word": "thought",
                    "startTime": "00:02:1.500",
                    "endTime": "00:02:1.650"
                  },
                  {
                    "word": "I",
                    "startTime": "00:02:1.670",
                    "endTime": "00:02:1.810"
                  }
                ]
              },
              {
                "text": "was a DJ 21 yep,",
                "startTime": "00:02:1.830",
                "endTime": "00:02:4.690",
                "words": [
                  {
                    "word": "was",
                    "startTime": "00:02:1.830",
                    "endTime": "00:02:1.990"
                  },
                  {
                    "word": "a",
                    "startTime": "00:02:2.020",
                    "endTime": "00:02:2.190"
                  },
                  {
                    "word": "DJ",
                    "startTime": "00:02:2.220",
                    "endTime": "00:02:2.920"
                  },
                  {
                    "word": "21",
                    "startTime": "00:02:3.050",
                    "endTime": "00:02:4.340"
                  },
                  {
                    "word": "yep,",
                    "startTime": "00:02:4.400",
                    "endTime": "00:02:4.690"
                  }
                ]
              },
              {
                "text": "3s SC and double O P D go double G I can't fake",
                "startTime": "00:02:4.750",
                "endTime": "00:02:8.810",
                "words": [
                  {
                    "word": "3s",
                    "startTime": "00:02:4.750",
                    "endTime": "00:02:5.660"
                  },
                  {
                    "word": "SC",
                    "startTime": "00:02:5.690",
                    "endTime": "00:02:5.820"
                  },
                  {
                    "word": "and",
                    "startTime": "00:02:5.840",
                    "endTime": "00:02:6.020"
                  },
                  {
                    "word": "double",
                    "startTime": "00:02:6.060",
                    "endTime": "00:02:6.380"
                  },
                  {
                    "word": "O",
                    "startTime": "00:02:6.420",
                    "endTime": "00:02:6.660"
                  },
                  {
                    "word": "P",
                    "startTime": "00:02:6.720",
                    "endTime": "00:02:6.960"
                  },
                  {
                    "word": "D",
                    "startTime": "00:02:7.010",
                    "endTime": "00:02:7.170"
                  },
                  {
                    "word": "go",
                    "startTime": "00:02:7.190",
                    "endTime": "00:02:7.350"
                  },
                  {
                    "word": "double",
                    "startTime": "00:02:7.380",
                    "endTime": "00:02:7.660"
                  },
                  {
                    "word": "G",
                    "startTime": "00:02:7.690",
                    "endTime": "00:02:8.060"
                  },
                  {
                    "word": "I",
                    "startTime": "00:02:8.160",
                    "endTime": "00:02:8.370"
                  },
                  {
                    "word": "can't",
                    "startTime": "00:02:8.390",
                    "endTime": "00:02:8.630"
                  },
                  {
                    "word": "fake",
                    "startTime": "00:02:8.660",
                    "endTime": "00:02:8.810"
                  }
                ]
              },
              {
                "text": "it, just break it and when I take it see I specialize in making all",
                "startTime": "00:02:8.830",
                "endTime": "00:02:11.730",
                "words": [
                  {
                    "word": "it,",
                    "startTime": "00:02:8.830",
                    "endTime": "00:02:8.970"
                  },
                  {
                    "word": "just",
                    "startTime": "00:02:8.990",
                    "endTime": "00:02:9.130"
                  },
                  {
                    "word": "break",
                    "startTime": "00:02:9.150",
                    "endTime": "00:02:9.310"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:9.340",
                    "endTime": "00:02:9.460"
                  },
                  {
                    "word": "and",
                    "startTime": "00:02:9.480",
                    "endTime": "00:02:9.610"
                  },
                  {
                    "word": "when",
                    "startTime": "00:02:9.630",
                    "endTime": "00:02:9.770"
                  },
                  {
                    "word": "I",
                    "startTime": "00:02:9.790",
                    "endTime": "00:02:9.930"
                  },
                  {
                    "word": "take",
                    "startTime": "00:02:9.950",
                    "endTime": "00:02:10.090"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:10.110",
                    "endTime": "00:02:10.250"
                  },
                  {
                    "word": "see",
                    "startTime": "00:02:10.270",
                    "endTime": "00:02:10.410"
                  },
                  {
                    "word": "I",
                    "startTime": "00:02:10.430",
                    "endTime": "00:02:10.660"
                  },
                  {
                    "word": "specialize",
                    "startTime": "00:02:10.720",
                    "endTime": "00:02:11.060"
                  },
                  {
                    "word": "in",
                    "startTime": "00:02:11.090",
                    "endTime": "00:02:11.250"
                  },
                  {
                    "word": "making",
                    "startTime": "00:02:11.270",
                    "endTime": "00:02:11.500"
                  },
                  {
                    "word": "all",
                    "startTime": "00:02:11.560",
                    "endTime": "00:02:11.730"
                  }
                ]
              },
              {
                "text": "the girls get naked so bring your friends all of y'all come inside",
                "startTime": "00:02:11.750",
                "endTime": "00:02:15.260",
                "words": [
                  {
                    "word": "the",
                    "startTime": "00:02:11.750",
                    "endTime": "00:02:11.910"
                  },
                  {
                    "word": "girls",
                    "startTime": "00:02:11.940",
                    "endTime": "00:02:12.240"
                  },
                  {
                    "word": "get",
                    "startTime": "00:02:12.290",
                    "endTime": "00:02:12.520"
                  },
                  {
                    "word": "naked",
                    "startTime": "00:02:12.570",
                    "endTime": "00:02:13.130"
                  },
                  {
                    "word": "so",
                    "startTime": "00:02:13.250",
                    "endTime": "00:02:13.510"
                  },
                  {
                    "word": "bring",
                    "startTime": "00:02:13.540",
                    "endTime": "00:02:13.690"
                  },
                  {
                    "word": "your",
                    "startTime": "00:02:13.710",
                    "endTime": "00:02:13.870"
                  },
                  {
                    "word": "friends",
                    "startTime": "00:02:13.900",
                    "endTime": "00:02:14.140"
                  },
                  {
                    "word": "all",
                    "startTime": "00:02:14.200",
                    "endTime": "00:02:14.340"
                  },
                  {
                    "word": "of",
                    "startTime": "00:02:14.360",
                    "endTime": "00:02:14.460"
                  },
                  {
                    "word": "y'all",
                    "startTime": "00:02:14.480",
                    "endTime": "00:02:14.670"
                  },
                  {
                    "word": "come",
                    "startTime": "00:02:14.700",
                    "endTime": "00:02:14.820"
                  },
                  {
                    "word": "inside",
                    "startTime": "00:02:14.840",
                    "endTime": "00:02:15.260"
                  }
                ]
              },
              {
                "text": "we got a world premiere right here and not get l so don't",
                "startTime": "00:02:15.320",
                "endTime": "00:02:18.810",
                "words": [
                  {
                    "word": "we",
                    "startTime": "00:02:15.320",
                    "endTime": "00:02:15.510"
                  },
                  {
                    "word": "got",
                    "startTime": "00:02:15.540",
                    "endTime": "00:02:15.690"
                  },
                  {
                    "word": "a",
                    "startTime": "00:02:15.710",
                    "endTime": "00:02:15.850"
                  },
                  {
                    "word": "world",
                    "startTime": "00:02:15.870",
                    "endTime": "00:02:16.100"
                  },
                  {
                    "word": "premiere",
                    "startTime": "00:02:16.160",
                    "endTime": "00:02:16.610"
                  },
                  {
                    "word": "right",
                    "startTime": "00:02:16.670",
                    "endTime": "00:02:16.920"
                  },
                  {
                    "word": "here",
                    "startTime": "00:02:16.970",
                    "endTime": "00:02:17.130"
                  },
                  {
                    "word": "and",
                    "startTime": "00:02:17.150",
                    "endTime": "00:02:17.260"
                  },
                  {
                    "word": "not",
                    "startTime": "00:02:17.280",
                    "endTime": "00:02:17.430"
                  },
                  {
                    "word": "get",
                    "startTime": "00:02:17.460",
                    "endTime": "00:02:17.700"
                  },
                  {
                    "word": "l",
                    "startTime": "00:02:17.760",
                    "endTime": "00:02:18.220"
                  },
                  {
                    "word": "so",
                    "startTime": "00:02:18.340",
                    "endTime": "00:02:18.590"
                  },
                  {
                    "word": "don't",
                    "startTime": "00:02:18.620",
                    "endTime": "00:02:18.810"
                  }
                ]
              },
              {
                "text": "change the dzle turn it up a littleal I got a living room full of",
                "startTime": "00:02:18.830",
                "endTime": "00:02:22.390",
                "words": [
                  {
                    "word": "change",
                    "startTime": "00:02:18.830",
                    "endTime": "00:02:19.010"
                  },
                  {
                    "word": "the",
                    "startTime": "00:02:19.060",
                    "endTime": "00:02:19.230"
                  },
                  {
                    "word": "dzle",
                    "startTime": "00:02:19.260",
                    "endTime": "00:02:19.690"
                  },
                  {
                    "word": "turn",
                    "startTime": "00:02:19.780",
                    "endTime": "00:02:19.990"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:20.020",
                    "endTime": "00:02:20.140"
                  },
                  {
                    "word": "up",
                    "startTime": "00:02:20.160",
                    "endTime": "00:02:20.310"
                  },
                  {
                    "word": "a",
                    "startTime": "00:02:20.340",
                    "endTime": "00:02:20.460"
                  },
                  {
                    "word": "littleal",
                    "startTime": "00:02:20.480",
                    "endTime": "00:02:20.850"
                  },
                  {
                    "word": "I",
                    "startTime": "00:02:20.910",
                    "endTime": "00:02:21.110"
                  },
                  {
                    "word": "got",
                    "startTime": "00:02:21.140",
                    "endTime": "00:02:21.290"
                  },
                  {
                    "word": "a",
                    "startTime": "00:02:21.310",
                    "endTime": "00:02:21.420"
                  },
                  {
                    "word": "living",
                    "startTime": "00:02:21.440",
                    "endTime": "00:02:21.740"
                  },
                  {
                    "word": "room",
                    "startTime": "00:02:21.780",
                    "endTime": "00:02:22.000"
                  },
                  {
                    "word": "full",
                    "startTime": "00:02:22.050",
                    "endTime": "00:02:22.210"
                  },
                  {
                    "word": "of",
                    "startTime": "00:02:22.230",
                    "endTime": "00:02:22.390"
                  }
                ]
              },
              {
                "text": "fine dime brzzles waiting on the pistzle the dizzle and the",
                "startTime": "00:02:22.420",
                "endTime": "00:02:25.630",
                "words": [
                  {
                    "word": "fine",
                    "startTime": "00:02:22.420",
                    "endTime": "00:02:22.660"
                  },
                  {
                    "word": "dime",
                    "startTime": "00:02:22.720",
                    "endTime": "00:02:22.980"
                  },
                  {
                    "word": "brzzles",
                    "startTime": "00:02:23.040",
                    "endTime": "00:02:23.570"
                  },
                  {
                    "word": "waiting",
                    "startTime": "00:02:23.670",
                    "endTime": "00:02:23.990"
                  },
                  {
                    "word": "on",
                    "startTime": "00:02:24.020",
                    "endTime": "00:02:24.170"
                  },
                  {
                    "word": "the",
                    "startTime": "00:02:24.190",
                    "endTime": "00:02:24.280"
                  },
                  {
                    "word": "pistzle",
                    "startTime": "00:02:24.290",
                    "endTime": "00:02:24.630"
                  },
                  {
                    "word": "the",
                    "startTime": "00:02:24.660",
                    "endTime": "00:02:24.810"
                  },
                  {
                    "word": "dizzle",
                    "startTime": "00:02:24.830",
                    "endTime": "00:02:25.210"
                  },
                  {
                    "word": "and",
                    "startTime": "00:02:25.270",
                    "endTime": "00:02:25.450"
                  },
                  {
                    "word": "the",
                    "startTime": "00:02:25.470",
                    "endTime": "00:02:25.630"
                  }
                ]
              },
              {
                "text": "chizzle Jez to the biz act now ladies see we get her pimps",
                "startTime": "00:02:25.660",
                "endTime": "00:02:29.280",
                "words": [
                  {
                    "word": "chizzle",
                    "startTime": "00:02:25.660",
                    "endTime": "00:02:26.160"
                  },
                  {
                    "word": "Jez",
                    "startTime": "00:02:26.250",
                    "endTime": "00:02:26.530"
                  },
                  {
                    "word": "to",
                    "startTime": "00:02:26.570",
                    "endTime": "00:02:26.730"
                  },
                  {
                    "word": "the",
                    "startTime": "00:02:26.750",
                    "endTime": "00:02:26.910"
                  },
                  {
                    "word": "biz",
                    "startTime": "00:02:26.940",
                    "endTime": "00:02:27.110"
                  },
                  {
                    "word": "act",
                    "startTime": "00:02:27.140",
                    "endTime": "00:02:27.340"
                  },
                  {
                    "word": "now",
                    "startTime": "00:02:27.380",
                    "endTime": "00:02:27.550"
                  },
                  {
                    "word": "ladies",
                    "startTime": "00:02:27.580",
                    "endTime": "00:02:27.830"
                  },
                  {
                    "word": "see",
                    "startTime": "00:02:27.860",
                    "endTime": "00:02:28.010"
                  },
                  {
                    "word": "we",
                    "startTime": "00:02:28.030",
                    "endTime": "00:02:28.170"
                  },
                  {
                    "word": "get",
                    "startTime": "00:02:28.190",
                    "endTime": "00:02:28.330"
                  },
                  {
                    "word": "her",
                    "startTime": "00:02:28.350",
                    "endTime": "00:02:28.700"
                  },
                  {
                    "word": "pimps",
                    "startTime": "00:02:28.800",
                    "endTime": "00:02:29.280"
                  }
                ]
              },
              {
                "text": "the grip min Drop it like it's hot. D0rop it like it's hot. D0rop it",
                "startTime": "00:02:29.380",
                "endTime": "00:02:33.120",
                "words": [
                  {
                    "word": "the",
                    "startTime": "00:02:29.380",
                    "endTime": "00:02:29.570"
                  },
                  {
                    "word": "grip",
                    "startTime": "00:02:29.590",
                    "endTime": "00:02:29.810"
                  },
                  {
                    "word": "min",
                    "startTime": "00:02:29.870",
                    "endTime": "00:02:30.110"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:02:30.160",
                    "endTime": "00:02:30.340"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:30.370",
                    "endTime": "00:02:30.520"
                  },
                  {
                    "word": "like",
                    "startTime": "00:02:30.540",
                    "endTime": "00:02:30.680"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:02:30.700",
                    "endTime": "00:02:30.880"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:02:30.900",
                    "endTime": "00:02:31.300"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:02:31.410",
                    "endTime": "00:02:31.660"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:31.690",
                    "endTime": "00:02:31.840"
                  },
                  {
                    "word": "like",
                    "startTime": "00:02:31.860",
                    "endTime": "00:02:32.000"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:02:32.020",
                    "endTime": "00:02:32.200"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:02:32.220",
                    "endTime": "00:02:32.620"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:02:32.730",
                    "endTime": "00:02:32.960"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:32.980",
                    "endTime": "00:02:33.120"
                  }
                ]
              },
              {
                "text": "like it's hot. W0hen the pigs try to get at you park it like it's",
                "startTime": "00:02:33.140",
                "endTime": "00:02:36.080",
                "words": [
                  {
                    "word": "like",
                    "startTime": "00:02:33.140",
                    "endTime": "00:02:33.280"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:02:33.300",
                    "endTime": "00:02:33.490"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:02:33.510",
                    "endTime": "00:02:33.710"
                  },
                  {
                    "word": "When",
                    "startTime": "00:02:33.760",
                    "endTime": "00:02:33.920"
                  },
                  {
                    "word": "the",
                    "startTime": "00:02:33.940",
                    "endTime": "00:02:34.100"
                  },
                  {
                    "word": "pigs",
                    "startTime": "00:02:34.130",
                    "endTime": "00:02:34.410"
                  },
                  {
                    "word": "try",
                    "startTime": "00:02:34.440",
                    "endTime": "00:02:34.600"
                  },
                  {
                    "word": "to",
                    "startTime": "00:02:34.620",
                    "endTime": "00:02:34.760"
                  },
                  {
                    "word": "get",
                    "startTime": "00:02:34.780",
                    "endTime": "00:02:34.920"
                  },
                  {
                    "word": "at",
                    "startTime": "00:02:34.940",
                    "endTime": "00:02:35.050"
                  },
                  {
                    "word": "you",
                    "startTime": "00:02:35.070",
                    "endTime": "00:02:35.320"
                  },
                  {
                    "word": "park",
                    "startTime": "00:02:35.380",
                    "endTime": "00:02:35.560"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:35.580",
                    "endTime": "00:02:35.720"
                  },
                  {
                    "word": "like",
                    "startTime": "00:02:35.740",
                    "endTime": "00:02:35.880"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:02:35.900",
                    "endTime": "00:02:36.080"
                  }
                ]
              },
              {
                "text": "hot. P0ark it like it's hot. P0ark it like it's hot. N0ever get",
                "startTime": "00:02:36.100",
                "endTime": "00:02:39.760",
                "words": [
                  {
                    "word": "hot.",
                    "startTime": "00:02:36.100",
                    "endTime": "00:02:36.530"
                  },
                  {
                    "word": "Park",
                    "startTime": "00:02:36.650",
                    "endTime": "00:02:36.880"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:36.900",
                    "endTime": "00:02:37.010"
                  },
                  {
                    "word": "like",
                    "startTime": "00:02:37.030",
                    "endTime": "00:02:37.160"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:02:37.180",
                    "endTime": "00:02:37.370"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:02:37.390",
                    "endTime": "00:02:37.830"
                  },
                  {
                    "word": "Park",
                    "startTime": "00:02:37.960",
                    "endTime": "00:02:38.170"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:38.190",
                    "endTime": "00:02:38.320"
                  },
                  {
                    "word": "like",
                    "startTime": "00:02:38.340",
                    "endTime": "00:02:38.480"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:02:38.500",
                    "endTime": "00:02:38.650"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:02:38.670",
                    "endTime": "00:02:38.990"
                  },
                  {
                    "word": "Never",
                    "startTime": "00:02:39.080",
                    "endTime": "00:02:39.470"
                  },
                  {
                    "word": "get",
                    "startTime": "00:02:39.560",
                    "endTime": "00:02:39.760"
                  }
                ]
              },
              {
                "text": "a attitude Pop it like it's hot. P0op it like it's hot Pop it",
                "startTime": "00:02:39.780",
                "endTime": "00:02:43.520",
                "words": [
                  {
                    "word": "a",
                    "startTime": "00:02:39.780",
                    "endTime": "00:02:39.920"
                  },
                  {
                    "word": "attitude",
                    "startTime": "00:02:39.940",
                    "endTime": "00:02:40.520"
                  },
                  {
                    "word": "Pop",
                    "startTime": "00:02:40.580",
                    "endTime": "00:02:40.730"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:40.750",
                    "endTime": "00:02:40.880"
                  },
                  {
                    "word": "like",
                    "startTime": "00:02:40.900",
                    "endTime": "00:02:41.040"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:02:41.060",
                    "endTime": "00:02:41.250"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:02:41.270",
                    "endTime": "00:02:41.690"
                  },
                  {
                    "word": "Pop",
                    "startTime": "00:02:41.810",
                    "endTime": "00:02:42.060"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:42.090",
                    "endTime": "00:02:42.240"
                  },
                  {
                    "word": "like",
                    "startTime": "00:02:42.260",
                    "endTime": "00:02:42.400"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:02:42.420",
                    "endTime": "00:02:42.570"
                  },
                  {
                    "word": "hot",
                    "startTime": "00:02:42.590",
                    "endTime": "00:02:43.000"
                  },
                  {
                    "word": "Pop",
                    "startTime": "00:02:43.130",
                    "endTime": "00:02:43.360"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:43.380",
                    "endTime": "00:02:43.520"
                  }
                ]
              },
              {
                "text": "like it's hot. I0've got the rule of your and I'm pouring Shan down and",
                "startTime": "00:02:43.540",
                "endTime": "00:02:46.980",
                "words": [
                  {
                    "word": "like",
                    "startTime": "00:02:43.540",
                    "endTime": "00:02:43.680"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:02:43.700",
                    "endTime": "00:02:43.850"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:02:43.870",
                    "endTime": "00:02:44.020"
                  },
                  {
                    "word": "I've",
                    "startTime": "00:02:44.050",
                    "endTime": "00:02:44.210"
                  },
                  {
                    "word": "got",
                    "startTime": "00:02:44.230",
                    "endTime": "00:02:44.360"
                  },
                  {
                    "word": "the",
                    "startTime": "00:02:44.380",
                    "endTime": "00:02:44.520"
                  },
                  {
                    "word": "rule",
                    "startTime": "00:02:44.540",
                    "endTime": "00:02:44.680"
                  },
                  {
                    "word": "of",
                    "startTime": "00:02:44.700",
                    "endTime": "00:02:44.810"
                  },
                  {
                    "word": "your",
                    "startTime": "00:02:44.830",
                    "endTime": "00:02:45.270"
                  },
                  {
                    "word": "and",
                    "startTime": "00:02:45.400",
                    "endTime": "00:02:45.640"
                  },
                  {
                    "word": "I'm",
                    "startTime": "00:02:45.660",
                    "endTime": "00:02:45.860"
                  },
                  {
                    "word": "pouring",
                    "startTime": "00:02:45.890",
                    "endTime": "00:02:46.150"
                  },
                  {
                    "word": "Shan",
                    "startTime": "00:02:46.200",
                    "endTime": "00:02:46.450"
                  },
                  {
                    "word": "down",
                    "startTime": "00:02:46.510",
                    "endTime": "00:02:46.750"
                  },
                  {
                    "word": "and",
                    "startTime": "00:02:46.800",
                    "endTime": "00:02:46.980"
                  }
                ]
              },
              {
                "text": "I for best cause I got it going on I'm a bad",
                "startTime": "00:02:47.010",
                "endTime": "00:02:50.800",
                "words": [
                  {
                    "word": "I",
                    "startTime": "00:02:47.010",
                    "endTime": "00:02:47.230"
                  },
                  {
                    "word": "for",
                    "startTime": "00:02:47.280",
                    "endTime": "00:02:47.460"
                  },
                  {
                    "word": "best",
                    "startTime": "00:02:47.490",
                    "endTime": "00:02:47.900"
                  },
                  {
                    "word": "cause",
                    "startTime": "00:02:48.010",
                    "endTime": "00:02:48.280"
                  },
                  {
                    "word": "I",
                    "startTime": "00:02:48.300",
                    "endTime": "00:02:48.460"
                  },
                  {
                    "word": "got",
                    "startTime": "00:02:48.490",
                    "endTime": "00:02:48.640"
                  },
                  {
                    "word": "it",
                    "startTime": "00:02:48.660",
                    "endTime": "00:02:48.800"
                  },
                  {
                    "word": "going",
                    "startTime": "00:02:48.820",
                    "endTime": "00:02:49.080"
                  },
                  {
                    "word": "on",
                    "startTime": "00:02:49.140",
                    "endTime": "00:02:49.770"
                  },
                  {
                    "word": "I'm",
                    "startTime": "00:02:49.950",
                    "endTime": "00:02:50.280"
                  },
                  {
                    "word": "a",
                    "startTime": "00:02:50.300",
                    "endTime": "00:02:50.490"
                  },
                  {
                    "word": "bad",
                    "startTime": "00:02:50.530",
                    "endTime": "00:02:50.800"
                  }
                ]
              },
              {
                "text": "boy with a lot of driving my own cars and wear my own",
                "startTime": "00:02:50.860",
                "endTime": "00:02:54.680",
                "words": [
                  {
                    "word": "boy",
                    "startTime": "00:02:50.860",
                    "endTime": "00:02:51.300"
                  },
                  {
                    "word": "with",
                    "startTime": "00:02:51.410",
                    "endTime": "00:02:51.640"
                  },
                  {
                    "word": "a",
                    "startTime": "00:02:51.660",
                    "endTime": "00:02:51.770"
                  },
                  {
                    "word": "lot",
                    "startTime": "00:02:51.790",
                    "endTime": "00:02:51.920"
                  },
                  {
                    "word": "of",
                    "startTime": "00:02:51.940",
                    "endTime": "00:02:52.490"
                  },
                  {
                    "word": "driving",
                    "startTime": "00:02:52.650",
                    "endTime": "00:02:53.000"
                  },
                  {
                    "word": "my",
                    "startTime": "00:02:53.020",
                    "endTime": "00:02:53.160"
                  },
                  {
                    "word": "own",
                    "startTime": "00:02:53.180",
                    "endTime": "00:02:53.460"
                  },
                  {
                    "word": "cars",
                    "startTime": "00:02:53.530",
                    "endTime": "00:02:53.790"
                  },
                  {
                    "word": "and",
                    "startTime": "00:02:53.840",
                    "endTime": "00:02:54.000"
                  },
                  {
                    "word": "wear",
                    "startTime": "00:02:54.020",
                    "endTime": "00:02:54.180"
                  },
                  {
                    "word": "my",
                    "startTime": "00:02:54.210",
                    "endTime": "00:02:54.380"
                  },
                  {
                    "word": "own",
                    "startTime": "00:02:54.410",
                    "endTime": "00:02:54.680"
                  }
                ]
              },
              {
                "text": "clothes I hang out tough I'm a real boss Big",
                "startTime": "00:02:54.740",
                "endTime": "00:02:58.310",
                "words": [
                  {
                    "word": "clothes",
                    "startTime": "00:02:54.740",
                    "endTime": "00:02:55.260"
                  },
                  {
                    "word": "I",
                    "startTime": "00:02:55.370",
                    "endTime": "00:02:55.620"
                  },
                  {
                    "word": "hang",
                    "startTime": "00:02:55.650",
                    "endTime": "00:02:55.820"
                  },
                  {
                    "word": "out",
                    "startTime": "00:02:55.850",
                    "endTime": "00:02:56.070"
                  },
                  {
                    "word": "tough",
                    "startTime": "00:02:56.120",
                    "endTime": "00:02:56.530"
                  },
                  {
                    "word": "I'm",
                    "startTime": "00:02:56.620",
                    "endTime": "00:02:56.840"
                  },
                  {
                    "word": "a",
                    "startTime": "00:02:56.860",
                    "endTime": "00:02:57.010"
                  },
                  {
                    "word": "real",
                    "startTime": "00:02:57.040",
                    "endTime": "00:02:57.280"
                  },
                  {
                    "word": "boss",
                    "startTime": "00:02:57.340",
                    "endTime": "00:02:57.820"
                  },
                  {
                    "word": "Big",
                    "startTime": "00:02:57.950",
                    "endTime": "00:02:58.310"
                  }
                ]
              },
              {
                "text": "Snoop dog yeah he's so sharp on the TV screen and in",
                "startTime": "00:02:58.370",
                "endTime": "00:03:1.950",
                "words": [
                  {
                    "word": "Snoop",
                    "startTime": "00:02:58.370",
                    "endTime": "00:02:58.630"
                  },
                  {
                    "word": "dog",
                    "startTime": "00:02:58.680",
                    "endTime": "00:02:58.970"
                  },
                  {
                    "word": "yeah",
                    "startTime": "00:02:59.040",
                    "endTime": "00:02:59.290"
                  },
                  {
                    "word": "he's",
                    "startTime": "00:02:59.320",
                    "endTime": "00:02:59.580"
                  },
                  {
                    "word": "so",
                    "startTime": "00:02:59.630",
                    "endTime": "00:02:59.880"
                  },
                  {
                    "word": "sharp",
                    "startTime": "00:02:59.940",
                    "endTime": "00:03:0.350"
                  },
                  {
                    "word": "on",
                    "startTime": "00:03:0.450",
                    "endTime": "00:03:0.670"
                  },
                  {
                    "word": "the",
                    "startTime": "00:03:0.690",
                    "endTime": "00:03:0.830"
                  },
                  {
                    "word": "TV",
                    "startTime": "00:03:0.850",
                    "endTime": "00:03:1.220"
                  },
                  {
                    "word": "screen",
                    "startTime": "00:03:1.270",
                    "endTime": "00:03:1.520"
                  },
                  {
                    "word": "and",
                    "startTime": "00:03:1.580",
                    "endTime": "00:03:1.770"
                  },
                  {
                    "word": "in",
                    "startTime": "00:03:1.800",
                    "endTime": "00:03:1.950"
                  }
                ]
              },
              {
                "text": "the magazines if you play me close you wa wantna oh",
                "startTime": "00:03:1.970",
                "endTime": "00:03:5.830",
                "words": [
                  {
                    "word": "the",
                    "startTime": "00:03:1.970",
                    "endTime": "00:03:2.130"
                  },
                  {
                    "word": "magazines",
                    "startTime": "00:03:2.160",
                    "endTime": "00:03:2.910"
                  },
                  {
                    "word": "if",
                    "startTime": "00:03:3.030",
                    "endTime": "00:03:3.240"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:3.260",
                    "endTime": "00:03:3.410"
                  },
                  {
                    "word": "play",
                    "startTime": "00:03:3.440",
                    "endTime": "00:03:3.590"
                  },
                  {
                    "word": "me",
                    "startTime": "00:03:3.610",
                    "endTime": "00:03:3.790"
                  },
                  {
                    "word": "close",
                    "startTime": "00:03:3.840",
                    "endTime": "00:03:4.160"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:4.240",
                    "endTime": "00:03:4.430"
                  },
                  {
                    "word": "wa",
                    "startTime": "00:03:4.450",
                    "endTime": "00:03:4.510"
                  },
                  {
                    "word": "wantna",
                    "startTime": "00:03:4.510",
                    "endTime": "00:03:5.220"
                  },
                  {
                    "word": "oh",
                    "startTime": "00:03:5.510",
                    "endTime": "00:03:5.830"
                  }
                ]
              },
              {
                "text": "you gotta so you wanna back but",
                "startTime": "00:03:5.850",
                "endTime": "00:03:9.350",
                "words": [
                  {
                    "word": "you",
                    "startTime": "00:03:5.850",
                    "endTime": "00:03:6.010"
                  },
                  {
                    "word": "gotta",
                    "startTime": "00:03:6.040",
                    "endTime": "00:03:6.540"
                  },
                  {
                    "word": "so",
                    "startTime": "00:03:6.630",
                    "endTime": "00:03:6.800"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:6.820",
                    "endTime": "00:03:6.950"
                  },
                  {
                    "word": "wanna",
                    "startTime": "00:03:6.970",
                    "endTime": "00:03:7.560"
                  },
                  {
                    "word": "back",
                    "startTime": "00:03:7.680",
                    "endTime": "00:03:8.340"
                  },
                  {
                    "word": "but",
                    "startTime": "00:03:9.000",
                    "endTime": "00:03:9.350"
                  }
                ]
              },
              {
                "text": "now stop that shoes Now I'm on the",
                "startTime": "00:03:9.400",
                "endTime": "00:03:12.950",
                "words": [
                  {
                    "word": "now",
                    "startTime": "00:03:9.400",
                    "endTime": "00:03:9.840"
                  },
                  {
                    "word": "stop",
                    "startTime": "00:03:9.960",
                    "endTime": "00:03:10.310"
                  },
                  {
                    "word": "that",
                    "startTime": "00:03:10.370",
                    "endTime": "00:03:10.970"
                  },
                  {
                    "word": "shoes",
                    "startTime": "00:03:11.560",
                    "endTime": "00:03:12.190"
                  },
                  {
                    "word": "Now",
                    "startTime": "00:03:12.310",
                    "endTime": "00:03:12.500"
                  },
                  {
                    "word": "I'm",
                    "startTime": "00:03:12.510",
                    "endTime": "00:03:12.640"
                  },
                  {
                    "word": "on",
                    "startTime": "00:03:12.660",
                    "endTime": "00:03:12.790"
                  },
                  {
                    "word": "the",
                    "startTime": "00:03:12.810",
                    "endTime": "00:03:12.950"
                  }
                ]
              },
              {
                "text": "move. Y0our family's crying now you own the news they",
                "startTime": "00:03:12.970",
                "endTime": "00:03:16.330",
                "words": [
                  {
                    "word": "move.",
                    "startTime": "00:03:12.970",
                    "endTime": "00:03:13.440"
                  },
                  {
                    "word": "Your",
                    "startTime": "00:03:13.580",
                    "endTime": "00:03:13.950"
                  },
                  {
                    "word": "family's",
                    "startTime": "00:03:14.010",
                    "endTime": "00:03:14.400"
                  },
                  {
                    "word": "crying",
                    "startTime": "00:03:14.440",
                    "endTime": "00:03:14.750"
                  },
                  {
                    "word": "now",
                    "startTime": "00:03:14.840",
                    "endTime": "00:03:15.030"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:15.050",
                    "endTime": "00:03:15.190"
                  },
                  {
                    "word": "own",
                    "startTime": "00:03:15.210",
                    "endTime": "00:03:15.350"
                  },
                  {
                    "word": "the",
                    "startTime": "00:03:15.370",
                    "endTime": "00:03:15.530"
                  },
                  {
                    "word": "news",
                    "startTime": "00:03:15.560",
                    "endTime": "00:03:15.970"
                  },
                  {
                    "word": "they",
                    "startTime": "00:03:16.080",
                    "endTime": "00:03:16.330"
                  }
                ]
              },
              {
                "text": "can't find you and now they miss you Must I remind you I'm only",
                "startTime": "00:03:16.360",
                "endTime": "00:03:20.040",
                "words": [
                  {
                    "word": "can't",
                    "startTime": "00:03:16.360",
                    "endTime": "00:03:16.590"
                  },
                  {
                    "word": "find",
                    "startTime": "00:03:16.630",
                    "endTime": "00:03:16.860"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:16.910",
                    "endTime": "00:03:17.240"
                  },
                  {
                    "word": "and",
                    "startTime": "00:03:17.310",
                    "endTime": "00:03:17.510"
                  },
                  {
                    "word": "now",
                    "startTime": "00:03:17.530",
                    "endTime": "00:03:17.670"
                  },
                  {
                    "word": "they",
                    "startTime": "00:03:17.690",
                    "endTime": "00:03:17.850"
                  },
                  {
                    "word": "miss",
                    "startTime": "00:03:17.880",
                    "endTime": "00:03:18.050"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:18.080",
                    "endTime": "00:03:18.440"
                  },
                  {
                    "word": "Must",
                    "startTime": "00:03:18.540",
                    "endTime": "00:03:18.770"
                  },
                  {
                    "word": "I",
                    "startTime": "00:03:18.800",
                    "endTime": "00:03:19.000"
                  },
                  {
                    "word": "remind",
                    "startTime": "00:03:19.030",
                    "endTime": "00:03:19.350"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:19.400",
                    "endTime": "00:03:19.590"
                  },
                  {
                    "word": "I'm",
                    "startTime": "00:03:19.630",
                    "endTime": "00:03:19.880"
                  },
                  {
                    "word": "only",
                    "startTime": "00:03:19.910",
                    "endTime": "00:03:20.040"
                  }
                ]
              },
              {
                "text": "here to twist you whip you, dip you then flip you",
                "startTime": "00:03:20.060",
                "endTime": "00:03:23.490",
                "words": [
                  {
                    "word": "here",
                    "startTime": "00:03:20.060",
                    "endTime": "00:03:20.210"
                  },
                  {
                    "word": "to",
                    "startTime": "00:03:20.240",
                    "endTime": "00:03:20.440"
                  },
                  {
                    "word": "twist",
                    "startTime": "00:03:20.470",
                    "endTime": "00:03:20.680"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:20.720",
                    "endTime": "00:03:21.290"
                  },
                  {
                    "word": "whip",
                    "startTime": "00:03:21.590",
                    "endTime": "00:03:21.960"
                  },
                  {
                    "word": "you,",
                    "startTime": "00:03:22.000",
                    "endTime": "00:03:22.190"
                  },
                  {
                    "word": "dip",
                    "startTime": "00:03:22.240",
                    "endTime": "00:03:22.480"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:22.540",
                    "endTime": "00:03:22.750"
                  },
                  {
                    "word": "then",
                    "startTime": "00:03:22.790",
                    "endTime": "00:03:23.020"
                  },
                  {
                    "word": "flip",
                    "startTime": "00:03:23.070",
                    "endTime": "00:03:23.280"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:23.310",
                    "endTime": "00:03:23.490"
                  }
                ]
              },
              {
                "text": "Then dance to the music week too subscribe",
                "startTime": "00:03:23.520",
                "endTime": "00:03:27.420",
                "words": [
                  {
                    "word": "Then",
                    "startTime": "00:03:23.520",
                    "endTime": "00:03:23.690"
                  },
                  {
                    "word": "dance",
                    "startTime": "00:03:23.720",
                    "endTime": "00:03:23.910"
                  },
                  {
                    "word": "to",
                    "startTime": "00:03:23.960",
                    "endTime": "00:03:24.110"
                  },
                  {
                    "word": "the",
                    "startTime": "00:03:24.130",
                    "endTime": "00:03:24.780"
                  },
                  {
                    "word": "music",
                    "startTime": "00:03:24.970",
                    "endTime": "00:03:25.280"
                  },
                  {
                    "word": "week",
                    "startTime": "00:03:25.300",
                    "endTime": "00:03:25.650"
                  },
                  {
                    "word": "too",
                    "startTime": "00:03:25.750",
                    "endTime": "00:03:26.440"
                  },
                  {
                    "word": "subscribe",
                    "startTime": "00:03:26.620",
                    "endTime": "00:03:27.420"
                  }
                ]
              },
              {
                "text": "get your issue babbe come close let me see how you",
                "startTime": "00:03:27.530",
                "endTime": "00:03:30.660",
                "words": [
                  {
                    "word": "get",
                    "startTime": "00:03:27.530",
                    "endTime": "00:03:27.780"
                  },
                  {
                    "word": "your",
                    "startTime": "00:03:27.810",
                    "endTime": "00:03:28.170"
                  },
                  {
                    "word": "issue",
                    "startTime": "00:03:28.270",
                    "endTime": "00:03:28.720"
                  },
                  {
                    "word": "babbe",
                    "startTime": "00:03:28.820",
                    "endTime": "00:03:29.140"
                  },
                  {
                    "word": "come",
                    "startTime": "00:03:29.170",
                    "endTime": "00:03:29.370"
                  },
                  {
                    "word": "close",
                    "startTime": "00:03:29.410",
                    "endTime": "00:03:29.720"
                  },
                  {
                    "word": "let",
                    "startTime": "00:03:29.810",
                    "endTime": "00:03:29.970"
                  },
                  {
                    "word": "me",
                    "startTime": "00:03:29.990",
                    "endTime": "00:03:30.120"
                  },
                  {
                    "word": "see",
                    "startTime": "00:03:30.140",
                    "endTime": "00:03:30.300"
                  },
                  {
                    "word": "how",
                    "startTime": "00:03:30.330",
                    "endTime": "00:03:30.480"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:30.500",
                    "endTime": "00:03:30.660"
                  }
                ]
              },
              {
                "text": "get when the pimps in the crib ma Drop it like it's hot.",
                "startTime": "00:03:30.690",
                "endTime": "00:03:33.900",
                "words": [
                  {
                    "word": "get",
                    "startTime": "00:03:30.690",
                    "endTime": "00:03:31.030"
                  },
                  {
                    "word": "when",
                    "startTime": "00:03:31.120",
                    "endTime": "00:03:31.340"
                  },
                  {
                    "word": "the",
                    "startTime": "00:03:31.370",
                    "endTime": "00:03:31.540"
                  },
                  {
                    "word": "pimps",
                    "startTime": "00:03:31.570",
                    "endTime": "00:03:31.780"
                  },
                  {
                    "word": "in",
                    "startTime": "00:03:31.810",
                    "endTime": "00:03:31.960"
                  },
                  {
                    "word": "the",
                    "startTime": "00:03:31.980",
                    "endTime": "00:03:32.140"
                  },
                  {
                    "word": "crib",
                    "startTime": "00:03:32.170",
                    "endTime": "00:03:32.390"
                  },
                  {
                    "word": "ma",
                    "startTime": "00:03:32.440",
                    "endTime": "00:03:32.720"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:03:32.780",
                    "endTime": "00:03:32.960"
                  },
                  {
                    "word": "it",
                    "startTime": "00:03:32.980",
                    "endTime": "00:03:33.120"
                  },
                  {
                    "word": "like",
                    "startTime": "00:03:33.140",
                    "endTime": "00:03:33.280"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:03:33.300",
                    "endTime": "00:03:33.480"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:03:33.500",
                    "endTime": "00:03:33.900"
                  }
                ]
              },
              {
                "text": "Drop it like it's hot. D0rop it like it's hot. W0hen the pigs try to",
                "startTime": "00:03:34.010",
                "endTime": "00:03:37.360",
                "words": [
                  {
                    "word": "Drop",
                    "startTime": "00:03:34.010",
                    "endTime": "00:03:34.260"
                  },
                  {
                    "word": "it",
                    "startTime": "00:03:34.290",
                    "endTime": "00:03:34.440"
                  },
                  {
                    "word": "like",
                    "startTime": "00:03:34.460",
                    "endTime": "00:03:34.600"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:03:34.620",
                    "endTime": "00:03:34.800"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:03:34.820",
                    "endTime": "00:03:35.220"
                  },
                  {
                    "word": "Drop",
                    "startTime": "00:03:35.330",
                    "endTime": "00:03:35.580"
                  },
                  {
                    "word": "it",
                    "startTime": "00:03:35.610",
                    "endTime": "00:03:35.760"
                  },
                  {
                    "word": "like",
                    "startTime": "00:03:35.780",
                    "endTime": "00:03:35.920"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:03:35.940",
                    "endTime": "00:03:36.120"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:03:36.140",
                    "endTime": "00:03:36.320"
                  },
                  {
                    "word": "When",
                    "startTime": "00:03:36.370",
                    "endTime": "00:03:36.540"
                  },
                  {
                    "word": "the",
                    "startTime": "00:03:36.570",
                    "endTime": "00:03:36.720"
                  },
                  {
                    "word": "pigs",
                    "startTime": "00:03:36.740",
                    "endTime": "00:03:37.000"
                  },
                  {
                    "word": "try",
                    "startTime": "00:03:37.040",
                    "endTime": "00:03:37.200"
                  },
                  {
                    "word": "to",
                    "startTime": "00:03:37.220",
                    "endTime": "00:03:37.360"
                  }
                ]
              },
              {
                "text": "get at you park it like it's hot. P0ark it like it's hot.",
                "startTime": "00:03:37.380",
                "endTime": "00:03:40.430",
                "words": [
                  {
                    "word": "get",
                    "startTime": "00:03:37.380",
                    "endTime": "00:03:37.520"
                  },
                  {
                    "word": "at",
                    "startTime": "00:03:37.540",
                    "endTime": "00:03:37.680"
                  },
                  {
                    "word": "you",
                    "startTime": "00:03:37.700",
                    "endTime": "00:03:37.930"
                  },
                  {
                    "word": "park",
                    "startTime": "00:03:37.990",
                    "endTime": "00:03:38.160"
                  },
                  {
                    "word": "it",
                    "startTime": "00:03:38.180",
                    "endTime": "00:03:38.320"
                  },
                  {
                    "word": "like",
                    "startTime": "00:03:38.340",
                    "endTime": "00:03:38.480"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:03:38.500",
                    "endTime": "00:03:38.680"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:03:38.700",
                    "endTime": "00:03:39.130"
                  },
                  {
                    "word": "Park",
                    "startTime": "00:03:39.250",
                    "endTime": "00:03:39.480"
                  },
                  {
                    "word": "it",
                    "startTime": "00:03:39.500",
                    "endTime": "00:03:39.640"
                  },
                  {
                    "word": "like",
                    "startTime": "00:03:39.660",
                    "endTime": "00:03:39.800"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:03:39.820",
                    "endTime": "00:03:39.970"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:03:39.990",
                    "endTime": "00:03:40.430"
                  }
                ]
              },
              {
                "text": "Park it like a child get a attitude Pop it like it Pop",
                "startTime": "00:03:40.560",
                "endTime": "00:03:44.680",
                "words": [
                  {
                    "word": "Park",
                    "startTime": "00:03:40.560",
                    "endTime": "00:03:40.800"
                  },
                  {
                    "word": "it",
                    "startTime": "00:03:40.820",
                    "endTime": "00:03:40.960"
                  },
                  {
                    "word": "like",
                    "startTime": "00:03:40.980",
                    "endTime": "00:03:41.090"
                  },
                  {
                    "word": "a",
                    "startTime": "00:03:41.110",
                    "endTime": "00:03:41.240"
                  },
                  {
                    "word": "child",
                    "startTime": "00:03:41.260",
                    "endTime": "00:03:41.900"
                  },
                  {
                    "word": "get",
                    "startTime": "00:03:42.090",
                    "endTime": "00:03:42.400"
                  },
                  {
                    "word": "a",
                    "startTime": "00:03:42.420",
                    "endTime": "00:03:42.560"
                  },
                  {
                    "word": "attitude",
                    "startTime": "00:03:42.580",
                    "endTime": "00:03:43.130"
                  },
                  {
                    "word": "Pop",
                    "startTime": "00:03:43.190",
                    "endTime": "00:03:43.360"
                  },
                  {
                    "word": "it",
                    "startTime": "00:03:43.380",
                    "endTime": "00:03:43.520"
                  },
                  {
                    "word": "like",
                    "startTime": "00:03:43.540",
                    "endTime": "00:03:43.680"
                  },
                  {
                    "word": "it",
                    "startTime": "00:03:43.700",
                    "endTime": "00:03:44.250"
                  },
                  {
                    "word": "Pop",
                    "startTime": "00:03:44.410",
                    "endTime": "00:03:44.680"
                  }
                ]
              },
              {
                "text": "it like a Pop it like it's hot. I0 got the role of your and",
                "startTime": "00:03:44.700",
                "endTime": "00:03:48.280",
                "words": [
                  {
                    "word": "it",
                    "startTime": "00:03:44.700",
                    "endTime": "00:03:44.860"
                  },
                  {
                    "word": "like",
                    "startTime": "00:03:44.890",
                    "endTime": "00:03:45.010"
                  },
                  {
                    "word": "a",
                    "startTime": "00:03:45.030",
                    "endTime": "00:03:45.560"
                  },
                  {
                    "word": "Pop",
                    "startTime": "00:03:45.720",
                    "endTime": "00:03:46.000"
                  },
                  {
                    "word": "it",
                    "startTime": "00:03:46.020",
                    "endTime": "00:03:46.160"
                  },
                  {
                    "word": "like",
                    "startTime": "00:03:46.180",
                    "endTime": "00:03:46.320"
                  },
                  {
                    "word": "it's",
                    "startTime": "00:03:46.340",
                    "endTime": "00:03:46.490"
                  },
                  {
                    "word": "hot.",
                    "startTime": "00:03:46.510",
                    "endTime": "00:03:46.640"
                  },
                  {
                    "word": "I",
                    "startTime": "00:03:46.660",
                    "endTime": "00:03:46.820"
                  },
                  {
                    "word": "got",
                    "startTime": "00:03:46.850",
                    "endTime": "00:03:47.000"
                  },
                  {
                    "word": "the",
                    "startTime": "00:03:47.020",
                    "endTime": "00:03:47.130"
                  },
                  {
                    "word": "role",
                    "startTime": "00:03:47.150",
                    "endTime": "00:03:47.300"
                  },
                  {
                    "word": "of",
                    "startTime": "00:03:47.330",
                    "endTime": "00:03:47.430"
                  },
                  {
                    "word": "your",
                    "startTime": "00:03:47.440",
                    "endTime": "00:03:47.890"
                  },
                  {
                    "word": "and",
                    "startTime": "00:03:48.030",
                    "endTime": "00:03:48.280"
                  }
                ]
              },
              {
                "text": "I'm P.O.0 s0hawn down and up for best Cause I got it going",
                "startTime": "00:03:48.300",
                "endTime": "00:03:51.690",
                "words": [
                  {
                    "word": "I'm",
                    "startTime": "00:03:48.300",
                    "endTime": "00:03:48.480"
                  },
                  {
                    "word": "P.O.0",
                    "startTime": "00:03:48.500",
                    "endTime": "00:03:48.760"
                  },
                  {
                    "word": "shawn",
                    "startTime": "00:03:48.820",
                    "endTime": "00:03:49.110"
                  },
                  {
                    "word": "down",
                    "startTime": "00:03:49.160",
                    "endTime": "00:03:49.390"
                  },
                  {
                    "word": "and",
                    "startTime": "00:03:49.440",
                    "endTime": "00:03:49.620"
                  },
                  {
                    "word": "up",
                    "startTime": "00:03:49.650",
                    "endTime": "00:03:49.870"
                  },
                  {
                    "word": "for",
                    "startTime": "00:03:49.920",
                    "endTime": "00:03:50.100"
                  },
                  {
                    "word": "best",
                    "startTime": "00:03:50.130",
                    "endTime": "00:03:50.550"
                  },
                  {
                    "word": "Cause",
                    "startTime": "00:03:50.660",
                    "endTime": "00:03:50.930"
                  },
                  {
                    "word": "I",
                    "startTime": "00:03:50.950",
                    "endTime": "00:03:51.110"
                  },
                  {
                    "word": "got",
                    "startTime": "00:03:51.140",
                    "endTime": "00:03:51.260"
                  },
                  {
                    "word": "it",
                    "startTime": "00:03:51.280",
                    "endTime": "00:03:51.410"
                  },
                  {
                    "word": "going",
                    "startTime": "00:03:51.430",
                    "endTime": "00:03:51.690"
                  }
                ]
              },
              {
                "text": "on.",
                "startTime": "00:03:51.750",
                "endTime": "00:03:51.850",
                "words": [
                  {
                    "word": "on.",
                    "startTime": "00:03:51.750",
                    "endTime": "00:03:51.850"
                  }
                ]
              }
            ],
          },
          alpha: 1,
          originX: 0,
          originY: 0,
        }],
        targetFps: 30,
        totalDuration: 9000,
        resolution: {
          width: 1280,
          height: 720,
        },
      }
      const videoData = {
        buffer, 
        mimeType: 'video/mp4'
      }
      const fonts = [
      ]
      console.time('startJob')
      
      const ee = await window.startJob(job, videoData, fonts)
      console.log({ee})
      console.timeEnd('startJob')
      const bb = ee.map((d) => {
        d.parsedBuffer  = Array.from(new Uint8Array(d.buffer))
        return d
      })
      
      return bb
      
      } catch (error) {
        console.error(error)
        return error
      }
    }, url)
    result.map(r => {
      const currentFilePath = path.resolve(__dirname, `${outputRelativePath}/${r.index}.mp4`)
      fs.writeFileSync(currentFilePath, Buffer.from(r.parsedBuffer))
    })
    console.timeEnd('runPhaserGame')

    const files = fs.readdirSync(path.resolve(__dirname, outputRelativePath))
    
    // Concatenate the video files
    const finalOutputPath = path.resolve(__dirname, `${outputRelativePath}/final.mp4`);
    await concatenateVideos(files, finalOutputPath);
    console.log({finalOutputPath})
    await browser.close(); 
    process.exit(0)
}



runPhaserGame()
module.exports = {
}