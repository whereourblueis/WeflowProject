"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginFormState } from "./actions";
import { FieldLabel, clearFormValidity, handleFormInvalid, inputClass } from "@/components/form/fields";

const initialState: LoginFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "로그인 중..." : "로그인"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form
      action={formAction}
      onInvalidCapture={handleFormInvalid}
      onInputCapture={clearFormValidity}
      onChangeCapture={clearFormValidity}
      className="space-y-5"
    >
      <div>
        <FieldLabel required>이메일</FieldLabel>
        <input
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="admin@weflow.com"
        />
      </div>

      <div>
        <FieldLabel required>비밀번호</FieldLabel>
        <input name="password" type="password" required className={inputClass} />
      </div>

      {state.status === "error" && (
        <p className="text-sm font-medium text-red-600">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}
