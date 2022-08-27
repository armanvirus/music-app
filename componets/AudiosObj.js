class PlaylistItem {
    constructor(name, uri, id, title, duration) {
      this.name = name;
      this.uri = uri;
      this.id = id;
      this.title = title;
      this.duration = duration;
    }
  }
  export const AudiosObj =  [
           new PlaylistItem(
                "Maryam Remix",
                require('../Audio/A.mp3'),
                "a1",
                "Rabil Jos",
                "13:57"

            ),
            new PlaylistItem(
                "Rabil Remix+++ Ruhi",
                require('../Audio/B.mp3'),
                "b1",
                "Rabil Jos",
                "15:16"

            ),
            new PlaylistItem(
                "Rabil Gamuwa",
                require('../Audio/C.mp3'),
                "c1",
                "Rabil Jos",
                "06:30"

            ),
            new PlaylistItem(
                "Rabil Jos Harazimi",
                require('../Audio/D.mp3'),
                "d1",
                "Rabil Jos",
                "06:24"

            ),
            new PlaylistItem(
                "Zakiyyu ft Rabil",
                require('../Audio/E.mp3'),
                "e1",
                "Zakiyyu & Rabil",
                "07:03"

            )
        ]

        export default{
            AudiosObj
        }

