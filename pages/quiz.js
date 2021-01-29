import React, { useEffect, useState } from 'react';
import { SemipolarLoading } from 'react-loadingg';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

function ResultWidget({ result }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {result.filter((x) => x).length}
          {' '}
          perguntas.
        </p>
        <ul>
          {
            result.map((item, index) => (
              <li key={Math.random()}>
                Questão nº
                {' '}
                {index + 1}
                :
                {' '}
                {
                  item ? 'Acertou' : 'Errou'
                }
              </li>
            ))
          }
        </ul>
      </Widget.Content>
    </Widget>
  );
}

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
  question, totalQuestions, questionIndex, handleSubmit, addResult,
}) {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const isCorrect = selectedAlternative === question.answer;
  return (
    <>
      <Widget>
        <Widget.Header>
          <h3>
            Pergunta
            {' '}
            {questionIndex + 1}
            {' '}
            de
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
            setIsFormSubmit(true);
            setTimeout(() => {
              addResult(isCorrect);
              handleSubmit();
              setIsFormSubmit(false);
              setSelectedAlternative(undefined);
            }, 1500);
          }}
          >
            {question.alternatives.map((alternative, index) => (
              <Widget.Topic
                as="label"
                key={Math.random()}
                htmlFor={index}
              >
                <input
                  type="radio"
                  name={questionIndex}
                  id={index}
                  value={index}
                  checked={selectedAlternative === index}
                  onChange={() => {
                    setSelectedAlternative(index);
                  }}
                />
                {alternative}
              </Widget.Topic>
            ))}
            <Button type="submit" disabled={selectedAlternative === undefined}>
              Confirmar
            </Button>
          </form>
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
  const question = db.questions;
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [results, setResults] = useState([]);

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

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
              question={question[questionIndex]}
              handleSubmit={handleSubmit}
              addResult={addResult}
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
            <ResultWidget result={results} />
          )
        }
      </QuizContainer>
    </QuizBackground>
  );
}
