"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ALL_SERVICE_CATEGORIES, categoryToCamel } from "@/lib/services-content";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm() {
  const t = useTranslations("contact");
  const tServices = useTranslations("services");
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.status === "success") {
    return (
      <p className="rounded-xl border border-cream/30 bg-cream p-6 text-royal">
        {t("success")}
      </p>
    );
  }

  const inputClasses = "mt-2 w-full rounded-lg border bg-cream px-4 py-2.5 text-sm text-royal placeholder:text-royal/40";

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-cream">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={200}
          autoComplete="name"
          className={`${inputClasses} ${state.errors?.name ? "border-red-400" : "border-cream/30"}`}
        />
        {state.errors?.name && <p className="mt-2 text-sm text-red-400">{state.errors.name}</p>}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-cream">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={320}
            autoComplete="email"
            className={`${inputClasses} ${state.errors?.email ? "border-red-400" : "border-cream/30"}`}
          />
          {state.errors?.email && <p className="mt-2 text-sm text-red-400">{state.errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-cream">
            {t("phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={20}
            autoComplete="tel"
            inputMode="tel"
            className={`${inputClasses} ${state.errors?.phone ? "border-red-400" : "border-cream/30"}`}
          />
          {state.errors?.phone && <p className="mt-2 text-sm text-red-400">{state.errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="serviceInterest" className="block text-sm font-medium text-cream">
          {t("serviceInterest")}
        </label>
        <select
          id="serviceInterest"
          name="serviceInterest"
          defaultValue=""
          className={`${inputClasses} ${state.errors?.serviceInterest ? "border-red-400" : "border-cream/30"}`}
        >
          <option value="">{t("serviceInterestPlaceholder")}</option>
          {ALL_SERVICE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {tServices(categoryToCamel(category))}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-cream">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          className={`${inputClasses} ${state.errors?.message ? "border-red-400" : "border-cream/30"}`}
        />
        {state.errors?.message && <p className="mt-2 text-sm text-red-400">{state.errors.message}</p>}
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-400">{state.errors?.form ?? t("error")}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
