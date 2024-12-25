const SUBMIT_WEBHOOK_URL = 'https://discord.com/api/webhooks/1320540586817880138/DGEPpV3R_PW20MC0C5BWqgzPxolKKDN_Khxy1_-N20BG3YP9DvScxQ-ddSiD3JtVnFmU';
const ADVERTISE_WEBHOOK_URL = 'https://discord.com/api/webhooks/1320539987640324168/dwxSt08qLBCGEMFHYcZUkT_541BgyRoeP33FUhrUyQHT-hBNPCp-_YuhC6vDnBouqANa';

const submissionLocks = new Map<string, boolean>();

export async function sendToDiscord(type: 'submit' | 'advertise', data: any) {
  const lockKey = `${type}-${JSON.stringify(data)}`;
  
  if (submissionLocks.get(lockKey)) {
    console.log('Duplicate submission detected');
    return;
  }

  try {
    submissionLocks.set(lockKey, true);
    const webhookUrl = type === 'submit' ? SUBMIT_WEBHOOK_URL : ADVERTISE_WEBHOOK_URL;
    const embedColor = type === 'submit' ? 0x4F545C : 0x2F3136;

    const embed = {
      title: type === 'submit' ? 'New Boilerplate Submission' : 'New Advertising Inquiry',
      color: embedColor,
      fields: Object.entries(data).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: String(value),
        inline: false,
      })),
      timestamp: new Date().toISOString(),
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } finally {
    // Remove the lock after 4 seconds
    setTimeout(() => {
      submissionLocks.delete(lockKey);
    }, 4000);
  }
} 