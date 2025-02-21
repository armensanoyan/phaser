const JOB = {
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
          text: "text per sentence line1\n text per sentence line2",
          startTime: "00:00:01",
          endTime: "00:00:9",
          words: [
            {
              word: "text",
              startTime: "00:00:01:000",
              endTime: "00:00:01:200",
            },
            {
              word: "per",
              startTime: "00:00:02:000",
              endTime: "00:00:02:200",
            },
            {
              word: "sentence",
              startTime: "00:00:03",
              endTime: "00:00:04",
            },
            {
              word: "line1\n",
              startTime: "00:00:04",
              endTime: "00:00:05",
            },
            {
              word: "text",
              startTime: "00:00:06",
              endTime: "00:00:07",
            },
            {
              word: "per",
              startTime: "00:00:07",
              endTime: "00:00:08",
            },
            {
              word: "sentence",
              startTime: "00:00:08",
              endTime: "00:00:09",
            },
          ],
        },
      ],
    },
    alpha: 1,
    originX: 0,
    originY: 0,
  }],
  targetFps: 31,
  totalDuration: 9000,
  resolution: {
    width: 1280,
    height: 720,
  },
}


const job24Sec = {
  id: "testJob",
  canvasObjects: [{
    id: "test",
    x: 960,
    y: 540,
    type: "caption",
    startAt: 0,
    endsAt: 24000,
    animations: [],
    visible: true,
    scaleX: 1,
    scaleY: 1,
    width: 0,
    height: 0,
    metadata: {
      styleData: {
        id: 1,
        animation: "appear",
        layout: "verse" ,
        positionX: "center",
        positionY: "center",
        backgroundStyle: {
          isEnabled: true,
          color: "#00ff00",
          opacity: 0.8,
          isRounded: true,
          type: "line",
        },
        shapeStyle: {
          isEnabled: false,
          color: "#0000ff",
          opacity: 0.1,
          isRounded: true,
        },
        textStyle: {
          fontFamily: "Arial",
          fontSize: 24,
          fontStyle: "bold",
          color: "#ffffff",
        },
        textHighlightStyle: {
          isEnabled: false,
          fontFamily: "Arial",
          color: "#FF0000",
        },
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
          text: "text per sentence line1 line11\ntext per sentence line2",
          startTime: "00:00:01",
          endTime: "00:00:12",
          words: [
            {
              word: "text",
              startTime: "00:00:01:000",
              endTime: "00:00:01:200",
            },
            {
              word: "per",
              startTime: "00:00:02:000",
              endTime: "00:00:02:200",
            },
            {
              word: "sentence",
              startTime: "00:00:03",
              endTime: "00:00:04",
            },
            {
              word: "line1",
              startTime: "00:00:04",
              endTime: "00:00:05",
            },
            {
              word: "line11\n",
              startTime: "00:00:05",
              endTime: "00:00:06",
            },
            {
              word: "text",
              startTime: "00:00:06",
              endTime: "00:00:07",
            },
            {
              word: "per",
              startTime: "00:00:07",
              endTime: "00:00:08",
            },
            {
              word: "sentence",
              startTime: "00:00:08",
              endTime: "00:00:09",
            },
            {
              word: "line2",
              startTime: "00:00:09",
              endTime: "00:00:11",
            },
          ],
        },
        {
          text: "text per sentence line1\n text per sentence line2",
          startTime: "00:00:13",
          endTime: "00:00:22",
          words: [
            {
              word: "text",
              startTime: "00:00:13",
              endTime: "00:00:14",
            },
            {
              word: "per",
              startTime: "00:00:14",
              endTime: "00:00:15",
            },
            {
              word: "sentence",
              startTime: "00:00:15",
              endTime: "00:00:16",
            },
            {
              word: "line3\n",
              startTime: "00:00:16",
              endTime: "00:00:17",
            },
            {
              word: "text",
              startTime: "00:00:17",
              endTime: "00:00:18",
            },
            {
              word: "per",
              startTime: "00:00:18",
              endTime: "00:00:19",
            },
            {
              word: "sentence",
              startTime: "00:00:19",
              endTime: "00:00:20",
            },
            {
              word: "line4",
              startTime: "00:00:20",
              endTime: "00:00:21",
            },
          ],
        },
      ],
    },
    alpha: 1,
    originX: 0,
    originY: 0,
  }],
  targetFps: 30,
  totalDuration: 24000,
  resolution: {
    width: 1280,
    height: 720,
  },
  maxAllowedWorkersCount: 12,
};


module.exports = {
  JOB,
  job24Sec
}