const SUBMIT_WEBHOOK_URL = 'https://discord.com/api/webhooks/1320540586817880138/DGEPpV3R_PW20MC0C5BWqgzPxolKKDN_Khxy1_-N20BG3YP9DvScxQ-ddSiD3JtVnFmU';
const ADVERTISE_WEBHOOK_URL = 'https://discord.com/api/webhooks/1320539987640324168/dwxSt08qLBCGEMFHYcZUkT_541BgyRoeP33FUhrUyQHT-hBNPCp-_YuhC6vDnBouqANa';

// Click interaction webhooks
const BUTTON_CLICK_WEBHOOK = 'https://discord.com/api/webhooks/1321514995443306588/h691FGltfnimM1cS54-AHj3Bwe8kLIhSKPJXlo5BxpHVbnVejUJ-RMZBjpPN_lFsecl8';
const LINK_CLICK_WEBHOOK = 'https://discord.com/api/webhooks/1321514995443306588/h691FGltfnimM1cS54-AHj3Bwe8kLIhSKPJXlo5BxpHVbnVejUJ-RMZBjpPN_lFsecl8';
const SELECTION_CLICK_WEBHOOK = 'https://discord.com/api/webhooks/1321514995443306588/h691FGltfnimM1cS54-AHj3Bwe8kLIhSKPJXlo5BxpHVbnVejUJ-RMZBjpPN_lFsecl8';

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

export async function trackInteraction(data: {
  page: string;
  element: string;
  action: string;
  additionalInfo?: string;
}) {
  // Determine which webhook to use based on the element type
  let webhookUrl = BUTTON_CLICK_WEBHOOK; // default to button clicks

  if (data.element.includes('link') || data.element.includes('discord')) {
    webhookUrl = LINK_CLICK_WEBHOOK;
  } else if (data.element.includes('selection') || data.element.includes('framework')) {
    webhookUrl = SELECTION_CLICK_WEBHOOK;
  }

  const embed = {
    title: '🔍 User Interaction Tracked',
    color: 0x00ff00,
    fields: [
      {
        name: 'Page',
        value: data.page,
        inline: true,
      },
      {
        name: 'Element',
        value: data.element,
        inline: true,
      },
      {
        name: 'Action',
        value: data.action,
        inline: true,
      },
      ...(data.additionalInfo ? [{
        name: 'Additional Info',
        value: data.additionalInfo,
        inline: false,
      }] : []),
    ],
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (error) {
    console.error('Failed to track interaction:', error);
  }
} 