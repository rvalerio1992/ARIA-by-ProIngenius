import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: string[];
}

interface CopilotPanelProps {
  className?: string;
}

export function CopilotPanel({ className }: CopilotPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "¡Hola! Soy tu asistente bancario Premium. Puedo ayudarte con políticas, productos, procedimientos y generar guiones para tus clientes. ¿En qué puedo ayudarte hoy?",
      timestamp: "10:30",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Entiendo tu consulta. Basándome en las políticas internas, te recomiendo...",
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        sources: ["Política de Inversión 2024", "Manual de Productos Premium"],
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  return (
    <Card className={cn("flex flex-col h-[600px]", className)}>
      <CardHeader className="border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Copiloto IA
          <Badge variant="outline" className="ml-auto gap-1">
            <Sparkles className="h-3 w-3" />
            Premium
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex flex-col gap-2",
              message.role === "user" ? "items-end" : "items-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-md p-3 text-sm",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <p>{message.content}</p>
              {message.sources && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs opacity-70">Fuentes:</p>
                  {message.sources.map((source, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs mr-1">
                      {source}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex gap-2 w-full">
          <Textarea
            placeholder="Pregunta sobre políticas, productos o solicita un guión..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="min-h-[60px] resize-none"
            data-testid="input-copilot-message"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="h-[60px] w-[60px]"
            data-testid="button-send-message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
