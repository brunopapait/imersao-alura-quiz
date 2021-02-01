import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();
  function submit(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  function changeName(e) {
    setName(e.target.value);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={submit}>
              <Input
                name={name}
                value={name}
                placeholder="Digite o seu nome"
                onChange={changeName}
              />
              <Button
                type="submit"
                disabled={name.length === 0}
              >
                Bora
                {' '}
                {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
              {
              db.external.map((item) => (
                <li key={Math.random()}>
                  <Widget.Topic
                    as={Link}
                    href={`/quiz/${item.replace(/\//g, '')
                      .replace('https:', '')
                      .replace('.vercel.app', '')
                      .split('.')
                      .reverse()
                      .join('/')
                      .replace('/', '___')}`}
                  >
                    {item.replace(/\//g, '')
                      .replace('https:', '')
                      .replace('.vercel.app', '')
                      .split('.')
                      .reverse()
                      .join('/')}
                  </Widget.Topic>
                </li>
              ))
            }
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omariosouto" />
    </QuizBackground>
  );
}
