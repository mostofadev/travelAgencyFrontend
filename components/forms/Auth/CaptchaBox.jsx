// components/forms/Auth/CaptchaBox.jsx
'use client';
import { useState, forwardRef, useImperativeHandle } from "react";

const generateCaptcha = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
};

// forwardRef এ named function দাও — dynamic import এর সাথে কাজ করে
const CaptchaBox = forwardRef(function CaptchaBox(_, ref) {
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha);
    setCaptchaInput("");
    setCaptchaError("");
  };

  useImperativeHandle(ref, () => ({
    validate() {
      if (parseInt(captchaInput) !== captcha.answer) {
        setCaptchaError("Incorrect answer, please try again.");
        refreshCaptcha();
        return false;
      }
      setCaptchaError("");
      return true;
    },
  }), [captchaInput, captcha]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Verify you&apos;re human *
      </label>

      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-9 h-9 flex items-center justify-center bg-white border-2 border-blue-300 rounded-lg text-base font-extrabold text-blue-700 shadow-sm select-none">
            {captcha.a}
          </span>
          <span className="text-lg font-bold text-gray-400">+</span>
          <span className="w-9 h-9 flex items-center justify-center bg-white border-2 border-blue-300 rounded-lg text-base font-extrabold text-blue-700 shadow-sm select-none">
            {captcha.b}
          </span>
          <span className="text-lg font-bold text-gray-400">=</span>
        </div>

        <input
          type="number"
          value={captchaInput}
          onChange={(e) => {
            setCaptchaInput(e.target.value);
            setCaptchaError("");
          }}
          placeholder="?"
          className="flex-1 h-9 text-center border-2 border-indigo-300 rounded-lg text-base font-bold text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white shadow-sm"
        />

        <button
          type="button"
          onClick={refreshCaptcha}
          title="Get new numbers"
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {captchaError && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {captchaError}
        </p>
      )}
    </div>
  );
});

export default CaptchaBox;