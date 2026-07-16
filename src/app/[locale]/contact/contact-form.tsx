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
      <p className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
        {t("success")}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={200}
          className="mt-2 w-full rounded-lg border border-royal/20 bg-transparent px-4 py-2.5 text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={320}
          className="mt-2 w-full rounded-lg border border-royal/20 bg-transparent px-4 py-2.5 text-sm"
        />
      </div>

      <div>
        <label htmlFor="serviceInterest" className="block text-sm font-medium">
          {t("serviceInterest")}
        </label>
        <select
          id="serviceInterest"
          name="serviceInterest"
          defaultValue=""
          className="mt-2 w-full rounded-lg border border-royal/20 bg-transparent px-4 py-2.5 text-sm"
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
        <label htmlFor="message" className="block text-sm font-medium">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          className="mt-2 w-full rounded-lg border border-royal/20 bg-transparent px-4 py-2.5 text-sm"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-600">{t("error")}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
