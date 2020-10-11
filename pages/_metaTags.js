import Head from 'next/head'

function MetaTags({ Component, pageProps }) {
  return (
    <>
      <Head>
            <meta name="description" content="A site for my programming"/>
            <meta chartset="utf-8" />
            <meta name="viewport" content="width=device-width"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MetaTags