import Document, { Head, Main, Html, NextScript } from 'next/document';

export default class AppDocument extends Document {
    render() {
        return(
            <Html lang="en">
                <Head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"/>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap" rel="stylesheet" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                    
                </Head>
                <body>
                    <Main />
                    <NextScript />

                    <style global jsx>{`
                        :root {
                            --background-color: #C0E5DC;
                            --background-pale-color: #ebf2f0;
                            --dark-color: #333;
                            --accent-color: #4CB493;
                            --light-color: #BDBDBD;
                        }

                        html, body {
                            margin: 0;
                            padding: 0;
                            height: 100%;
                            font-family: 'Roboto', sans-serif;
                            background-color: var(--background-color);
                            color: var(--dark-color);
                        }

                        a {
                            text-decoration: none;
                            color: var(--accent-color);
                        }

                        #__next {
                            height: 100%;   
                        }

                        .container {
                            width: 900px;
                            margin: 0 auto;
                        }

                        .accent-text {
                            color: var(--accent-color);
                        }

                        #nprogress .bar {
                            background: var(--accent-color);
                        }

                        #nprogress .spinner-icon {
                            border-top-color: var(--accent-color);
                            border-left-color: var(--accent-color);
                        }

                        #nprogress .peg {
                            box-shadow: 0 0 10px var(--accent-color), 0 0 5px var(--accent-color);
                        }
                    `}</style>
                </body>
            </Html>
        )
    }
}