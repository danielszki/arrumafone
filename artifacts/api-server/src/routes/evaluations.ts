import { Router, type IRouter } from "express";
import {
  SendEvaluationBody as SendEvaluationBodySchema,
  SendEvaluationResponse,
} from "@workspace/api-zod";
import type { EvaluationInput } from "@workspace/api-zod";

const router: IRouter = Router();
const RESEND_URL = "https://api.resend.com/emails";
const SUCCESS_MESSAGE =
  "Avaliação enviada com sucesso! Entraremos em contato em breve.";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmailText(fields: EvaluationInput): string {
  return [
    "Nova avaliação recebida - ArrumaFone",
    "",
    `Nome: ${fields.name}`,
    `Telefone / WhatsApp: ${fields.phone}`,
    `E-mail: ${fields.email}`,
    `Aparelho: ${fields.model}`,
    `Problema / defeito: ${fields.problem}`,
    `Preferência de atendimento: ${fields.preference}`,
    `Observações: ${fields.notes || "Não informado"}`,
  ].join("\n");
}

function buildEmailHtml(fields: EvaluationInput): string {
  const rows = [
    ["Nome", fields.name],
    ["Telefone / WhatsApp", fields.phone],
    ["E-mail", fields.email],
    ["Aparelho", fields.model],
    ["Problema / defeito", fields.problem],
    ["Preferência de atendimento", fields.preference],
    ["Observações", fields.notes || "Não informado"],
  ]
    .map(
      ([label, value]) =>
        `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<h1>Nova avaliação recebida - ArrumaFone</h1><table style="border-collapse:collapse">${rows}</table>`;
}

router.post("/evaluations", async (req, res): Promise<void> => {
  const parsed = SendEvaluationBodySchema.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.flatten() }, "Invalid evaluation submission");
    res.status(400).json({ error: "Preencha todos os campos obrigatórios corretamente." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.EVALUATION_TO_EMAIL;
  const sender = process.env.EVALUATION_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    req.log.error(
      {
        hasApiKey: Boolean(apiKey),
        hasRecipient: Boolean(recipient),
        hasSender: Boolean(sender),
      },
      "Evaluation email service is not configured",
    );
    res.status(503).json({ error: "O envio de e-mail ainda não está configurado." });
    return;
  }

  const fields = parsed.data;

  try {
    const providerResponse = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: fields.email,
        subject: "Nova avaliação recebida - ArrumaFone",
        text: buildEmailText(fields),
        html: buildEmailHtml(fields),
      }),
    });

    if (!providerResponse.ok) {
      const providerError = await providerResponse.text();
      req.log.error(
        { status: providerResponse.status, providerError: providerError.slice(0, 500) },
        "Email provider rejected evaluation",
      );
      res.status(502).json({ error: "Não foi possível enviar a avaliação agora. Tente novamente." });
      return;
    }

    const response = SendEvaluationResponse.parse({
      success: true,
      message: SUCCESS_MESSAGE,
    });
    res.json(response);
  } catch (error) {
    req.log.error({ err: error }, "Email provider request failed");
    res.status(502).json({ error: "Não foi possível enviar a avaliação agora. Tente novamente." });
  }
});

export default router;