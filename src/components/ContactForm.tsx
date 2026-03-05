"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xkoqwgvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tu nombre"
        required
        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Tu email"
        required
        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Tu mensaje"
        rows={4}
        required
        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all hover:scale-[1.02]"
      >
        {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
      </button>

      {/* Mensaje de éxito */}
      {status === "success" && (
        <div className="p-4 bg-green-600/20 border border-green-600 rounded-lg text-green-400 text-center">
          ✓ ¡Mensaje enviado correctamente! Te responderé pronto.
        </div>
      )}

      {/* Mensaje de error */}
      {status === "error" && (
        <div className="p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400 text-center">
          ✗ Error al enviar. Por favor, intenta de nuevo o contáctame directamente por email.
        </div>
      )}
    </form>
  );
}
