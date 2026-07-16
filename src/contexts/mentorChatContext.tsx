import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type MentorChatContextValue = {
  isMobileMentorChatOpen: boolean;
  setMobileMentorChatOpen: (open: boolean) => void;
};

const MentorChatContext = createContext<MentorChatContextValue | null>(null);

export function MentorChatProvider({ children }: { children: ReactNode }) {
  const [isMobileMentorChatOpen, setMobileMentorChatOpen] = useState(false);

  const value = useMemo(
    () => ({ isMobileMentorChatOpen, setMobileMentorChatOpen }),
    [isMobileMentorChatOpen]
  );

  return (
    <MentorChatContext.Provider value={value}>{children}</MentorChatContext.Provider>
  );
}

export function useMentorChat() {
  const context = useContext(MentorChatContext);
  if (!context) {
    return {
      isMobileMentorChatOpen: false,
      setMobileMentorChatOpen: () => {},
    };
  }
  return context;
}
