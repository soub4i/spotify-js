import { useState, useEffect } from 'react'

import { useSpotify } from '../../spotifyjs/dist';


export default function Index() {

  const [songs, setSongs] = useState(null)

  const { client } = useSpotify(
    {
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
    }
  )


  useEffect(_ => {
    const fetchData = async (_) => {
      const songs = await client.search('Für Elise');
      setSongs(songs)
    }
    fetchData()

  }, [])



  return (
    <main>
      <style jsx global>{`
        body {
          font-family: sans-serif;
          padding: 0;
          margin: 0;
        }

        main {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1em 0;
        }

        h1 {
          font-size: 2em;
        }

        pre {
          overflow: auto;
          max-height: 15em;
          background-color: #eeeeee;
          padding: 1em;
        }

        section,
        footer {
          width: 100%;
          max-width: 50em;
          margin: 0 auto;
        }

      `}</style>

      <section>
        <pre>
          {JSON.stringify(songs)}
        </pre>
      </section>

    </main>
  );

}