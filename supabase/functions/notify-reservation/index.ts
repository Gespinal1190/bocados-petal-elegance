import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';
const CHAT_IDS = [5861758047, 5759514004]; // Carla & Adal

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;')
   .replace(/</g, '&lt;')
   .replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  if (!LOVABLE_API_KEY) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const TELEGRAM_API_KEY = Deno.env.get('TELEGRAM_API_KEY');
  if (!TELEGRAM_API_KEY) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, phone, date, time, guests, notes } = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !guests) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify the reservation actually exists in the database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: reservation, error: dbError } = await supabase
      .from('reservations')
      .select('id')
      .eq('name', name)
      .eq('email', email)
      .eq('phone', phone)
      .eq('date', date)
      .eq('time', time)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (dbError || !reservation) {
      return new Response(JSON.stringify({ error: 'Reservation not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const message = `🍽 <b>Nueva Reserva</b>\n\n` +
      `👤 <b>Nombre:</b> ${escapeHtml(String(name))}\n` +
      `📞 <b>Teléfono:</b> ${escapeHtml(String(phone))}\n` +
      `📧 <b>Email:</b> ${escapeHtml(String(email))}\n` +
      `📅 <b>Fecha:</b> ${escapeHtml(String(date))}\n` +
      `🕐 <b>Hora:</b> ${escapeHtml(String(time))}\n` +
      `👥 <b>Personas:</b> ${escapeHtml(String(guests))}\n` +
      (notes ? `📝 <b>Notas:</b> ${escapeHtml(String(notes))}\n` : '');

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
    console.error('Notification error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
