
-- Set explicit search_path on remaining helper
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Lock down direct execution of SECURITY DEFINER functions (still callable from RLS / triggers)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Drop broad SELECT on storage.objects; public bucket already serves files via public URL
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
