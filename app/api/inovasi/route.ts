import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import { INOVASI_SEED } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = "FISHA2026-UD";

function getServiceClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

// GET — load all items (admin only, returns unpublished too)
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceClient();
  let { data, error } = await supabase
    .from("inovasi")
    .select("*")
    .order("urutan", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Auto-seed jika table kosong
  if (data && data.length === 0) {
    const seedItems = INOVASI_SEED.map((item, i) => ({ ...item, urutan: i + 1 }));
    const { data: seeded, error: seedError } = await supabase
      .from("inovasi")
      .insert(seedItems)
      .select()
      .order("urutan", { ascending: true });
    if (!seedError && seeded) data = seeded;
  }

  return NextResponse.json(data ?? []);
}

// POST — tambah inovasi baru
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceClient();
  const body = await req.json();
  const { data, error } = await supabase
    .from("inovasi")
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
