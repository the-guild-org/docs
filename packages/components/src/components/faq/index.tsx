import {
  Children,
  cloneElement,
  ComponentProps,
  ComponentPropsWithoutRef,
  FC,
  ReactElement,
  ReactNode,
} from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { cn } from '../../cn';
import { Anchor } from '../anchor';
import { Heading } from '../heading';
import { AttachPageFAQSchema } from './attach-page-faq-schema';

const UnwrapChild: FC<{ children?: ReactNode }> = props => props.children;

const a: FC<ComponentPropsWithoutRef<'a'>> = props => (
  <Anchor
    className="hive-focus rounded underline hover:text-blue-700"
    {...props}
    href={props.href!}
  >
    {props.children}
  </Anchor>
);

const h2: FC<ComponentPropsWithoutRef<'h2'>> = props => (
  <Heading as="h2" size="md" className="basis-1/2" {...props} />
);

export const FrequentlyAskedQuestions: FC<
  ComponentProps<typeof AttachPageFAQSchema> & {
    className?: string;
    children: ReactElement;
  }
> = ({ className, faqPages, children }) => {
  return (
    <section
      className={cn(
        className,
        'flex flex-col gap-x-6 gap-y-2 px-4 py-6 text-green-1000 md:flex-row md:px-10 lg:gap-x-24 lg:px-[120px] lg:py-24',
      )}
    >
      <AttachPageFAQSchema faqPages={faqPages} />
      {cloneElement(children, {
        components: {
          a,
          h2,
          p: UnwrapChild,
          ul: Accordion,
          li: AccordionItem,
        },
      })}
    </section>
  );
};

const Accordion: FC<ComponentPropsWithoutRef<'ul'>> = props => (
  <RadixAccordion.Root asChild type="single" collapsible>
    <ul className="basis-1/2 divide-y divide-beige-400 max-xl:grow" {...props} />
  </RadixAccordion.Root>
);

const AccordionItem: FC<ComponentPropsWithoutRef<'li'>> = props => {
  const texts = Children.toArray(props.children).filter(child => child !== '\n');

  if (texts.length === 0) {
    return null;
  }

  if (texts.length < 2) {
    console.error(texts);
    throw new Error(`Expected a question and an answer, got ${texts.length} items`);
  }

  const [first, ...answers] = texts;

  const question =
    typeof first === 'string'
      ? first
      : typeof first === 'object' && 'type' in first
        ? first.props.children
        : null;

  if (!question) return null;

  return (
    <RadixAccordion.Item
      asChild
      value={question}
      className="data-[state=open]:pb-4 relative pb-0 focus-within:z-10"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <li>
        <RadixAccordion.Header>
          <RadixAccordion.Trigger className="hive-focus duration-[.8s] -mx-2 my-1 flex w-[calc(100%+1rem)] items-center justify-between rounded-xl bg-white px-2 py-3 text-left font-medium transition-colors hover:bg-beige-100/80 md:my-2 md:py-4">
            <span itemProp="name">{question}</span>
            <ChevronDownIcon className="size-5 [[data-state='open']_&]:[transform:rotateX(180deg)]" />
          </RadixAccordion.Trigger>
        </RadixAccordion.Header>
        <RadixAccordion.Content
          forceMount
          className="overflow-hidden bg-white text-green-800 data-[state=closed]:hidden"
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <div itemProp="text" className="space-y-2">
            {answers.map((answer, i) => (
              <p key={i}>{answer}</p>
            ))}
          </div>
        </RadixAccordion.Content>
      </li>
    </RadixAccordion.Item>
  );
};
