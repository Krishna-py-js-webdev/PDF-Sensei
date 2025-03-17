// main-chat.js (Modified to Send Request to Server)
"use client";
// import MermaidChart from "./MermaidChart";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
export function MainChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchAIResponse = async (userMessage) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`Server request failed with status ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data.response || "Sorry, I couldn't generate a response.";
    } catch (error) {
      setLoading(false);
      console.error("Error fetching AI response:", error);
      return "Error: Unable to fetch AI response.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiResponse = await fetchAIResponse(input);

    const aiMessage = { id: Date.now().toString(), role: "assistant", content: aiResponse };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <main className="relative flex-1 overflow-hidden bg-zinc-900">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <h1 className="text-4xl font-bold text-zinc-100">Hi, What can I do for you?</h1>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <Card className={`max-w-[80%] p-4 ${message.role === "user" ? "bg-emerald-500 text-white" : "bg-zinc-800"}`}>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                  </Card>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Card className="flex-1 p-4">
              <div className="flex items-center gap-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Write a prompt or try suggestions"
                  className="flex-1 bg-transparent outline-none text-white"
                />
              </div>
            </Card>
            <Button type="submit" size="icon" className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600" disabled={loading}>
              {loading ? "..." : <Send className="h-6 w-6" />}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
