import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Upload, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Products" }] }),
  component: AdminPage,
});

type Product = {
  id: string;
  name: string;
  description: string | null;
  weight: number | null;
  unit: string | null;
  image_url: string | null;
  sort_order: number;
};

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: "", description: "", weight: "", unit: "g" });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/auth" });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      if (!mounted) return;
      setIsAdmin(admin);
      setReady(true);
      if (admin) await loadProducts();
    };
    init();
    return () => { mounted = false; };
  }, [navigate]);

  const loadProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").order("sort_order").order("created_at");
    if (error) toast.error(error.message);
    else setProducts((data ?? []) as Product[]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Name is required");
    setSubmitting(true);
    try {
      let image_url: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("product-images").upload(path, file, { cacheControl: "3600", upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
        image_url = pub.publicUrl;
      }
      const { error } = await supabase.from("products").insert({
        name: form.name.trim(),
        description: form.description.trim() || null,
        weight: form.weight ? Number(form.weight) : null,
        unit: form.unit.trim() || null,
        image_url,
      });
      if (error) throw error;
      toast.success("Product added");
      setForm({ name: "", description: "", weight: "", unit: "g" });
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement | null)?.value && ((document.getElementById("file-input") as HTMLInputElement).value = "");
      await loadProducts();
    } catch (err: any) {
      toast.error(err.message ?? "Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    await loadProducts();
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (!ready) {
    return <main className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</main>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl text-[var(--brand-navy)]">Not authorized</h1>
          <p className="mt-3 text-muted-foreground">This account does not have admin access.</p>
          <button onClick={onSignOut} className="mt-6 rounded-full bg-[var(--brand-navy)] px-5 py-2 text-sm text-primary-foreground">Sign out</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--brand-cream)] pb-24">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-crimson)]">Pastificio · Admin</div>
            <div className="font-display text-lg text-[var(--brand-navy)]">Products</div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-[var(--brand-navy)] hover:text-[var(--brand-crimson)]">View site</Link>
            <button onClick={onSignOut} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-[var(--brand-crimson)] hover:text-[var(--brand-crimson)]">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-12">
        <section className="lg:col-span-5">
          <div className="rounded-3xl bg-background p-8 shadow-[var(--shadow-card)] ring-1 ring-border/60">
            <h2 className="font-display text-2xl text-[var(--brand-navy)]">Add a product</h2>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Field label="Name">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
              </Field>
              <Field label="Description">
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input resize-none" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Weight">
                  <input type="number" step="0.01" min="0" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="input" />
                </Field>
                <Field label="Units">
                  <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="g, kg, pcs…" className="input" />
                </Field>
              </div>
              <Field label="Image">
                <label htmlFor="file-input" className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border px-4 py-6 text-sm text-muted-foreground hover:border-[var(--brand-navy)]">
                  <Upload className="h-4 w-4" />
                  {file ? file.name : "Choose an image"}
                </label>
                <input id="file-input" type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              </Field>
              <button disabled={submitting} className="w-full rounded-full bg-[var(--brand-navy)] px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-[var(--brand-crimson)] disabled:opacity-60">
                {submitting ? "Saving…" : "Add product"}
              </button>
            </form>
            <style>{`.input{width:100%;border:1px solid var(--border);border-radius:0.75rem;background:var(--background);padding:0.65rem 0.9rem;font-size:0.875rem;outline:none}.input:focus{box-shadow:0 0 0 2px var(--brand-navy)}`}</style>
          </div>
        </section>

        <section className="lg:col-span-7">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-2xl text-[var(--brand-navy)]">Catalog</h2>
            <span className="text-sm text-muted-foreground">{products.length} product{products.length === 1 ? "" : "s"}</span>
          </div>
          {products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-background/50 p-12 text-center text-muted-foreground">
              No products yet. Add your first one on the left.
            </div>
          ) : (
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.id} className="flex items-center gap-4 rounded-2xl bg-background p-4 shadow-[var(--shadow-card)] ring-1 ring-border/60">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[var(--brand-cream)]">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">No image</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-lg font-semibold text-[var(--brand-navy)] truncate">{p.name}</div>
                    {p.description && <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>}
                    {(p.weight || p.unit) && (
                      <div className="mt-1 text-xs uppercase tracking-wider text-[var(--brand-crimson)]">
                        {p.weight ?? ""} {p.unit ?? ""}
                      </div>
                    )}
                  </div>
                  <button onClick={() => onDelete(p)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-[var(--brand-crimson)] hover:text-[var(--brand-crimson)]">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-navy)]">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}