import {
  Mail,
  MessageCircle,
  Phone,
  SendHorizonal,
  UserRound,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { buildWhatsAppLink } from '../siteConfig';
import { openUrlForCurrentDevice } from '../utils/navigation';

const qaItems = [
  {
    question: 'What services does Scoot handle?',
    answer:
      'Scoot can help with tour packages, college trips, resort stays, bus bookings, and custom travel planning.',
  },
  {
    question: 'How do I plan a trip with Scoot?',
    answer:
      'Start with your dates, destination idea, group size, and budget preference. Scoot will guide you from there and help shape the right plan.',
    actions: [
      {
        label: 'Plan on WhatsApp',
        href: buildWhatsAppLink('Hello Scoot Vacations, I want help planning a trip.'),
        icon: 'whatsapp',
      },
    ],
  },
  {
    question: 'Do you arrange college trips?',
    answer:
      'Yes. Scoot arranges college trips with planning, stays, transport, and overall coordination.',
  },
  {
    question: 'Can I book only transport or only stay?',
    answer:
      'Yes. You can book only transport, only stay, or combine both into a complete trip plan.',
  },
  {
    question: 'How do I contact Scoot quickly?',
    answer:
      'The fastest option is WhatsApp. You can also call Scoot directly or send an email.',
    actions: [
      {
        label: 'WhatsApp',
        href: buildWhatsAppLink('Hello Scoot Vacations, I want to get in touch.'),
        icon: 'whatsapp',
      },
      {
        label: 'Call +91 94464 82881',
        href: 'tel:+919446482881',
        icon: 'phone',
      },
      {
        label: 'Email Scoot',
        href: 'mailto:scootvacations@gmail.com',
        icon: 'mail',
      },
    ],
  },
];

const createMessage = ({ id, role, text, actions = [] }) => ({
  id,
  role,
  text,
  actions,
  timestamp: 'Just now',
});

const renderActionIcon = (icon) => {
  if (icon === 'phone') {
    return <Phone size={14} />;
  }

  if (icon === 'mail') {
    return <Mail size={14} />;
  }

  return <MessageCircle size={14} />;
};

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [queuedQuestion, setQueuedQuestion] = useState(null);
  const [seenLabel, setSeenLabel] = useState('');
  const [animatedOutQuestion, setAnimatedOutQuestion] = useState(null);
  const timeoutRef = useRef(null);
  const messagesRef = useRef(null);
  const hasOpenedOnceRef = useRef(false);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen || hasOpenedOnceRef.current) {
      return undefined;
    }

    hasOpenedOnceRef.current = true;
    setIsTyping(true);

    timeoutRef.current = window.setTimeout(() => {
      setMessages([
        createMessage({
          id: 'welcome',
          role: 'bot',
          text: 'Hi, welcome to Scoot. Pick a question below and I will help you with it.',
        }),
      ]);
      setIsTyping(false);
      setSeenLabel('Active now');
    }, 1100);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  const askedQuestions = useMemo(
    () =>
      new Set(
        messages.filter((message) => message.role === 'user').map((message) => message.text)
      ),
    [messages]
  );

  const contactQuestion = 'How do I contact Scoot quickly?';
  const availableQuestions = qaItems.filter(
    (item) => !askedQuestions.has(item.question)
  );
  const priorityQuestion = availableQuestions.find(
    (item) => item.question === contactQuestion
  );
  const secondaryQuestions = availableQuestions.filter(
    (item) => item.question !== contactQuestion
  );
  const visibleQuestions = priorityQuestion
    ? [priorityQuestion, ...secondaryQuestions.slice(0, 2)]
    : secondaryQuestions.slice(0, 3);

  const handleQuestionClick = (item) => {
    if (isTyping) {
      return;
    }

    setAnimatedOutQuestion(item.question);
    setQueuedQuestion(item.question);
    setActiveQuestion(item);
    timeoutRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        createMessage({
          id: `user-${item.question}`,
          role: 'user',
          text: item.question,
        }),
      ]);
      setAnimatedOutQuestion(null);
      setQueuedQuestion(null);
      setSeenLabel('');
      setIsTyping(true);

      timeoutRef.current = window.setTimeout(() => {
        setMessages((current) => [
          ...current,
          createMessage({
            id: `bot-${item.question}`,
            role: 'bot',
            text: item.answer,
            actions: item.actions ?? [],
          }),
        ]);
        setIsTyping(false);
        setSeenLabel('Seen just now');
      }, 1650);
    }, 220);
  };

  const whatsappMessage = activeQuestion
    ? `Hello Scoot Vacations, I have a question: ${activeQuestion.question}`
    : undefined;
  const lastBotMessageId = [...messages]
    .reverse()
    .find((message) => message.role === 'bot')?.id;

  return (
    <div className={`chatbot-widget${isOpen ? ' is-open' : ''}`}>
      <div className={`chatbot-panel${isOpen ? ' is-visible' : ''}`} aria-hidden={!isOpen}>
        <div className="chatbot-panel-head">
          <div className="chatbot-identity">
            <div className="chatbot-avatar" aria-hidden="true">
              <img src="/Scoot Favicon.png" alt="" className="chatbot-avatar-image" />
            </div>
            <div>
              <div className="chatbot-kicker">Scoot Assistant</div>
              <h3>
                <span className="chatbot-status-dot" aria-hidden="true" />
                Online now
              </h3>
            </div>
          </div>

          <div className="chatbot-head-actions">
            <a
              href="tel:+919446482881"
              className="chatbot-head-action"
              aria-label="Call Scoot Vacations"
            >
              <Phone size={16} />
            </a>

            <button
              type="button"
              className="chatbot-close"
              aria-label="Close chat widget"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div ref={messagesRef} className="chatbot-messages" role="log" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chatbot-message chatbot-message-${message.role}`}
            >
              {message.role === 'bot' ? (
                <>
                  <div className="chatbot-thread-avatar chatbot-thread-avatar-bot">
                    <img
                      src="/Scoot Favicon.png"
                      alt=""
                      className="chatbot-thread-avatar-image"
                    />
                  </div>
                  <div className="chatbot-bubble-shell">
                    <div className="chatbot-bubble">
                      <div>{message.text}</div>
                      {message.actions?.length ? (
                        <div className="chatbot-bubble-actions">
                          {message.actions.map((action) => (
                            <a
                              key={action.label}
                              href={action.href}
                              target={action.href.startsWith('http') ? '_blank' : undefined}
                              rel={action.href.startsWith('http') ? 'noreferrer' : undefined}
                              className="chatbot-bubble-action"
                              onClick={(event) =>
                                action.href.startsWith('http')
                                  ? openUrlForCurrentDevice(event, action.href)
                                  : undefined
                              }
                            >
                              {renderActionIcon(action.icon)}
                              <span>{action.label}</span>
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div className="chatbot-meta">
                      <span>{message.timestamp}</span>
                      {message.id === lastBotMessageId && seenLabel ? (
                        <span>{seenLabel}</span>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="chatbot-bubble-shell chatbot-bubble-shell-user">
                    <div className="chatbot-bubble">{message.text}</div>
                    <div className="chatbot-meta chatbot-meta-user">
                      <span>{message.timestamp}</span>
                    </div>
                  </div>
                  <div className="chatbot-thread-avatar chatbot-thread-avatar-user">
                    <UserRound size={15} />
                  </div>
                </>
              )}
            </div>
          ))}

          {isTyping ? (
            <div className="chatbot-message chatbot-message-bot">
              <div className="chatbot-thread-avatar chatbot-thread-avatar-bot">
                <img src="/Scoot Favicon.png" alt="" className="chatbot-thread-avatar-image" />
              </div>
              <div className="chatbot-bubble-shell">
                <div
                  className="chatbot-bubble chatbot-bubble-typing"
                  aria-label="Scoot is typing"
                >
                  <span />
                  <span />
                  <span />
                </div>
                <div className="chatbot-meta">
                  <span>Typing…</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="chatbot-compose">
          {visibleQuestions.length ? (
            <div className="chatbot-chip-list" role="list">
              {visibleQuestions.map((item) => (
                <button
                  key={item.question}
                  type="button"
                  className={`chatbot-chip${
                    animatedOutQuestion === item.question ? ' is-disappearing' : ''
                  }${queuedQuestion === item.question ? ' is-locked' : ''}`}
                  onClick={() => handleQuestionClick(item)}
                >
                  {item.question}
                </button>
              ))}
            </div>
          ) : null}

          <a
            href={buildWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="chatbot-whatsapp"
            onClick={(event) =>
              openUrlForCurrentDevice(
                event,
                buildWhatsAppLink(whatsappMessage)
              )
            }
          >
            <span>Continue on WhatsApp</span>
            <SendHorizonal size={15} />
          </a>
        </div>
      </div>

      <button
        type="button"
        className="chatbot-trigger"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat widget' : 'Open chat widget'}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        <span>Chat</span>
      </button>
    </div>
  );
}

export default ChatbotWidget;
