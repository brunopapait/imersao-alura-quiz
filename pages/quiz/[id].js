import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExternal }) {
  return (
    <ThemeProvider theme={dbExternal.theme}>
      <QuizScreen externalQuestions={dbExternal.questions} externalBg={dbExternal.bg} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [githubUser, projectName] = context.query.id.split('___');
  const dbExternal = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Falha na requisição');
  }).then((response) => response).catch((error) => {
    console.log(error);
  });
  return {
    props: { dbExternal },
  };
}
