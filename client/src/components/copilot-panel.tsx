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
      content: "¡Hola María! Soy ARIA, tu Agente de Relación Inteligente Autónoma. Estoy entrenada con todo el conocimiento del banco: políticas, productos, procedimientos y mejores prácticas. Puedo generar guiones de venta, redactar emails, responder sobre normativas y sugerir estrategias. ¿Cómo puedo asistirte hoy?",
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
      <CardHeader className="border-b bg-gradient-to-r from-accent/10 to-transparent">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent animate-pulse" />
          ARIA Copiloto
          <Badge variant="outline" className="ml-auto gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            En línea
          </Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          IA Generativa · Entrenada con conocimiento bancario completo
        </p>
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
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-accent" />
            <span>ARIA puede citar políticas, generar contenido y responder consultas</span>
          </div>
          <div className="flex gap-2 w-full">
            <Textarea
              placeholder="Ej: Genera un guión para ofrecer fondos ESG a un cliente conservador..."
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
        </div>
      </CardFooter>
    </Card>
  );
}
