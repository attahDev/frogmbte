import { Bot } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMentorChat } from '../../../contexts/mentorChatContext';
import BusinessMentorChat from './ChatSideBar';

export default function ChatSideBarPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { setMobileMentorChatOpen } = useMentorChat();

  useEffect(() => {
    setMobileMentorChatOpen(isOpen);
    return () => setMobileMentorChatOpen(false);
  }, [isOpen, setMobileMentorChatOpen]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className="hidden min-w-0 xl:block xl:sticky xl:top-6 xl:self-start">
        <BusinessMentorChat />
      </div>

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-4 z-40 flex items-center gap-2 rounded-full bg-[#001F3F] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(0,31,63,0.35)] transition hover:bg-[#002a57] active:scale-95 xl:hidden"
          aria-label="Open business mentor chat"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD23F] text-[#001F3F]">
            <Bot className="h-4 w-4" />
          </span>
          Ask Mentor
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F2F2EE] xl:hidden">
          <BusinessMentorChat onClose={() => setIsOpen(false)} isMobileOverlay />
        </div>
      )}
    </>
  );
}
