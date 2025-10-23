import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface CopilotPanelProps {
  className?: string;
}

export function CopilotPanel({ className }: CopilotPanelProps) {
  const initialMessage: Message = {
    id: "1",
    role: "assistant",
    content: "¡Hola! Soy **ARIA**, tu Agente de Relación Inteligente Automatizado. Puedo responder preguntas sobre tu cartera de clientes de Promerica usando datos reales de la base de datos.\n\nPregúntame sobre:\n- Estadísticas generales de la cartera\n- Búsqueda de clientes por criterios\n- Análisis de segmentos y productos\n- Métricas de saldos y productos\n- Información de clientes específicos\n\n¿Qué te gustaría saber?",
    timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
  };
  
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");

  const chatMutation = useMutation({
    mutationFn: async (question: string) => {
      const res = await apiRequest("POST", "/api/aria/ask", { message: question });
      return await res.json() as { message: string };
    },
    onSuccess: (data) => {
      const response: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, response]);
    },
    onError: (error) => {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Lo siento, ocurrió un error al procesar tu pregunta. Por favor intenta nuevamente.",
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Chat error:", error);
    },
  });

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    const question = input;
    setInput("");
    
    chatMutation.mutate(question);
  };

  return (
    <Card className={cn("flex flex-col h-[600px]", className)}>
      <CardHeader className="border-b bg-gradient-to-r from-accent/10 to-transparent gap-1 space-y-0 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent animate-pulse" />
          ARIA Responde
          <Badge variant="outline" className="ml-auto gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            En línea
          </Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          IA Conversacional · Consulta tu cartera de clientes en lenguaje natural
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
            data-testid={`message-${message.role}`}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-md p-3 text-sm whitespace-pre-wrap",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {message.role === "assistant" ? (
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(
                      message.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br />'),
                      {
                        ALLOWED_TAGS: ['strong', 'em', 'br', 'p', 'ul', 'ol', 'li', 'code', 'pre'],
                        ALLOWED_ATTR: []
                      }
                    )
                  }}
                />
              ) : (
                <p>{message.content}</p>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
          </div>
        ))}
        {chatMutation.isPending && (
          <div className="flex items-start gap-2">
            <div className="bg-muted rounded-md p-3 text-sm flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-accent" />
              <span className="text-muted-foreground">ARIA está pensando...</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-accent" />
            <span>Pregúntale a ARIA sobre tu cartera usando lenguaje natural</span>
          </div>
          <div className="flex gap-2 w-full">
            <Textarea
              placeholder="Ej: ¿Cuántos clientes tengo del sector público con ingresos mayores a 5000?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="min-h-[60px] resize-none"
              disabled={chatMutation.isPending}
              data-testid="input-copilot-message"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="h-[60px] w-[60px]"
              disabled={chatMutation.isPending || !input.trim()}
              data-testid="button-send-message"
            >
              {chatMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
