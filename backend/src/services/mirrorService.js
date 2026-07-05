const TIMEOUT_MS = 4000;
const MAX_ATTEMPTS = 2;

const fetchWithTimeout = async (url, options) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

const buildSlackPayload = ({ username, commandName, content }) => ({
  text: `*/${commandName}* from *${username}*\n${content}`,
});

const buildDiscordWebhookPayload = ({ username, commandName, content }) => ({
  content: `**/${commandName}** from **${username}**\n${content}`,
});

export const sendMirrorNotification = async (payload) => {
  const slackUrl = process.env.SLACK_WEBHOOK_URL;
  const discordMirrorUrl = process.env.DISCORD_MIRROR_WEBHOOK_URL;

  const targetUrl = slackUrl || discordMirrorUrl;

  if (!targetUrl) {
    throw new Error(
      "No mirror destination configured. Set SLACK_WEBHOOK_URL or DISCORD_MIRROR_WEBHOOK_URL."
    );
  }

  const body = slackUrl ? buildSlackPayload(payload) : buildDiscordWebhookPayload(payload);

  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetchWithTimeout(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Mirror webhook responded with ${response.status}`);
      }

      return;
    } catch (error) {
      lastError = error;
      console.warn(`Mirror attempt ${attempt}/${MAX_ATTEMPTS} failed:`, error.message);
    }
  }

  throw lastError;
};
