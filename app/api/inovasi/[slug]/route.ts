import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
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

// PATCH — kemaskini inovasi
export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceClient();
  const body = await req.json();
  const { error } = await supabase
    .from("inovasi")
    .update(body)
    .eq("slug", params.slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE — padam inovasi
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceClient();
  const { error } = await supabase
    .from("inovasi")
    .delete()
    .eq("slug", params.slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
