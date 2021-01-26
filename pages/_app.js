import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../style/GlobalStyle';
import db from '../db.json';

const theme = db.theme;
export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
      <GlobalStyle/>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
