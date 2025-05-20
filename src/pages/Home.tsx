import { useAuth0 } from "@auth0/auth0-react";
import Welcome from "../components/Welcome";
import Chat from "../components/Chat";
import MessageInput from "../components/MessageInput";
import { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Flex } from "antd";

const Home = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [showWelcome, setShowWelcome] = useState(true);
  const { messages, loading, handleSend, fetchHistory, initialized } = useChat();

  useEffect(() => {
    const fetch = async () => {
      const token = await getAccessTokenSilently();
      await fetchHistory(token);
    };
    if (isAuthenticated && !initialized) {
      fetch();
    }
  }, [isAuthenticated, initialized, getAccessTokenSilently, fetchHistory]);

  useEffect(() => {
    if (messages.length > 0) setShowWelcome(false);
  }, [messages]);

  const handleSendWithWelcome = async (msg: string) => {
    if (showWelcome) setShowWelcome(false);
    const token = await getAccessTokenSilently();
    await handleSend(msg, token);
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <span style={{ fontSize: "1.125rem", fontWeight: 600, color: "#4a5568" }}>Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6fa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem 0" }}>
      {showWelcome ? (
        <Flex
          style={{
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            paddingInline: "1rem",
          }}
        >
          <Welcome />
          <MessageInput onSend={handleSendWithWelcome} loading={loading} />
        </Flex>
      ) : (
        <div style={{ width: "100%", maxWidth: 1024, marginTop: 16 }}>
          <Chat messages={messages.map(m => ({ sender: m.role, message: m.content, timestamp: m.timestamp }))} onSend={handleSendWithWelcome} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default Home;
