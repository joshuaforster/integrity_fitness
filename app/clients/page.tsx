"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "../components/ui/PageHero";

export default function CapacityPlanner() {
  const [hourlyRate, setHourlyRate] = useState(50);
  const [targetWeeklyRevenue, setTargetWeeklyRevenue] = useState(1000);
  const [adminPerClient, setAdminPerClient] = useState(0.5);

  const clientsNeeded = targetWeeklyRevenue / hourlyRate;
  const totalWeeklyHours = clientsNeeded + clientsNeeded * adminPerClient;
  const effectiveHourlyRate = targetWeeklyRevenue / totalWeeklyHours;

  return (
    <>
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="Business Intelligence"
        title="Capacity & Profitability Planner"
        subtitle="Uncover the hidden cost of your admin and programming hours."
        overlayStrength="heavy"
        size="sm"
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-8">
              <h2 className="text-xl font-black uppercase text-zinc-950 mb-6">
                Efficiency Diagnostic
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-400">
                    Session Fee (£)
                  </label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full mt-2 p-3 border border-zinc-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-400">
                    Target Revenue/wk (£)
                  </label>
                  <input
                    type="number"
                    value={targetWeeklyRevenue}
                    onChange={(e) =>
                      setTargetWeeklyRevenue(Number(e.target.value))
                    }
                    className="w-full mt-2 p-3 border border-zinc-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-400">
                    Admin hrs/client/wk
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={adminPerClient}
                    onChange={(e) => setAdminPerClient(Number(e.target.value))}
                    className="w-full mt-2 p-3 border border-zinc-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-zinc-950 text-white rounded-xl">
                  <p className="text-xs font-bold uppercase text-zinc-400 mb-2">
                    Effective Hourly Rate
                  </p>
                  <p className="text-3xl font-black">
                    £{effectiveHourlyRate.toFixed(2)}
                  </p>
                  <p className="text-xs text-zinc-500 mt-2">
                    True earnings after factoring in all unbillable time.
                  </p>
                </div>
                <div className="p-6 bg-[#CE1A19]/5 border border-[#CE1A19]/20 rounded-xl">
                  <p className="text-xs font-bold uppercase text-[#CE1A19] mb-2">
                    Weekly Time Sink
                  </p>
                  <p className="text-3xl font-black text-[#CE1A19]">
                    {totalWeeklyHours.toFixed(1)} hrs
                  </p>
                  <p className="text-xs text-[#CE1A19]/70 mt-2">
                    Total grind time for this revenue.
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-8 p-4 rounded-lg border ${effectiveHourlyRate < hourlyRate ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-emerald-50 border-emerald-200 text-emerald-800"}`}
              >
                <p className="text-sm font-medium">
                  {effectiveHourlyRate < hourlyRate
                    ? `Warning: You are losing £${(hourlyRate - effectiveHourlyRate).toFixed(2)} per hour to unpaid admin. Consider increasing your session fee or automating your programming workflow.`
                    : "Your efficiency is high. You are capturing the full value of your hourly rate."}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
