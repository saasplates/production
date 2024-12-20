const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function sendToDiscord(type: 'submit' | 'advertise', data: any) {
  const embedColor = type === 'submit' ? 0x4F545C : 0x2F3136; // Different colors for different forms

  const embed = {
    title: type === 'submit' ? 'New Template Submission' : 'New Advertising Inquiry',
    color: embedColor,
    fields: Object.entries(data).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: String(value),
      inline: false,
    })),
    timestamp: new Date().toISOString(),
  };

  await fetch(DISCORD_WEBHOOK_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      embeds: [embed],
    }),
  });
} 