const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';
const CHAT_IDS = [5861758047, 5759514004]; // Carla & Adal

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  if (!LOVABLE_API_KEY) {
    return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const TELEGRAM_API_KEY = Deno.env.get('TELEGRAM_API_KEY');
  if (!TELEGRAM_API_KEY) {
    return new Response(JSON.stringify({ error: 'TELEGRAM_API_KEY not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, phone, date, time, guests, notes } = await req.json();

    const message = `🍽 <b>Nueva Reserva</b>\n\n` +
      `👤 <b>Nombre:</b> ${name}\n` +
      `📞 <b>Teléfono:</b> ${phone}\n` +
      `📧 <b>Email:</b> ${email}\n` +
      `📅 <b>Fecha:</b> ${date}\n` +
      `🕐 <b>Hora:</b> ${time}\n` +
      `👥 <b>Personas:</b> ${guests}\n` +
      (notes ? `📝 <b>Notas:</b> ${notes}\n` : '');

    const results = await Promise.allSettled(
      CHAT_IDS.map(async (chatId) => {
        const res = await fetch(`${GATEWAY_URL}/sendMessage`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'X-Connection-Api-Key': TELEGRAM_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
          }),
        });
        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Chat ${chatId} failed [${res.status}]: ${err}`);
        }
        return res.json();
      })
    );

    const errors = results.filter((r) => r.status === 'rejected');
    if (errors.length > 0) {
      console.error('Some notifications failed:', errors);
    }

    return new Response(JSON.stringify({ success: true, sent: results.length - errors.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Notification error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
