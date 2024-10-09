"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData, locale: string) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", `/${locale}/sign-in`, error.message); 
  }

  return redirect(`/${locale}/protected`);
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async (locale: string) => {
  const supabase = createClient();
  await supabase.auth.signOut();
    return redirect(`/${locale}/sign-in`);
};



export const addPropertyAction = async (formData: FormData) => {
  const supabase = createClient();

  // Obtener el usuario autenticado
  const { data: { user } } = await supabase.auth.getUser();

  // Asegurarse de que el usuario está autenticado
  if (!user) {
    return { error: "User must be logged in to add a property" };
  }

  const user_id = user.id;

  // Obtener los datos del formulario
  const name = formData.get("name")?.toString();
  const address = formData.get("address")?.toString();
  const description = formData.get("description")?.toString();
  const type_id = formData.get("type_id")?.toString();
  const num_bedrooms = formData.get("num_bedrooms")?.toString();
  const num_bathrooms = formData.get("num_bathrooms")?.toString();
  const guest_capacity = formData.get("guest_capacity")?.toString();
  const policies = formData.get("policies")?.toString();
  const cleaning_fee = formData.get("cleaning_fee")?.toString();
  const checkin_time = formData.get("checkin_time")?.toString();
  const checkout_time = formData.get("checkout_time")?.toString();
  const checkin_instructions = formData.get("checkin_instructions")?.toString();

  // Validar campos obligatorios
  if (!name || !address || !type_id || !user_id) {
    return { error: "Property name, address, type, and user are required" };
  }

  const { data, error } = await supabase.from("properties").insert({
    name,
    address,
    description,
    type_id: parseInt(type_id),
    num_bedrooms: num_bedrooms ? parseInt(num_bedrooms) : null,
    num_bathrooms: num_bathrooms ? parseInt(num_bathrooms) : null,
    guest_capacity: guest_capacity ? parseInt(guest_capacity) : null,
    policies,
    cleaning_fee: cleaning_fee ? parseFloat(cleaning_fee) : null,
    checkin_time,
    checkout_time,
    checkin_instructions,
    user_id, // Agregar el ID del usuario autenticado
  });

  // Manejo de errores
  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/protected/property", error.message);
  } else {
    // Redireccionar si es exitoso
    return encodedRedirect("success", `/protected/property?success=true`, "Success");
  }
};

