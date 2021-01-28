import React, { useEffect, useState } from 'react';
import { SemipolarLoading } from 'react-loadingg';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <SemipolarLoading style={{
          position: 'relative',
          display: 'flex',
          margin: 'auto',
        }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, handleSubmit,
}) {
  return (
    <>
      <Widget>
        <Widget.Header>
          <h3>
            Pergunta 1 de
            {' '}
            {` ${totalQuestions} `}
          </h3>
        </Widget.Header>
        <img
          src={question.image}
          alt="descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>
          <p>
            {question.description}
          </p>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          >
            {question.alternatives.map((alternative, index) => (
              <div key={Math.random()}>
                <Widget.Topic
                  as="label"
                  htmlFor={index}
                >
                  <input type="radio" name={`question__${questionIndex}`} id={index} />
                  {alternative}
                </Widget.Topic>
              </div>
            ))}

            <Button type="submit">
              Confirmar
            </Button>
          </form>
        </Widget.Content>
      </Widget>

      <Widget>
        <Widget.Content>
          <h1>Quizes da Galera</h1>
          <p>lorem ipsum dolor sit amet...</p>
        </Widget.Content>
      </Widget>
    </>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const question = db.questions[1];
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1500);
  }, []);

  function handleSubmit() {
    if (questionIndex + 1 < db.questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {
          screenState === screenStates.QUIZ && (
            <QuestionWidget
              questionIndex={questionIndex}
              totalQuestions={db.questions.length}
              question={question}
              handleSubmit={handleSubmit}
            />
          )
        }
        {
          screenState === screenStates.LOADING && (
            <LoadingWidget />
          )
        }
        {
          screenState === screenStates.RESULT && (
            <div>Parabéns você venceu ..</div>
          )
        }
      </QuizContainer>
    </QuizBackground>
  );
}
