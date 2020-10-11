import Document, { Head, Main, Html, NextScript } from 'next/document';

export default class AppDocument extends Document {
    render() {
        return(
            <Html lang="en">
                <Head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"/>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />

                    <style global jsx>{`
                        html, body {
                            margin: 0;
                            padding: 0;
                            height: 100%;
                            font-family: 'Roboto', sans-serif;
                        }

                        #__next {
                            height: 100%;   
                        }

                        .container {
                            width: 900px;
                            margin: 0 auto;
                        }
                    `}</style>
                </body>
            </Html>
        )
    }
}