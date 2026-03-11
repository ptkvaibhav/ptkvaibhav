import "server-only";

import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

function getServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

const sharedOptions = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: {
      "x-application-name": "pratik-vaibhav-portfolio",
    },
  },
};

export function hasSupabasePublicConfig() {
  return Boolean(getSupabaseUrl() && getAnonKey());
}

export function hasSupabaseAdminConfig() {
  return Boolean(getSupabaseUrl() && getServiceRoleKey());
}

export const supabasePublic = (() => {
  const url = getSupabaseUrl();
  const key = getAnonKey();

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    ...sharedOptions,
  });
})();

export const supabaseAdmin = (() => {
  const url = getSupabaseUrl();
  const key = getServiceRoleKey();

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    ...sharedOptions,
  });
})();
