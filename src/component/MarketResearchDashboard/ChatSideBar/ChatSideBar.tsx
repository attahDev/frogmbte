import { Bot, Circle, Send, X } from 'lucide-react';
import AIDashboardButton from '../ui/AIDashboardButton';
import AIDashboardCard from '../ui/AIDashboardCard';

const prompts = [
  'I want to start a business...',
  'Pricing strategy',
  'What business strategy can i adopt?',
];

type Props = {
  onClose?: () => void;
  isMobileOverlay?: boolean;
};

export default function BusinessMentorChat({ onClose, isMobileOverlay = false }: Props) {
  const messages = [
    {
      id: 1,
      role: 'assistant',
      text: "Hi! I'm your AI business mentor. How can I help you build your business today?",
      time: '10:30 AM',
    },
    {
      id: 2,
      role: 'user',
      text: 'I want to start an AI fitness coaching app. Is it a good idea?',
      time: '10:31 AM',
    },
    {
      id: 3,
      role: 'assistant',
      text: "Great pick! Heres a quick read 📈 Market Demand: High ⚡ Competition: Medium 💰 Startup Cost: Low-Medium",
      time: '',
    },
  ];
  return (
    <AIDashboardCard
      variant="mentor"
      padding="none"
      className={`flex min-h-0 flex-col overflow-hidden ${
        isMobileOverlay ? 'h-full rounded-none border-0 shadow-none' : 'h-full'
      }`}
    >
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 py-3 sm:py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFD23F] text-[#001F3F] shadow-sm sm:h-12 sm:w-12">
          <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-[#001F3F] sm:text-base">
            Hi, I'm your Business Mentor
          </h3>
          <div className="mt-0.5 flex items-center gap-2 text-xs font-medium text-emerald-600 sm:mt-1 sm:text-sm">
            <Circle className="h-2.5 w-2.5 fill-emerald-500 text-emerald-500 sm:h-3 sm:w-3" />
            Online
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#001F3F] transition hover:bg-slate-100"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="scrollbar-hide min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:space-y-4 sm:px-4 sm:py-4">
        {messages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                  isUser
                    ? 'bg-[#001F3F] text-white rounded-br-md'
                    : 'bg-[#D8D7DF] text-[#001F3F] rounded-bl-md'
                }`}
              >
                <p className="whitespace-pre-line font-medium">{message.text}</p>
                {message.time && (
                  <p className={`mt-1 text-xs ${isUser ? 'text-white/65' : 'text-slate-500'}`}>
                    {message.time}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="shrink-0 border-t border-slate-200 px-3 py-3 sm:px-4 sm:py-4">
        <p className="mb-2 text-xs font-semibold text-slate-500 sm:mb-3 sm:text-sm">Suggested Prompts</p>
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              className="shrink-0 rounded-full bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-300 sm:px-4 sm:py-2 sm:text-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-slate-200 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4">
        <input
          className="h-10 min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#001F3F] sm:h-12 sm:px-4"
          placeholder="Ask anything about your business..."
        />
        <AIDashboardButton className="h-10 w-10 shrink-0 rounded-full p-0 sm:h-12 sm:w-12" aria-label="Send message">
          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
        </AIDashboardButton>
      </div>
    </AIDashboardCard>
  );
}