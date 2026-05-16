import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const encoder = new TextEncoder();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let channel: ReturnType<typeof supabase.channel> | null = null;
  let keepaliveTimer: ReturnType<typeof setInterval> | null = null;

  function cleanup() {
    if (keepaliveTimer) { clearInterval(keepaliveTimer); keepaliveTimer = null; }
    if (channel) { supabase.removeChannel(channel); channel = null; }
  }

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: string) => {
        try {
          controller.enqueue(encoder.encode(data));
        } catch {
          cleanup();
        }
      };

      // Initial connected signal
      send(": connected\n\n");

      // Subscribe to Supabase Realtime INSERT events
      channel = supabase
        .channel("testimonial-live")
        .on(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          "postgres_changes" as any,
          { event: "INSERT", schema: "public", table: "respon_awam" },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (payload: any) => {
            const row = payload.new;
            if (row.jenis === "maklumbalas" && row.rating >= 4) {
              send(
                `data: ${JSON.stringify({
                  id: row.id,
                  nama: row.nama,
                  mesej: row.mesej,
                  rating: row.rating,
                  created_at: row.created_at,
                })}\n\n`
              );
            }
          }
        )
        .subscribe();

      // Keepalive every 20s to prevent proxy/CDN timeouts
      keepaliveTimer = setInterval(() => send(": keepalive\n\n"), 20_000);
    },
    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
