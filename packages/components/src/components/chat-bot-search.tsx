import { FormEvent, ReactElement, useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ISearchBarProps } from '../types/components';
import { toggleLockBodyScroll } from '../helpers/modals';
import clsx from 'clsx';
import { Modal } from './modal';

interface ChatBotFormElements extends HTMLFormControlsCollection {
  question: HTMLInputElement;
}

interface ChatBotForm extends HTMLFormElement {
  readonly elements: ChatBotFormElements;
}

export interface ChatBotSearchProps extends ISearchBarProps {
  apiURL: string;
  sampleQuestion?: string[];
}
export const ChatBotSearch = ({
  accentColor,
  title,
  placeholder,
  isFull,
  onHandleModal,
  className,
  apiURL,
  sampleQuestion,
}: ChatBotSearchProps): ReactElement => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = useCallback(
    (state: boolean) => {
      toggleLockBodyScroll(state);
      setModalOpen(state);
      onHandleModal?.(state);

      setAnswer('');
      setError('');
      setLoading(false);
    },
    [onHandleModal],
  );

  const runPrompt = (question: string) => {
    if (!question) return;

    setLoading(true);
    fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify({ question }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async response => response.json())
      .then(data => {
        setAnswer(data.answer);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <button
        className={clsx(
          `
        inline-block
        items-center
        rounded-md
        border-transparent
        bg-gray-100
        p-1
        px-2
        text-sm
        text-gray-600
        outline-none
        transition
        focus:ring
        dark:bg-gray-700
        dark:text-gray-200
        `,
          isFull && '!md:p-2 !m-0 w-full',
          className,
        )}
        style={{ '--accentColor': accentColor }}
        onClick={() => handleModal(true)}
      >
        🪄 <span className="hidden pl-0.5 sm:inline">Ask AI</span>
      </button>

      <Modal title={title} visible={modalOpen} placement="top" onCancel={() => handleModal(false)}>
        <div className="mb-4 flex w-full flex-row items-center space-x-2">
          {sampleQuestion?.map((question, index) => (
            <button
              key={index}
              className="
              inline-flex
              h-6
              grow-0
              items-center
              rounded-md
              bg-gray-100
              px-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:opacity-80
              "
              onClick={() => runPrompt(question)}
            >
              {question}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e: FormEvent<ChatBotForm>) => {
            e.preventDefault();
            const question = e.currentTarget.elements.question.value;
            runPrompt(question);
          }}
        >
          <div className="flex items-center rounded-md bg-gray-200 p-2.5 dark:bg-gray-700">
            <input
              name="question"
              type="text"
              placeholder={placeholder}
              className="w-full rounded-md border-0 bg-inherit p-2 text-sm font-medium text-black outline-none hover:outline-none focus:outline-none dark:text-gray-50"
            />
            <button
              type="submit"
              className="
              flex
              h-7
              w-16
              items-center
              rounded-md
              bg-gray-100
              px-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:opacity-80
              "
            >
              {loading ? (
                <div className="flex w-full justify-center gap-2">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-600" />
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-600" />
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-600" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1">→ Run</div>
              )}
            </button>
          </div>
        </form>
        <div className="pt-4 text-sm">
          {answer && <ReactMarkdown>{answer}</ReactMarkdown>}
          {error && <div>Error: {error}</div>}
        </div>
      </Modal>
    </>
  );
};
